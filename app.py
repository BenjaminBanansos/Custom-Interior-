import streamlit as st
import pandas as pd
import numpy as np
import plotly.graph_objects as go
from datetime import datetime, timedelta

# ==========================================
# PAGE CONFIGURATION
# ==========================================
st.set_page_config(page_title="ANTI-GRAVITY INST PRO v3", layout="wide", page_icon="⚡")

# ==========================================
# SESSION STATE INITIALIZATION
# ==========================================
if 'account_balance' not in st.session_state:
    st.session_state.account_balance = 15000.00  # Default USD Pool
if 'active_position' not in st.session_state:
    st.session_state.active_position = None # None, "LONG", or "SHORT"
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

def initialize_tape():
    timestamps = pd.date_range(end=datetime.now(), periods=20, freq='5min')
    prices = [3.345, 3.348, 3.351, 3.350, 3.355, 3.353, 3.352, 3.359, 3.358, 3.357, 
              3.362, 3.364, 3.361, 3.359, 3.356, 3.358, 3.359, 3.367, 3.372, 3.358]
    volumes = [74, 83, 37, 52, 164, 110, 44, 181, 195, 88, 90, 110, 120, 85, 140, 114, 85, 255, 126, 85]
    deltas = [-38, -34, -22, -21, 32, -52, 20, 49, -55, -115, 24, 54, -40, -10, -92, 60, -11, 141, 63, 54]
    cvd = np.cumsum(deltas) - 300  
    
    df = pd.DataFrame({
        'Timestamp': timestamps,
        'Price': prices,
        'Volume': volumes,
        'Delta': deltas,
        'CVD': cvd
    })
    return df

if 'df_tape' not in st.session_state:
    st.session_state.df_tape = initialize_tape()

# ==========================================
# SIMULATION ENGINE
# ==========================================
def simulate_next_tick():
    # Get last row
    last_row = st.session_state.df_tape.iloc[-1]
    
    # Generate plausible next values
    new_timestamp = last_row['Timestamp'] + timedelta(minutes=5)
    
    # Random walk with slight mean reversion to VWAP (mocked at 3.360)
    price_change = np.random.normal(0, 0.005)
    new_price = round(last_row['Price'] + price_change, 3)
    
    new_volume = int(np.random.normal(120, 40))
    new_volume = max(10, new_volume) # ensure positive
    
    # Delta correlates slightly with price movement
    delta_bias = 50 if price_change > 0 else -50
    new_delta = int(np.random.normal(delta_bias, 30))
    
    new_cvd = last_row['CVD'] + new_delta
    
    new_row = pd.DataFrame({
        'Timestamp': [new_timestamp],
        'Price': [new_price],
        'Volume': [new_volume],
        'Delta': [new_delta],
        'CVD': [new_cvd]
    })
    
    st.session_state.df_tape = pd.concat([st.session_state.df_tape, new_row], ignore_index=True)
    
    # Check Active Position Status (Take Profit / Stop Loss)
    if st.session_state.active_position is not None:
        check_position_status(new_price)

def check_position_status(current_price):
    pos = st.session_state.active_position
    sl = st.session_state.stop_loss
    tp = st.session_state.take_profit
    size = st.session_state.position_size
    entry = st.session_state.entry_price
    
    closed = False
    pnl = 0.0
    
    if pos == "LONG":
        if current_price <= sl:
            pnl = - (entry - sl) * (size * 1000) # simplified PNL math
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
        st.session_state.trade_history.append({
            'Type': pos, 'Entry': entry, 'Exit': current_price, 'PnL': pnl, 'Reason': reason
        })
        # Reset position
        st.session_state.active_position = None
        st.session_state.entry_price = 0.0
        st.session_state.position_size = 0.0

def close_position_manually(current_price):
    pos = st.session_state.active_position
    size = st.session_state.position_size
    entry = st.session_state.entry_price
    
    if pos == "LONG":
        pnl = (current_price - entry) * (size * 1000)
    else:
        pnl = (entry - current_price) * (size * 1000)
        
    st.session_state.account_balance += pnl
    st.session_state.trade_history.append({
        'Type': pos, 'Entry': entry, 'Exit': current_price, 'PnL': pnl, 'Reason': "Manual Close"
    })
    
    st.session_state.active_position = None

# ==========================================
# COMPUTE INDICATORS
# ==========================================
df_tape = st.session_state.df_tape.copy()
df_tape['EMA9'] = df_tape['Price'].ewm(span=9, adjust=False).mean()
df_tape['EMA34'] = df_tape['Price'].ewm(span=34, adjust=False).mean()

current_row = df_tape.iloc[-1]

# ==========================================
# SIDEBAR
# ==========================================
st.sidebar.header("🛡️ Risk Management Parameters")
max_allocation_pct = st.sidebar.slider("Maximum Account Allocation Limit (%)", 5, 25, 20)
risk_reward_ratio = st.sidebar.selectbox("Enforced Risk-to-Reward Ratio Profile", [2.0, 3.0, 4.0], index=1)
stop_loss_cents = st.sidebar.number_input("Max Stop Loss Distance (Natural Gas Cents)", min_value=0.01, max_value=0.10, value=0.015, step=0.005)

st.sidebar.markdown("---")
st.sidebar.subheader("💼 Active Account Statistics")
st.sidebar.metric("Liquid Cash Pool", f"${st.session_state.account_balance:,.2f}")

