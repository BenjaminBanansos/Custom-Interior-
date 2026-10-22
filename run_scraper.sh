#!/bin/bash
# Helper script to run the Facebook scraper using the local node environment

# Get the directory where this script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Export the path to the local node installation
export PATH="$DIR/tools/node-v20.12.0-darwin-arm64/bin:$PATH"

echo "Starting Facebook Scraper..."
node tools/fb_scraper.js
