declare module 'tmai-api' {
  export class TokenMetricsClient {
    constructor(apiKey: string);
    
    tokens: {
      get(params: { symbol: string }): Promise<any[]>;
    };
    
    topMarketCapTokens: {
      get(params: { top_k: number }): Promise<any[]>;
    };
    
    traderGrades: {
      get(params: { symbol: string; startDate: string; endDate: string }): Promise<any[]>;
    };
    
    investorGrades: {
      get(params: { symbol: string; startDate: string; endDate: string }): Promise<any[]>;
    };
    
    marketMetrics: {
      get(params: { startDate: string; endDate: string }): Promise<any[]>;
    };
    
    tradingSignals: {
      get(params: { symbol: string; startDate: string; endDate: string; signal?: string }): Promise<any[]>;
    };
    
    aiReports: {
      get(params: { symbol: string }): Promise<any[]>;
    };
  }
} 