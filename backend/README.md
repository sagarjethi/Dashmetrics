# Dashmetrics Backend

This is the FastAPI backend for the Dashmetrics application. It provides APIs for meme coin tracking, trading insights, and other features.

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- Virtual environment (recommended)

### Installation

1. Clone the repository (if you haven't already):
   ```bash
   git clone https://github.com/username/dashmetrics.git
   cd dashmetrics/backend
   ```

2. Run the setup script to create a virtual environment and install dependencies:
   ```bash
   ./setup.sh
   ```
   
   This script will:
   - Create a Python virtual environment
   - Install all required dependencies
   - Create a `.env` file from `.env.sample` if it doesn't exist

3. Configure your environment variables by editing the `.env` file:
   ```
   # Update with your actual API keys
   SERP_API_KEY=your_actual_key_here
   CMC_KEY=your_actual_key_here
   BITQUERY_TOKEN=your_actual_token_here
   ```

## Running the Application

### Development Mode

To start the backend server in development mode with auto-reload:

```bash
./start.sh
```

Or manually:

```bash
source venv/bin/activate
python run.py --reload
```

### Production Mode

For production deployment:

```bash
source venv/bin/activate
python run.py --host 0.0.0.0 --port 8000
```

## API Documentation

Once the server is running, you can access the API documentation at:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Available Endpoints

- `/memecoin` - Meme coin related endpoints
- `/tools` - Utility tools and helper endpoints 
- `/coingecko` - CoinGecko data integration

## Environment Variables

The following environment variables can be configured in the `.env` file:

- `SERP_API_KEY` - API key for SERP API
- `CMC_KEY` - CoinMarketCap API key
- `BITQUERY_TOKEN` - Bitquery API token
- `COINBASE_KEY_NAME` - Coinbase API key name
- `COINBASE_KEY_PRIVATE_KEY` - Coinbase private key
- `X_BEARER_TOKEN` - Bearer token for authentication
- `SECRET_KEY` - Secret key for session encryption
- `DB_CONNECTION_URL` - Database connection URL

## Development

To contribute to the backend:

1. Create a new branch for your feature
2. Make your changes
3. Run tests (if available)
4. Submit a pull request 