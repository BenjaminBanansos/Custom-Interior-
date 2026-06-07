import streamlit as st
import pandas as pd
import numpy as np
import plotly.graph_objects as go
from datetime import datetime, timedelta
import yfinance as yf
from streamlit_autorefresh import st_autorefresh

# ==========================================
# PAGE CONFIGURATION
# ==========================================
st.set_page_config(page_title="ANTI-GRAVITY INST PRO v3", layout="wide", page_icon="⚡")

# Auto-refresh the page every 30 seconds to fetch new data
st_autorefresh(interval=30000, key="data_refresh")

# ==========================================
# SESSION STATE INITIALIZATION
# ==========================================
if 'account_balance' not in st.session_state:
    st.session_state.account_balance = 15000.00
if 'active_position' not in st.session_state:
    st.session_state.active_position = None
if 'entry_price' not in st.session_state:
    st.session_state.entry_price = 0.0
if 'position_size' not in st.session_state:
    st.session_state.position_size = 0.0
if 'stop_loss' not in st.session_state:
    st.session_state.stop_loss = 0.0
if 'take_profit' not in st.session_state:
    st.session_state.take_profit = 0.0
if 'trade_history' not in st.session_state:
    st.session_state.trade_history = []

# ==========================================
# LIVE DATA ENGINE (yfinance - NG=F)
# ==========================================
@st.cache_data(ttl=25)
def fetch_live_data():
    try:
        # Fetch NYMEX NG=F 1-minute chart data via Yahoo Finance
        ticker = yf.Ticker("NG=F")
        df = ticker.history(period="1d", interval="1m")
        
        if df is None or df.empty:
            raise Exception("No data received from Yahoo Finance")
            
        df = df.tail(30).reset_index()
        # yfinance columns: Datetime, Open, High, Low, Close, Volume
        df.rename(columns={'Datetime': 'Timestamp', 'Close': 'Price'}, inplace=True)
        
        # Synthetic Delta Calculation:
        deltas = []
        for i, row in df.iterrows():
            candle_range = row['High'] - row['Low']
            if candle_range == 0:
                deltas.append(0)
            else:
                # Percentage of range where close happened (-1 to +1)
                close_pct = ((row['Price'] - row['Low']) / candle_range) * 2 - 1
                # Delta is the volume scaled by the close percentage
                synthetic_delta = int(row['Volume'] * close_pct)
                deltas.append(synthetic_delta)
                
        df['Delta'] = deltas
        # CVD is cumulative sum of Deltas, starting at an arbitrary base
        df['CVD'] = np.cumsum(df['Delta']) - 300
        
        # Calculate EMAs
        df['EMA9'] = df['Price'].ewm(span=9, adjust=False).mean()
        df['EMA34'] = df['Price'].ewm(span=34, adjust=False).mean()
        
        return df
    except Exception as e:
        st.error(f"Live Data Connection Error: {e}")
        timestamps = pd.date_range(end=datetime.now(), periods=20, freq='1min')
        prices = [3.350] * 20
        df = pd.DataFrame({'Timestamp': timestamps, 'Price': prices, 'Volume': [100]*20, 'Delta': [0]*20, 'CVD': [0]*20})
        df['EMA9'] = df['Price']
        df['EMA34'] = df['Price']
        # add dummy High/Low for structure
        df['High'] = df['Price']
        df['Low'] = df['Price']
        return df

df_tape = fetch_live_data()
current_row = df_tape.iloc[-1]

# Check Active Position Status
def check_position_status(current_price):
    if st.session_state.active_position is None: return
    
    pos = st.session_state.active_position
    sl = st.session_state.stop_loss
    tp = st.session_state.take_profit
    size = st.session_state.position_size
    entry = st.session_state.entry_price
    
    closed = False
    pnl = 0.0
    
    if pos == "LONG":
        if current_price <= sl:
            pnl = - (entry - sl) * (size * 1000)
            closed = True
            reason = "Stop Loss Triggered"
        elif current_price >= tp:
            pnl = (tp - entry) * (size * 1000)
            closed = True
            reason = "Take Profit Reached"
    elif pos == "SHORT":
        if current_price >= sl:
            pnl = - (sl - entry) * (size * 1000)
            closed = True
            reason = "Stop Loss Triggered"
        elif current_price <= tp:
            pnl = (entry - tp) * (size * 1000)
            closed = True
            reason = "Take Profit Reached"
            
    if closed:
        st.session_state.account_balance += pnl
        st.session_state.trade_history.append({'Type': pos, 'Entry': entry, 'Exit': current_price, 'PnL': pnl, 'Reason': reason})
        st.session_state.active_position = None
        st.session_state.entry_price = 0.0
        st.session_state.position_size = 0.0
        st.success(f"Position Closed: {reason} | PnL: ${pnl:.2f}")

