import { AppError } from '@/middleware/errorHandler';
import { createLogger } from '@/utils/logger';

export class BaseService {
  protected logger;
  protected apiKey: string;

  constructor(serviceName: string) {
    this.logger = createLogger(serviceName);
    this.apiKey = process.env.TOKEN_METRICS_API_KEY || '';
    
    if (!this.apiKey) {
      throw new AppError(500, 'TOKEN_METRICS_API_KEY is required');
    }
  }

  protected async handleRequest<T>(
    endpoint: string,
    params: Record<string, string | number> = {}
  ): Promise<T> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        queryParams.append(key, String(value));
      });

      const url = `https://api.tokenmetrics.com/v1${endpoint}?${queryParams.toString()}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new AppError(
          response.status,
          errorData.message || `API request failed with status ${response.status}`
        );
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      
      this.logger.error('API request failed:', error);
      throw new AppError(500, 'Failed to fetch data from Token Metrics API');
    }
  }

  protected validateDateFormat(date: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      throw new AppError(400, 'Invalid date format. Use YYYY-MM-DD');
    }
    return true;
  }

  protected validateSymbol(symbol: string): boolean {
    if (!symbol || symbol.trim().length === 0) {
      throw new AppError(400, 'Symbol is required');
    }
    return true;
  }

  protected validateDateRange(startDate: string, endDate: string): boolean {
    this.validateDateFormat(startDate);
    this.validateDateFormat(endDate);

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      throw new AppError(400, 'Start date must be before end date');
    }

    return true;
  }
} 