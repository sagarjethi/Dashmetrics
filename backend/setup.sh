#!/bin/bash

# Exit on error
set -e

echo "Setting up Dashmetrics backend..."

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
  echo "Creating virtual environment..."
  python -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Check if .env file exists
if [ ! -f ".env" ]; then
  echo "Creating .env file from .env.sample..."
  cp .env.sample .env
  echo "Please update the .env file with your actual API keys and configuration"
fi

echo ""
echo "Setup complete! You can now run the backend with:"
echo "source venv/bin/activate && python run.py --reload"
echo ""
echo "API documentation will be available at: http://localhost:8000/docs" 