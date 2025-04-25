import { TokenMetricsClient } from 'tmai-api';

const TMAI_API_KEY = 'hack-b3f7d3e9-421d-47a3-b4e0-44dca99c0f0d';

export const tokenMetricsClient = new TokenMetricsClient(TMAI_API_KEY);

// Basic Token Info
export const getTokens = async (symbols: string) => {
  try {
    return await tokenMetricsClient.tokens.get({ symbol: symbols });
  } catch (error) {
    console.error('Error fetching tokens:', error);
    throw error;
  }
};

// Price Data
export const getHourlyOHLCV = async (symbol: string, startDate: string, endDate: string) => {
  try {
    return await tokenMetricsClient.hourlyOhlcv.get({ symbol, startDate, endDate });
  } catch (error) {
    console.error('Error fetching hourly OHLCV:', error);
    throw error;
  }
};

export const getDailyOHLCV = async (symbol: string, startDate: string, endDate: string) => {
  try {
    return await tokenMetricsClient.dailyOhlcv.get({ symbol, startDate, endDate });
  } catch (error) {
    console.error('Error fetching daily OHLCV:', error);
    throw error;
  }
};

// Grades and Signals
export const getInvestorGrades = async (symbols: string, startDate: string, endDate: string) => {
  try {
    return await tokenMetricsClient.investorGrades.get({ symbol: symbols, startDate, endDate });
  } catch (error) {
    console.error('Error fetching investor grades:', error);
    throw error;
  }
};

export const getTraderGrades = async (symbols: string, startDate: string, endDate: string) => {
  try {
    return await tokenMetricsClient.traderGrades.get({ symbol: symbols, startDate, endDate });
  } catch (error) {
    console.error('Error fetching trader grades:', error);
    throw error;
  }
};

export const getTradingSignals = async (symbols: string, startDate: string, endDate: string, signal: string) => {
  try {
    return await tokenMetricsClient.tradingSignals.get({ symbol: symbols, startDate, endDate, signal });
  } catch (error) {
    console.error('Error fetching trading signals:', error);
    throw error;
  }
};

// Market Data
export const getMarketMetrics = async (startDate: string, endDate: string) => {
  try {
    return await tokenMetricsClient.marketMetrics.get({ startDate, endDate });
  } catch (error) {
    console.error('Error fetching market metrics:', error);
    throw error;
  }
};

export const getTopMarketCapTokens = async (topK: number = 100) => {
  try {
    return await tokenMetricsClient.topMarketCapTokens.get({ top_k: topK });
  } catch (error) {
    console.error('Error fetching top market cap tokens:', error);
    throw error;
  }
};

// Technical Analysis
export const getResistanceSupport = async (symbol: string) => {
  try {
    return await tokenMetricsClient.resistanceSupport.get({ symbol });
  } catch (error) {
    console.error('Error fetching resistance/support levels:', error);
    throw error;
  }
};

export const getSentiment = async (symbol: string, startDate: string, endDate: string) => {
  try {
    return await tokenMetricsClient.sentiment.get({ symbol, startDate, endDate });
  } catch (error) {
    console.error('Error fetching sentiment data:', error);
    throw error;
  }
};

export const getQuantMetrics = async (symbol: string, startDate: string, endDate: string) => {
  try {
    return await tokenMetricsClient.quantmetrics.get({ symbol, startDate, endDate });
  } catch (error) {
    console.error('Error fetching quant metrics:', error);
    throw error;
  }
};

// AI and Analysis
export const getAIAnalysis = async (question: string) => {
  try {
    return await tokenMetricsClient.aiAgent.ask(question);
  } catch (error) {
    console.error('Error fetching AI analysis:', error);
    throw error;
  }
};

export const getAIReports = async (symbols: string) => {
  try {
    return await tokenMetricsClient.aiReports.get({ symbol: symbols });
  } catch (error) {
    console.error('Error fetching AI reports:', error);
    throw error;
  }
};

export const getScenarioAnalysis = async (symbol: string) => {
  try {
    return await tokenMetricsClient.scenarioAnalysis.get({ symbol });
  } catch (error) {
    console.error('Error fetching scenario analysis:', error);
    throw error;
  }
};

// Correlation and Comparison
export const getCorrelation = async (baseSymbol: string, quoteSymbol: string, startDate: string, endDate: string) => {
  try {
    return await tokenMetricsClient.correlation.get({ base_symbol: baseSymbol, quote_symbol: quoteSymbol, startDate, endDate });
  } catch (error) {
    console.error('Error fetching correlation data:', error);
    throw error;
  }
};

// Indices
export const getTraderIndices = async (startDate: string, endDate: string) => {
  try {
    return await tokenMetricsClient.traderIndices.get({ startDate, endDate });
  } catch (error) {
    console.error('Error fetching trader indices:', error);
    throw error;
  }
};

export const getInvestorIndices = async (startDate: string, endDate: string) => {
  try {
    return await tokenMetricsClient.investorIndices.get({ startDate, endDate });
  } catch (error) {
    console.error('Error fetching investor indices:', error);
    throw error;
  }
};

export const getIndexHoldings = async (indexId: string) => {
  try {
    return await tokenMetricsClient.indexHoldings.get({ index_id: indexId });
  } catch (error) {
    console.error('Error fetching index holdings:', error);
    throw error;
  }
};

export const getIndicesPerformance = async (startDate: string, endDate: string) => {
  try {
    return await tokenMetricsClient.indicesPerformance.get({ startDate, endDate });
  } catch (error) {
    console.error('Error fetching indices performance:', error);
    throw error;
  }
}; 