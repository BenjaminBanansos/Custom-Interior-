#!/bin/bash
cd anti-gravity-engine
python -m streamlit run app.py --server.port $PORT --server.address 0.0.0.0
