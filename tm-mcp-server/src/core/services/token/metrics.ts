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

  async getIndexHoldings(indexId: string) {
    try {
      return await this.client.indexHoldings.get({ index_id: indexId });
    } catch (error) {
      this.handleError(error, 'fetch index holdings');
    }
  }

  async getSectorIndicesHoldings(indexId: string) {
    try {
      return await this.client.sectorIndicesHoldings.get({ index_id: indexId });
    } catch (error) {
      this.handleError(error, 'fetch sector indices holdings');
    }
  }

  async getIndicesPerformance(startDate: string, endDate: string) {
    try {
      return await this.client.indicesPerformance.get({ startDate, endDate });
    } catch (error) {
      this.handleError(error, 'fetch indices performance');
    }
  }

  async getSectorIndicesPerformance(indexId: string, startDate: string, endDate: string) {
    try {
      return await this.client.sectorIndicesPerformance.get({ index_id: indexId, startDate, endDate });
    } catch (error) {
      this.handleError(error, 'fetch sector indices performance');
    }
  }

  async getIndexTransaction(indexId: string, startDate: string, endDate: string) {
    try {
      return await this.client.indexTransaction.get({ index_id: indexId, startDate, endDate });
    } catch (error) {
      this.handleError(error, 'fetch index transaction data');
    }
  }

  async getSectorIndexTransaction(indexId: string, startDate: string, endDate: string) {
    try {
      return await this.client.sectorIndexTransaction.get({ index_id: indexId, startDate, endDate });
    } catch (error) {
      this.handleError(error, 'fetch sector index transaction data');
    }
  }
} 