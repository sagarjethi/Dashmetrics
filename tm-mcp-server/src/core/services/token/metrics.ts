import { BaseService } from '../base';
import { AppError } from '@/middleware/errorHandler';

interface Token {
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  volume24h: number;
  change24h: number;
}

interface TraderGrade {
  symbol: string;
  grade: string;
  confidence: number;
  timestamp: string;
}

interface InvestorGrade {
  symbol: string;
  grade: string;
  confidence: number;
  timestamp: string;
}

interface MarketMetrics {
  totalMarketCap: number;
  totalVolume24h: number;
  btcDominance: number;
  ethDominance: number;
  timestamp: string;
}

export class TokenMetricsService extends BaseService {
  constructor() {
    super('TokenMetricsService');
  }

  async getTokens(symbol: string): Promise<Token[]> {
    this.validateSymbol(symbol);
    return this.handleRequest<Token[]>('/tokens', { symbol });
  }

  async getTopMarketCapTokens(top_k: number): Promise<Token[]> {
    if (top_k <= 0) {
      throw new AppError(400, 'top_k must be a positive number');
    }
    return this.handleRequest<Token[]>('/tokens/top-market-cap', { top_k });
  }

  async getTraderGrades(
    symbol: string,
    startDate: string,
    endDate: string
  ): Promise<TraderGrade[]> {
    this.validateSymbol(symbol);
    this.validateDateRange(startDate, endDate);
    return this.handleRequest<TraderGrade[]>('/grades/trader', {
      symbol,
      startDate,
      endDate
    });
  }

  async getInvestorGrades(
    symbol: string,
    startDate: string,
    endDate: string
  ): Promise<InvestorGrade[]> {
    this.validateSymbol(symbol);
    this.validateDateRange(startDate, endDate);
    return this.handleRequest<InvestorGrade[]>('/grades/investor', {
      symbol,
      startDate,
      endDate
    });
  }

  async getMarketMetrics(
    startDate: string,
    endDate: string
  ): Promise<MarketMetrics[]> {
    this.validateDateRange(startDate, endDate);
    return this.handleRequest<MarketMetrics[]>('/market/metrics', {
      startDate,
      endDate
    });
  }

  async getTradingSignals(
    symbol: string,
    startDate: string,
    endDate: string,
    signal?: string
  ): Promise<any> {
    this.validateSymbol(symbol);
    this.validateDateRange(startDate, endDate);
    return this.handleRequest('/trading/signals', {
      symbol,
      startDate,
      endDate,
      ...(signal && { signal })
    });
  }

  async getAIReports(symbol: string): Promise<any> {
    this.validateSymbol(symbol);
    return this.handleRequest('/ai/reports', { symbol });
  }

  async getResistanceSupport(symbol: string): Promise<any> {
    this.validateSymbol(symbol);
    return this.handleRequest('/analysis/resistance-support', { symbol });
  }

  async getPrice(
    symbol: string,
    startDate: string,
    endDate: string
  ): Promise<any> {
    this.validateSymbol(symbol);
    this.validateDateRange(startDate, endDate);
    return this.handleRequest('/price', {
      symbol,
      startDate,
      endDate
    });
  }

  async getSentiment(
    symbol: string,
    startDate: string,
    endDate: string
  ): Promise<any> {
    this.validateSymbol(symbol);
    this.validateDateRange(startDate, endDate);
    return this.handleRequest('/sentiment', {
      symbol,
      startDate,
      endDate
    });
  }

  async getQuantMetrics(
    symbol: string,
    startDate: string,
    endDate: string
  ): Promise<any> {
    this.validateSymbol(symbol);
    this.validateDateRange(startDate, endDate);
    return this.handleRequest('/metrics/quant', {
      symbol,
      startDate,
      endDate
    });
  }

  async getScenarioAnalysis(symbol: string): Promise<any> {
    this.validateSymbol(symbol);
    return this.handleRequest('/analysis/scenarios', { symbol });
  }

  async getCorrelation(
    base_symbol: string,
    quote_symbol: string,
    startDate: string,
    endDate: string
  ): Promise<any> {
    this.validateSymbol(base_symbol);
    this.validateSymbol(quote_symbol);
    this.validateDateRange(startDate, endDate);
    return this.handleRequest('/analysis/correlation', {
      base_symbol,
      quote_symbol,
      startDate,
      endDate
    });
  }

  async getIndexHoldings(index_id: string): Promise<any> {
    if (!index_id) {
      throw new AppError(400, 'Index ID is required');
    }
    return this.handleRequest('/indices/holdings', { index_id });
  }

  async getSectorIndicesHoldings(index_id: string): Promise<any> {
    if (!index_id) {
      throw new AppError(400, 'Index ID is required');
    }
    return this.handleRequest('/indices/sector/holdings', { index_id });
  }

  async getIndicesPerformance(
    startDate: string,
    endDate: string
  ): Promise<any> {
    this.validateDateRange(startDate, endDate);
    return this.handleRequest('/indices/performance', {
      startDate,
      endDate
    });
  }

  async getSectorIndicesPerformance(
    index_id: string,
    startDate: string,
    endDate: string
  ): Promise<any> {
    if (!index_id) {
      throw new AppError(400, 'Index ID is required');
    }
    this.validateDateRange(startDate, endDate);
    return this.handleRequest('/indices/sector/performance', {
      index_id,
      startDate,
      endDate
    });
  }

  async getIndexTransaction(
    index_id: string,
    startDate: string,
    endDate: string
  ): Promise<any> {
    if (!index_id) {
      throw new AppError(400, 'Index ID is required');
    }
    this.validateDateRange(startDate, endDate);
    return this.handleRequest('/indices/transactions', {
      index_id,
      startDate,
      endDate
    });
  }

  async getSectorIndexTransaction(
    index_id: string,
    startDate: string,
    endDate: string
  ): Promise<any> {
    if (!index_id) {
      throw new AppError(400, 'Index ID is required');
    }
    this.validateDateRange(startDate, endDate);
    return this.handleRequest('/indices/sector/transactions', {
      index_id,
      startDate,
      endDate
    });
  }
} 