max_safe_capital = st.session_state.account_balance * (max_allocation_pct / 100.0)
st.sidebar.info(f"🚨 **Max Allocation Limit:** ${max_safe_capital:,.2f} USD")

st.sidebar.markdown("---")
if st.sidebar.button("⏭️ Simulate Next Tick", use_container_width=True):
    simulate_next_tick()
    st.rerun()

# ==========================================
# MAIN INTERFACE TABS
# ==========================================
tab_main, tab_edu = st.tabs(["🖥️ Dashboard & Execution", "📚 Education & Principles"])

with tab_main:
    st.title("⚡ ANTI-GRAVITY INST PRO v3 — Professional Scalping Dashboard")
    
    col_dash_left, col_dash_right = st.columns([2, 1])

    with col_dash_left:
        st.subheader("📈 Live Contract NGN2026 Price Action")
        fig = go.Figure()
        fig.add_trace(go.Scatter(x=df_tape['Timestamp'], y=df_tape['Price'], name='NGN2026 Price', line=dict(color='#00d2ff', width=3)))
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
        
        vwap_bias = "BELOW" if current_row['Price'] < 3.365 else "ABOVE"
        structure_bias = "BEARISH" if current_row['EMA9'] < current_row['EMA34'] else "BULLISH"
        cvd_flow = "BUYING" if current_row['Delta'] > 0 else "SELLING"
        inst_level_hit = "YES" if (current_row['Price'] <= 3.360 or current_row['Price'] >= 3.410) else "NONE"
        
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
        | **Live CVD Order Flow** | **{cvd_flow}** |
        | **Institutional Liquidity Level** | **{inst_level_hit}** |
        | **Short Strategy Probability Score** | `{short_score} / 7` |
        | **Long Strategy Probability Score** | `{long_score} / 7` |
        | **Active Action Engine Status** | `READY \| EXPLOSIVE SWEEP` |
        """)

    st.markdown("---")

    col_tape, col_execution = st.columns([2, 1])

    with col_tape:
        st.subheader("📊 Footprint Order Flow Array")
        display_tape = df_tape.tail(8).copy()
        display_tape['Timestamp'] = display_tape['Timestamp'].dt.strftime('%H:%M')
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
                close_position_manually(current_row['Price'])
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
                # Guardrail 1: Sizing Violation
                if size_input_usd > max_safe_capital:
                    st.error(f"❌ **Blocked:** Allocation violation. Requested ${size_input_usd:,.2f} but capped at ${max_safe_capital:,.2f}.")
                
                # Guardrail 2: Trade-Direction vs. Flow Divergence
                elif "SHORT" in trade_direction and cvd_flow == "BUYING" and current_row['Delta'] > 40:
                    st.error(f"❌ **Blocked:** Institutional absorption. Shorting against aggressive buying (`+{current_row['Delta']}`). Wait for exhaustion wick.")
                
                elif "LONG" in trade_direction and cvd_flow == "SELLING" and current_row['Delta'] < -40:
                    st.error(f"❌ **Blocked:** Institutional distribution. Longing against aggressive selling (`{current_row['Delta']}`). Catching falling knives is prohibited.")
                
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
    
    ---
    
    ### 1. Cumulative Volume Delta (CVD) Divergence
    **The Principle:** Price can be manipulated via low-volume passive limits, but aggressive market buying (measured via Delta) cannot be hidden.
    - **Why it matters:** When price makes a new high but CVD makes a lower high, it indicates exhaustion. Retail is buying the breakout, but institutions have stopped participating via aggressive sweeps.
    - **Guardrail Action:** The app blocks LONG entries if the current tick delta shows severe selling momentum, preventing you from catching falling knives.

    ### 2. Institutional Imbalances & Absorption
    **The Principle:** Large institutional orders often leave 'footprints' in the form of huge delta imbalances within a single candlestick.
    - **Why it matters:** If you try to short exactly when there's an explosive buying delta (e.g. `+140` delta in one tick), you are providing liquidity for their absorption phase. 
    - **Guardrail Action:** The app explicitly rejects SHORT orders when the live bar shows massive aggressive buying flow. It forces you to wait for the "exhaustion wick to clear" before stepping in.

    ### 3. Capital Guardrails & Risk of Ruin
    **The Principle:** Preserving the "Liquid Cash Pool" is more important than hitting a single home run trade.
    - **Why it matters:** Overleveraging a single setup guarantees eventual ruin. By capping exposure to a dynamic percentage (e.g., 20%) of the *current* balance, the size naturally scales down during drawdowns.
    - **Guardrail Action:** Hard stop on the ticket size. The system calculates maximum safe capital based on your account metrics and simply will not send the order to the queue if size exceeds limits.

    ### 4. Structural Moving Averages (9/34 EMA)
    **The Principle:** Markets have micro-momentum (fast) and structural trends (slow).
    - **Why it matters:** The 9 EMA captures short-term aggression, while the 34 EMA serves as the 'institutional backbone'. When 9 is below 34, the broader regime is distributive (bearish).
    - **Guardrail Action:** The Engine computes Probability Scores using these matrices. Trading against the structural 34 EMA instantly deducts points from the setup's viability.
    
    ---
    
    *Use the 'Simulate Next Tick' button in the sidebar to watch how these indicators adapt to live footprint arrays and block your impulsive clicks!*
    """)
