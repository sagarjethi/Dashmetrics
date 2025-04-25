import { BaseService } from '../base';
import { AppError } from '@/middleware/errorHandler';

interface MarketMetrics {
  totalMarketCap: number;
  totalVolume24h: number;
  btcDominance: number;
  ethDominance: number;
  timestamp: string;
}

export class MarketMetricsService extends BaseService {
  constructor() {
    super('MarketMetricsService');
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
} 