check_position_status(current_row['Price'])

# ==========================================
# SIDEBAR
# ==========================================
st.sidebar.header("🛡️ Risk Management Parameters")
max_allocation_pct = st.sidebar.slider("Maximum Account Allocation Limit (%)", 5, 25, 20)
risk_reward_ratio = st.sidebar.selectbox("Enforced Risk-to-Reward Ratio Profile", [2.0, 3.0, 4.0], index=1)
stop_loss_cents = st.sidebar.number_input("Max Stop Loss Distance (NG Cents)", min_value=0.01, max_value=0.10, value=0.015, step=0.005)

st.sidebar.markdown("---")
st.sidebar.subheader("💼 Active Account Statistics")
st.sidebar.metric("Liquid Cash Pool", f"${st.session_state.account_balance:,.2f}")
max_safe_capital = st.session_state.account_balance * (max_allocation_pct / 100.0)
st.sidebar.info(f"🚨 **Max Allocation Limit:** ${max_safe_capital:,.2f} USD")
st.sidebar.markdown("---")
st.sidebar.caption("📡 **Data Feed:** Live Yahoo Finance (NG=F) (Auto-refreshes every 30s)")

# ==========================================
# MAIN INTERFACE TABS
# ==========================================
tab_main, tab_edu = st.tabs(["🖥️ Dashboard & Execution", "📚 Education & Principles"])

