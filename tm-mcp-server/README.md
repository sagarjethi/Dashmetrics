# Token Metrics MCP Server

A powerful server implementation that integrates Token Metrics API with Model Context Protocol (MCP) capabilities. This server provides real-time cryptocurrency data, market analysis, and AI-driven insights through a unified API interface.

## 🚀 Features

### Token Information
- Detailed token data including price, market cap, volume, and price changes
- Historical price data and trends
- Top market cap tokens tracking

### Trading Analysis
- Trader grades with confidence scores
- Investor grades for long-term analysis
- Trading signals and indicators

### Market Metrics
- Overall market health indicators
- Bitcoin and Ethereum dominance
- Total market capitalization
- 24-hour volume tracking

### AI Reports
- Automated market analysis
- Sentiment analysis
- Price predictions
- Risk assessments

## 📚 API Documentation

The server provides a Swagger UI interface for easy API exploration at:
```
http://localhost:3002/api-docs
```

### Available Endpoints

#### Token Information
- `GET /api/tokens`
  - Get detailed information about specific tokens
  - Parameters: `symbol` (required)

#### Grades
- `GET /api/trader-grades`
  - Get trader-focused grade analysis
  - Parameters: `symbol`, `startDate`, `endDate` (all required)
  
- `GET /api/investor-grades`
  - Get investor-focused grade analysis
  - Parameters: `symbol`, `startDate`, `endDate` (all required)

#### Market Data
- `GET /api/market-metrics`
  - Get overall market health metrics
  - Parameters: `startDate`, `endDate` (required)

## 🛠 Tech Stack

- **Runtime**: [Bun](https://bun.sh/) - For fast JavaScript/TypeScript execution
- **Framework**: Express.js - For HTTP server implementation
- **Documentation**: Swagger/OpenAPI 3.0
- **Logging**: Winston
- **Rate Limiting**: express-rate-limit
- **Type Safety**: TypeScript

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime installed
- Token Metrics API key

### Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Configure your environment variables:
```env
PORT=3002
NODE_ENV=development
TOKEN_METRICS_API_KEY=your_api_key_here
LOG_LEVEL=info
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

## 📁 Project Structure

```
tm-mcp-server/
├── src/
│   ├── core/
│   │   └── services/         # Service implementations
│   ├── middleware/           # Express middleware
│   │   ├── errorHandler.ts   # Error handling
│   │   ├── rateLimiter.ts   # Rate limiting
│   │   └── validator.ts      # Request validation
│   ├── schemas/             # API schemas and validation
│   ├── utils/
│   │   └── logger.ts        # Logging configuration
│   ├── server/
│   │   └── server.ts        # Main server setup
│   └── index.ts             # Application entry point
├── .env                     # Environment configuration
└── package.json            # Project dependencies
```

## 🔒 Security

- Rate limiting to prevent abuse
- Error handling middleware
- Input validation
- Environment-based configuration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Token Metrics API](https://tokenmetrics.com)
- [Express.js](https://expressjs.com)
- [TypeScript](https://www.typescriptlang.org)
- [Winston](https://github.com/winstonjs/winston)
- [Zod](https://github.com/colinhacks/zod)
