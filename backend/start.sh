#!/bin/bash

# Exit on error
set -e

# Check if virtual environment exists
if [ ! -d "venv" ]; then
  echo "Virtual environment not found. Running setup first..."
  ./setup.sh
fi

# Activate virtual environment
source venv/bin/activate

# Start the server with auto-reload for development
echo "Starting Dashmetrics backend server..."
python run.py --reload

# This line won't be reached unless the server is stopped
echo "Server stopped." 