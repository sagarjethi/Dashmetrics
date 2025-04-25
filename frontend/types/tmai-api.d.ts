declare module 'tmai-api' {
  export class TokenMetricsClient {
    constructor(apiKey: string);
    
    tokens: {
      get(params: { symbol: string }): Promise<any>;
    };
    
    hourlyOhlcv: {
      get(params: { symbol: string; startDate: string; endDate: string }): Promise<any>;
    };
    
    dailyOhlcv: {
      get(params: { symbol: string; startDate: string; endDate: string }): Promise<any>;
    };
    
    investorGrades: {
      get(params: { symbol: string; startDate: string; endDate: string }): Promise<any>;
    };
    
    traderGrades: {
      get(params: { symbol: string; startDate: string; endDate: string }): Promise<any>;
    };
    
    traderIndices: {
      get(params: { startDate: string; endDate: string }): Promise<any>;
    };
    
    marketMetrics: {
      get(params: { startDate: string; endDate: string }): Promise<any>;
    };
    
    aiAgent: {
      ask(question: string): Promise<string>;
    };
    
    aiReports: {
      get(params: { symbol: string }): Promise<any>;
    };
    
    tradingSignals: {
      get(params: { symbol: string; startDate: string; endDate: string; signal: string }): Promise<any>;
    };
    
    investorIndices: {
      get(params: { startDate: string; endDate: string }): Promise<any>;
    };
    
    topMarketCapTokens: {
      get(params: { top_k: number }): Promise<any>;
    };
    
    resistanceSupport: {
      get(params: { symbol: string }): Promise<any>;
    };
    
    sentiment: {
      get(params: { symbol: string; startDate: string; endDate: string }): Promise<any>;
    };
    
    quantmetrics: {
      get(params: { symbol: string; startDate: string; endDate: string }): Promise<any>;
    };
    
    scenarioAnalysis: {
      get(params: { symbol: string }): Promise<any>;
    };
    
    correlation: {
      get(params: { base_symbol: string; quote_symbol: string; startDate: string; endDate: string }): Promise<any>;
    };
    
    indexHoldings: {
      get(params: { index_id: string }): Promise<any>;
    };
    
    indicesPerformance: {
      get(params: { startDate: string; endDate: string }): Promise<any>;
    };
  }
} 