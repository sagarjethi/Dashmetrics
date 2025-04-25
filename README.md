# Dashmetrics

Dashmetrics is an **AI-driven platform** for cryptocurrency trading, research, and analysis. Whether you're betting on trends, analyzing market data, or seeking insights from token metrics, Dashmetrics provides the tools to stay ahead in the crypto market.

## 🚀 Features

### **Seamless Wallet Integration**
Connect wallets easily with secure authentication—no private key management required.

### **Dashboard & Portfolio Tracking**
Monitor holdings in real-time, track profits/losses, and get AI-driven price predictions.

### **🛠 Betting Marketplace** 
- **Tweet Your Bet**  
   - Tag **@Dashmetrics** and specify your prediction  
     - Example: `"I bet $100 that $DOGE will be up 10% by next Friday! @Dashmetrics"`  
-  **Smart Contract Escrow**  
   - Dashmetrics's smart contract locks the bet amount securely.  
-  **Matching & Verification**  
   - The system matches your bet with another user or a market maker.  
-  **Automatic Payouts**  
   - After the bet period ends, the contract verifies the outcome and pays out instantly.
-  **Friendly & Easy-to-Use UI**
   - Easy to navigate the whole bet process.

### **🚀 Meme Coin Launch Pad**
Launch your own token with an AI-powered branding assistant, instant deployment, and on-chain security.
   - Utilizes a custom bonding curve that dynamically adjusts token prices based on market supply and demand.
   - Once a meme token reaches its funding goal, liquidity creation is triggered through the Native Liquidity Pool. Early contributors receive rewards, allowing them to mint additional tokens on Aurora.
   - A Marketplace where users can create, buy, and trade all launched meme tokens.

### **📊 AI Research & Trading Tools**
- **Market Insights:** Track trends, social engagement, and whale movements.
- **Token Metrics Integration:** Access professional-grade crypto analytics
- **Sentiment Analysis:** Get real-time sentiment data from the crypto market
- **Price Predictions:** AI forecasts based on historical data and current trends

## 🔌 Token Metrics Integration

### Token Metrics MCP Server

The project includes a dedicated Token Metrics MCP (Model Context Protocol) Server that provides real-time cryptocurrency data and AI-driven insights:

#### Key Features
- **Real-time Token Data**: Price, market cap, volume, and trends
- **Trading Analysis**: Trader and investor grades with confidence scores
- **Market Metrics**: Overall market health indicators and dominance tracking
- **AI Reports**: Automated analysis and sentiment tracking

#### Available Endpoints
- `/api/tokens`: Detailed token information
- `/api/trader-grades`: Professional trading signals
- `/api/investor-grades`: Long-term investment analysis
- `/api/market-metrics`: Market health indicators

#### Integration Points
The Token Metrics MCP Server is used throughout the platform:
- Dashboard for real-time market data
- Portfolio tracking for performance analysis
- Betting marketplace for price verification
- AI research tools for market insights
- Meme coin analysis for launch pad

For detailed documentation, visit: `http://localhost:3002/api-docs`

## 📋 Project Structure

The project consists of three main components:

```bash
dashmetrics/
├── frontend/            # Next.js frontend application
├── backend/            # FastAPI backend application
├── tm-mcp-server/     # Token Metrics MCP Server
└── README.md          # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- Python 3.9 or later
- npm or yarn 
- pip (Python package installer)

### Setup and Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/dashmetrics.git
cd dashmetrics
```

#### 2. Set Up Environment Variables

Create `.env` files in both the frontend and backend directories:

```bash
# Copy the sample environment files
cp frontend/.env.sample frontend/.env
cp backend/.env.sample backend/.env

# Edit the .env files and fill in your credentials
```

#### 3. Running the Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install

# Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

This will start the frontend on [http://localhost:3000](http://localhost:3000).

#### 4. Running the Backend

In a separate terminal:

```bash
# Navigate to backend directory
cd backend

# Create virtual environment and install dependencies
./setup.sh
# Or manually:
# python -m venv venv
# source venv/bin/activate
# pip install -r requirements.txt

# Start the backend server
source venv/bin/activate
python run.py
```

The backend API will be available at [http://localhost:8000](http://localhost:8000), with API documentation at [http://localhost:8000/docs](http://localhost:8000/docs).

#### 5. Running the Eliza Agent

In a new terminal window:

```bash
# Clone the repository (if not already done)
git clone https://github.com/stephanienguyen2020/dashmetrics
cd dashmetrics

# Switch to the Eliza branch
git checkout eliza

# Create and configure environment
cp .env.sample .env
# Edit .env file with your credentials

# Install dependencies and build
pnpm install
pnpm build

# Start the Eliza agent
pnpm start --character="characters/crypto-sage.json"
```

## Troubleshooting

If you encounter any issues:

1. Make sure all environment variables are properly set
2. Check that all required ports (3000, 8000) are available
3. Ensure you have the correct versions of Node.js and Python installed
4. Clear your browser cache if you experience UI issues

## 🔧 API Documentation

The backend provides several API endpoints:

- **/token-metrics**: Token analytics and metrics endpoints
  - GET `/token-metrics/sentiment`: Get sentiment data for all tokens
  - GET `/token-metrics/sentiment/{symbols}`: Get sentiment for specific tokens 
  - GET `/token-metrics/tokens/{symbols}`: Get detailed token information
  - GET `/token-metrics/market-metrics`: Get overall market metrics

- **/coingecko**: Price and market data endpoints
  - GET `/coingecko/trending_pools`: Get trending liquidity pools
  - GET `/coingecko/ohlcv`: Get price history for tokens
  - GET `/coingecko/find_pool`: Search for specific pools

- **/tools**: Utility endpoints for market analysis
  - GET `/tools/pump-info/{token}`: Get detailed information about a token
  - GET `/tools/pump-top-market-cap`: List tokens with highest market cap

## 💻 Technology Stack

### 🎨 Frontend & UI

![Next.js](https://img.shields.io/badge/Next.js%2014-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### 🔧 Backend & API

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![ElizaOS](https://img.shields.io/badge/ElizaOS-FF6B6B?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PC9zdmc+&logoColor=white)

### ⛓️ Blockchain & Smart Contracts

![Solidity](https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white)
![Hardhat](https://img.shields.io/badge/Hardhat-FFD700?style=for-the-badge&logo=hardhat&logoColor=black)
![NEAR](https://img.shields.io/badge/NEAR-000000?style=for-the-badge&logo=near&logoColor=white)
![Aurora](https://img.shields.io/badge/Aurora-85FF8A?style=for-the-badge&logo=aurora&logoColor=black)
![NebulaBlock](https://img.shields.io/badge/NebulaBlock-6F4BB2?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PC9zdmc+&logoColor=white)

### 📦 Storage & IPFS

![Pinata](https://img.shields.io/badge/Pinata-E4405F?style=for-the-badge&logo=pinata&logoColor=white)

### 📊 AI & Integration

![OpenAI](https://img.shields.io/badge/GPT--4-412991?style=for-the-badge&logo=openai&logoColor=white)
![Twitter API](https://img.shields.io/badge/Twitter%20API-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)
