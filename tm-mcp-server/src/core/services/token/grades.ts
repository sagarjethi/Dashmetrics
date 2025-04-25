import { BaseService } from '../base';

interface Grade {
  symbol: string;
  grade: string;
  confidence: number;
  timestamp: string;
}

export class TokenGradesService extends BaseService {
  constructor() {
    super('TokenGradesService');
  }

  async getTraderGrades(
    symbol: string,
    startDate: string,
    endDate: string
  ): Promise<Grade[]> {
    this.validateSymbol(symbol);
    this.validateDateRange(startDate, endDate);
    return this.handleRequest<Grade[]>('/grades/trader', {
      symbol,
      startDate,
      endDate
    });
  }

  async getInvestorGrades(
    symbol: string,
    startDate: string,
    endDate: string
  ): Promise<Grade[]> {
    this.validateSymbol(symbol);
    this.validateDateRange(startDate, endDate);
    return this.handleRequest<Grade[]>('/grades/investor', {
      symbol,
      startDate,
      endDate
    });
  }
} 