with tab_main:
    st.title("⚡ ANTI-GRAVITY INST PRO v3 — Professional Scalping Dashboard")
    
    col_dash_left, col_dash_right = st.columns([2, 1])

    with col_dash_left:
        st.subheader("📈 Live NYMEX NG=F Price Action")
        fig = go.Figure()
        fig.add_trace(go.Scatter(x=df_tape['Timestamp'], y=df_tape['Price'], name='NG=F Price', line=dict(color='#00d2ff', width=3)))
        fig.add_trace(go.Scatter(x=df_tape['Timestamp'], y=df_tape['EMA9'], name='9 EMA (Momentum)', line=dict(color='#ff9f43', width=1.5, dash='dash')))
        fig.add_trace(go.Scatter(x=df_tape['Timestamp'], y=df_tape['EMA34'], name='34 EMA (Institutional)', line=dict(color='#ee5253', width=1.5)))
        
        if st.session_state.active_position is not None:
            fig.add_hline(y=st.session_state.entry_price, line_dash="solid", line_color="yellow", annotation_text="ENTRY")
            fig.add_hline(y=st.session_state.stop_loss, line_dash="dash", line_color="red", annotation_text="STOP")
            fig.add_hline(y=st.session_state.take_profit, line_dash="dash", line_color="green", annotation_text="TARGET")
            
        fig.update_layout(template='plotly_dark', margin=dict(l=10, r=10, t=10, b=10), height=380, legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1))
        st.plotly_chart(fig, use_container_width=True)

    with col_dash_right:
        st.subheader("🖥️ NG INST PRO v3 Status")
        vwap_bias = "BELOW" if current_row['Price'] < df_tape['Price'].mean() else "ABOVE"
        structure_bias = "BEARISH" if current_row['EMA9'] < current_row['EMA34'] else "BULLISH"
        cvd_flow = "BUYING" if current_row['Delta'] > 0 else "SELLING"
        inst_level_hit = "YES" if (current_row['Price'] <= current_row['Low'] * 1.01) else "NONE"
        
        short_score = 3
        long_score = 2
        if vwap_bias == "BELOW": short_score += 1
        else: long_score += 1
        if structure_bias == "BEARISH": short_score += 1
        else: long_score += 1
        if cvd_flow == "BUYING": long_score += 1
        else: short_score += 1

        st.markdown(f"""
        | Dynamic Metric Parameters | Current System Telemetry Status |
        | :--- | :--- |
        | **VWAP Bias Axis** | **{vwap_bias}** |
        | **Market Structure Matrix** | **{structure_bias}** |
        | **Synthetic Live CVD Flow** | **{cvd_flow}** |
        | **Institutional Liquidity Sweep** | **{inst_level_hit}** |
        | **Short Strategy Score** | `{short_score} / 7` |
        | **Long Strategy Score** | `{long_score} / 7` |
        | **Active Action Engine** | `LIVE \| FETCHING YAHOO` |
        """)

    st.markdown("---")

    col_tape, col_execution = st.columns([2, 1])

    with col_tape:
        st.subheader("📊 Footprint Order Flow Array (Synthetic)")
        display_tape = df_tape.tail(8).copy()
        display_tape['Timestamp'] = display_tape['Timestamp'].dt.strftime('%H:%M:%S')
        display_tape = display_tape.set_index('Timestamp').T
        st.dataframe(display_tape.style.format("{:.3f}", subset=pd.IndexSlice[['Price', 'EMA9', 'EMA34'], :]))

    with col_execution:
        st.subheader("⚡ Order Execution Console")
        if st.session_state.active_position is not None:
            st.info(f"**Active Position:** {st.session_state.active_position} @ ${st.session_state.entry_price:.3f}")
            current_pnl = 0.0
            if st.session_state.active_position == "LONG":
                current_pnl = (current_row['Price'] - st.session_state.entry_price) * (st.session_state.position_size * 1000)
            else:
                current_pnl = (st.session_state.entry_price - current_row['Price']) * (st.session_state.position_size * 1000)
                
            st.write(f"**Floating PnL:** ${current_pnl:,.2f}")
            if st.button("Close Position", type="primary"):
                st.session_state.account_balance += current_pnl
                st.session_state.trade_history.append({'Type': st.session_state.active_position, 'Entry': st.session_state.entry_price, 'Exit': current_row['Price'], 'PnL': current_pnl, 'Reason': "Manual Close"})
                st.session_state.active_position = None
                st.rerun()
        else:
            trade_direction = st.radio("Desired Target Setup Direction", ["LONG (Buy BOIL / HNU)", "SHORT (Buy KOLD / HND)"])
            execution_price = current_row['Price']
            if "SHORT" in trade_direction:
                calculated_stop = execution_price + stop_loss_cents
                calculated_target = execution_price - (stop_loss_cents * risk_reward_ratio)
            else:
                calculated_stop = execution_price - stop_loss_cents
                calculated_target = execution_price + (stop_loss_cents * risk_reward_ratio)
                
            st.write(f"**Fill Reference:** ${execution_price:.3f}")
            st.write(f"**Enforced Stop-Loss:** ${calculated_stop:.3f}")
            st.write(f"**Target Take-Profit:** ${calculated_target:.3f}")
            size_input_usd = st.number_input("Desired Entry Ticket Size ($ USD)", min_value=100.0, max_value=50000.0, value=5000.0, step=500.0)
            
            if st.button("Transmit Verification Execution"):
                if size_input_usd > max_safe_capital:
                    st.error(f"❌ **Blocked:** Allocation violation. Requested ${size_input_usd:,.2f} but capped at ${max_safe_capital:,.2f}.")
                elif "SHORT" in trade_direction and cvd_flow == "BUYING" and current_row['Delta'] > 40:
                    st.error(f"❌ **Blocked:** Institutional absorption. Shorting against aggressive buying flow (`+{current_row['Delta']}`).")
                elif "LONG" in trade_direction and cvd_flow == "SELLING" and current_row['Delta'] < -40:
                    st.error(f"❌ **Blocked:** Institutional distribution. Longing against aggressive selling (`{current_row['Delta']}`).")
                else:
                    st.success("✅ **Order Verified:** Automated bracket orders launched.")
                    st.session_state.active_position = "LONG" if "LONG" in trade_direction else "SHORT"
                    st.session_state.entry_price = execution_price
                    st.session_state.stop_loss = calculated_stop
                    st.session_state.take_profit = calculated_target
                    st.session_state.position_size = size_input_usd
                    st.rerun()

with tab_edu:
    st.title("📚 Anti-Gravity Engine: Successful Principles")
    st.markdown("""
    The Anti-Gravity Engine enforces rigid programmatic gatekeepers over your execution. Below are the underlying institutional principles the guardrails rely upon.
    
    ### 1. Cumulative Volume Delta (CVD) Divergence
    **The Principle:** Price can be manipulated via low-volume passive limits, but aggressive market buying (measured via Delta) cannot be hidden.
    
    ### 2. Institutional Imbalances & Absorption
    **The Principle:** Large institutional orders often leave 'footprints' in the form of huge delta imbalances within a single candlestick.
    
    ### 3. Capital Guardrails & Risk of Ruin
    **The Principle:** Preserving the "Liquid Cash Pool" is more important than hitting a single home run trade.
    
    ### 4. Structural Moving Averages (9/34 EMA)
    **The Principle:** Markets have micro-momentum (fast) and structural trends (slow).
    """)
