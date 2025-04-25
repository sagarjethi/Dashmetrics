import express, { Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { FastMCP } from 'fastmcp';
import { createLogger } from '@/utils/logger';
import { errorHandler } from '@/middleware/errorHandler';
import { rateLimiter } from '@/middleware/rateLimiter';
import { validateRequest } from '@/middleware/validator';
import { TokenMetricsService, TokenGradesService, MarketMetricsService } from '@/core/services';
import * as schemas from '@/schemas/api';
import { IncomingMessage } from 'http';

const logger = createLogger('server');
const PORT = process.env.PORT || 3002;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Token Metrics MCP Server',
      version: '1.0.0',
      description: 'MCP Server for Token Metrics API',
      contact: {
        name: 'API Support',
        email: 'support@tokenmetrics.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Token: {
          type: 'object',
          properties: {
            symbol: { type: 'string' },
            name: { type: 'string' },
            price: { type: 'number' },
            marketCap: { type: 'number' },
            volume24h: { type: 'number' },
            change24h: { type: 'number' }
          }
        },
        TraderGrade: {
          type: 'object',
          properties: {
            symbol: { type: 'string' },
            grade: { type: 'string' },
            confidence: { type: 'number' },
            timestamp: { type: 'string' }
          }
        },
        InvestorGrade: {
          type: 'object',
          properties: {
            symbol: { type: 'string' },
            grade: { type: 'string' },
            confidence: { type: 'number' },
            timestamp: { type: 'string' }
          }
        },
        MarketMetrics: {
          type: 'object',
          properties: {
            totalMarketCap: { type: 'number' },
            totalVolume24h: { type: 'number' },
            btcDominance: { type: 'number' },
            ethDominance: { type: 'number' },
            timestamp: { type: 'string' }
          }
        }
      },
      parameters: {
        symbolParam: {
          in: 'query',
          name: 'symbol',
          required: true,
          schema: { type: 'string' },
          description: 'Token symbol'
        },
        startDateParam: {
          in: 'query',
          name: 'startDate',
          required: true,
          schema: { type: 'string', format: 'date' },
          description: 'Start date in YYYY-MM-DD format'
        },
        endDateParam: {
          in: 'query',
          name: 'endDate',
          required: true,
          schema: { type: 'string', format: 'date' },
          description: 'End date in YYYY-MM-DD format'
        }
      }
    },
    paths: {
      '/api/tokens': {
        get: {
          tags: ['Token Information'],
          summary: 'Get token information',
          parameters: [
            { $ref: '#/components/parameters/symbolParam' }
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Token' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/api/trader-grades': {
        get: {
          tags: ['Grades'],
          summary: 'Get trader grades',
          parameters: [
            { $ref: '#/components/parameters/symbolParam' },
            { $ref: '#/components/parameters/startDateParam' },
            { $ref: '#/components/parameters/endDateParam' }
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/TraderGrade' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/api/investor-grades': {
        get: {
          tags: ['Grades'],
          summary: 'Get investor grades',
          parameters: [
            { $ref: '#/components/parameters/symbolParam' },
            { $ref: '#/components/parameters/startDateParam' },
            { $ref: '#/components/parameters/endDateParam' }
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/InvestorGrade' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/api/market-metrics': {
        get: {
          tags: ['Market Data'],
          summary: 'Get market metrics',
          parameters: [
            { $ref: '#/components/parameters/startDateParam' },
            { $ref: '#/components/parameters/endDateParam' }
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/MarketMetrics' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/server/server.ts']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default async function startServer() {
  const app = express();
  const server = new FastMCP({
    name: 'tm-mcp-server',
    version: '1.0.0',
    authenticate: async (request: IncomingMessage) => {
      // Add your authentication logic here
      return {};
    },
  });

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(rateLimiter);
  app.use(errorHandler);

  // Swagger UI setup
  app.use('/api-docs', swaggerUi.serve);
  app.get('/api-docs', swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: 'Token Metrics API Documentation'
  }));

  // Serve Swagger spec as JSON
  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // Initialize Services
  const tokenMetricsService = new TokenMetricsService();
  const tokenGradesService = new TokenGradesService();
  const marketMetricsService = new MarketMetricsService();

  // Routes
  app.get('/api/tokens', validateRequest(schemas.GetTokensSchema), async (req: Request, res: Response) => {
    try {
      const { symbol } = req.query;
      const tokens = await tokenMetricsService.getTokens(symbol as string);
      res.json({ data: tokens });
    } catch (error) {
      logger.error('Error fetching tokens:', error);
      throw error;
    }
  });

  app.get('/api/trader-grades', validateRequest(schemas.GetTraderGradesSchema), async (req, res) => {
    try {
      const { symbol, startDate, endDate } = req.query;
      const grades = await tokenGradesService.getTraderGrades(
        symbol as string,
        startDate as string,
        endDate as string
      );
      res.json({ data: grades });
    } catch (error) {
      logger.error('Error fetching trader grades:', error);
      throw error;
    }
  });

  app.get('/api/investor-grades', validateRequest(schemas.GetInvestorGradesSchema), async (req, res) => {
    try {
      const { symbol, startDate, endDate } = req.query;
      const grades = await tokenGradesService.getInvestorGrades(
        symbol as string,
        startDate as string,
        endDate as string
      );
      res.json({ data: grades });
    } catch (error) {
      logger.error('Error fetching investor grades:', error);
      throw error;
    }
  });

  app.get('/api/market-metrics', validateRequest(schemas.GetMarketMetricsSchema), async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const metrics = await marketMetricsService.getMarketMetrics(
        startDate as string,
        endDate as string
      );
      res.json({ data: metrics });
    } catch (error) {
      logger.error('Error fetching market metrics:', error);
      throw error;
    }
  });

  app.get('/api/trading-signals', validateRequest(schemas.GetTradingSignalsSchema), async (req, res) => {
    try {
      const { symbol, startDate, endDate, signal } = req.query;
      const signals = await tokenMetricsService.getTradingSignals(
        symbol as string,
        startDate as string,
        endDate as string,
        signal as string
      );
      res.json({ data: signals });
    } catch (error) {
      logger.error('Error fetching trading signals:', error);
      throw error;
    }
  });

  app.get('/api/ai-reports', validateRequest(schemas.GetAIReportsSchema), async (req, res) => {
    try {
      const { symbol } = req.query;
      const reports = await tokenMetricsService.getAIReports(symbol as string);
      res.json({ data: reports });
    } catch (error) {
      logger.error('Error fetching AI reports:', error);
      throw error;
    }
  });

  app.get('/api/top-market-cap', validateRequest(schemas.GetTopMarketCapTokensSchema), async (req, res) => {
    try {
      const { top_k } = req.query;
      const tokens = await tokenMetricsService.getTopMarketCapTokens(Number(top_k));
      res.json({ data: tokens });
    } catch (error) {
      logger.error('Error fetching top market cap tokens:', error);
      throw error;
    }
  });

  app.get('/api/resistance-support', validateRequest(schemas.GetResistanceSupportSchema), async (req, res) => {
    try {
      const { symbol } = req.query;
      const levels = await tokenMetricsService.getResistanceSupport(symbol as string);
      res.json({ data: levels });
    } catch (error) {
      logger.error('Error fetching resistance and support levels:', error);
      throw error;
    }
  });

  app.get('/api/price', validateRequest(schemas.GetPriceSchema), async (req, res) => {
    try {
      const { symbol, startDate, endDate } = req.query;
      const prices = await tokenMetricsService.getPrice(
        symbol as string,
        startDate as string,
        endDate as string
      );
      res.json({ data: prices });
    } catch (error) {
      logger.error('Error fetching price data:', error);
      throw error;
    }
  });

  app.get('/api/sentiment', validateRequest(schemas.GetSentimentSchema), async (req, res) => {
    try {
      const { symbol, startDate, endDate } = req.query;
      const sentiment = await tokenMetricsService.getSentiment(
        symbol as string,
        startDate as string,
        endDate as string
      );
      res.json({ data: sentiment });
    } catch (error) {
      logger.error('Error fetching sentiment data:', error);
      throw error;
    }
  });

  app.get('/api/quant-metrics', validateRequest(schemas.GetQuantMetricsSchema), async (req, res) => {
    try {
      const { symbol, startDate, endDate } = req.query;
      const metrics = await tokenMetricsService.getQuantMetrics(
        symbol as string,
        startDate as string,
        endDate as string
      );
      res.json({ data: metrics });
    } catch (error) {
      logger.error('Error fetching quantitative metrics:', error);
      throw error;
    }
  });

  app.get('/api/scenario-analysis', validateRequest(schemas.GetScenarioAnalysisSchema), async (req, res) => {
    try {
      const { symbol } = req.query;
      const analysis = await tokenMetricsService.getScenarioAnalysis(symbol as string);
      res.json({ data: analysis });
    } catch (error) {
      logger.error('Error fetching scenario analysis:', error);
      throw error;
    }
  });

  app.get('/api/correlation', validateRequest(schemas.GetCorrelationSchema), async (req, res) => {
    try {
      const { base_symbol, quote_symbol, startDate, endDate } = req.query;
      const correlation = await tokenMetricsService.getCorrelation(
        base_symbol as string,
        quote_symbol as string,
        startDate as string,
        endDate as string
      );
      res.json({ data: correlation });
    } catch (error) {
      logger.error('Error fetching correlation data:', error);
      throw error;
    }
  });

  app.get('/api/index-holdings', validateRequest(schemas.GetIndexHoldingsSchema), async (req, res) => {
    try {
      const { index_id } = req.query;
      const holdings = await tokenMetricsService.getIndexHoldings(index_id as string);
      res.json({ data: holdings });
    } catch (error) {
      logger.error('Error fetching index holdings:', error);
      throw error;
    }
  });

  app.get('/api/sector-indices-holdings', validateRequest(schemas.GetSectorIndicesHoldingsSchema), async (req, res) => {
    try {
      const { index_id } = req.query;
      const holdings = await tokenMetricsService.getSectorIndicesHoldings(index_id as string);
      res.json({ data: holdings });
    } catch (error) {
      logger.error('Error fetching sector indices holdings:', error);
      throw error;
    }
  });

  app.get('/api/indices-performance', validateRequest(schemas.GetIndicesPerformanceSchema), async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const performance = await tokenMetricsService.getIndicesPerformance(
        startDate as string,
        endDate as string
      );
      res.json({ data: performance });
    } catch (error) {
      logger.error('Error fetching indices performance:', error);
      throw error;
    }
  });

  app.get('/api/sector-indices-performance', validateRequest(schemas.GetSectorIndicesPerformanceSchema), async (req, res) => {
    try {
      const { index_id, startDate, endDate } = req.query;
      const performance = await tokenMetricsService.getSectorIndicesPerformance(
        index_id as string,
        startDate as string,
        endDate as string
      );
      res.json({ data: performance });
    } catch (error) {
      logger.error('Error fetching sector indices performance:', error);
      throw error;
    }
  });

  app.get('/api/index-transaction', validateRequest(schemas.GetIndexTransactionSchema), async (req, res) => {
    try {
      const { index_id, startDate, endDate } = req.query;
      const transactions = await tokenMetricsService.getIndexTransaction(
        index_id as string,
        startDate as string,
        endDate as string
      );
      res.json({ data: transactions });
    } catch (error) {
      logger.error('Error fetching index transaction data:', error);
      throw error;
    }
  });

  app.get('/api/sector-index-transaction', validateRequest(schemas.GetSectorIndexTransactionSchema), async (req, res) => {
    try {
      const { index_id, startDate, endDate } = req.query;
      const transactions = await tokenMetricsService.getSectorIndexTransaction(
        index_id as string,
        startDate as string,
        endDate as string
      );
      res.json({ data: transactions });
    } catch (error) {
      logger.error('Error fetching sector index transaction data:', error);
      throw error;
    }
  });

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  // Start HTTP server
  app.listen(PORT, () => {
    logger.info(`HTTP Server running at http://localhost:${PORT}`);
    logger.info(`API Documentation available at http://localhost:${PORT}/api-docs`);
  });

  // Start MCP server
  await server.start();
  logger.info('MCP Server running on stdio');

  return { app, server };
} 