import { z } from 'zod';

// Common schemas
export const DateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
export const SymbolSchema = z.string();
export const TopKSchema = z.object({
  top_k: z.number().min(1).max(1000),
});

// Token schemas
export const TokenSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  price: z.number(),
  marketCap: z.number(),
  volume24h: z.number(),
  change24h: z.number(),
});

// Trader Grade schemas
export const TraderGradeSchema = z.object({
  symbol: SymbolSchema,
  grade: z.string(),
  confidence: z.number(),
  timestamp: z.string(),
});

// Investor Grade schemas
export const InvestorGradeSchema = z.object({
  symbol: SymbolSchema,
  grade: z.string(),
  confidence: z.number(),
  timestamp: z.string(),
});

// Market Metrics schemas
export const MarketMetricsSchema = z.object({
  totalMarketCap: z.number(),
  totalVolume24h: z.number(),
  btcDominance: z.number(),
  ethDominance: z.number(),
  timestamp: z.string(),
});

// Trading Signal schemas
export const TradingSignalSchema = z.object({
  timestamp: z.string(),
  signal: z.string(),
  strength: z.number(),
  confidence: z.number(),
});

// AI Report schemas
export const AIReportSchema = z.object({
  timestamp: z.string(),
  analysis: z.string(),
  sentiment: z.string(),
  recommendations: z.array(z.string()),
});

// API Endpoint schemas
export const GetTokensSchema = z.object({
  symbol: SymbolSchema,
});

export const GetTraderGradesSchema = z.object({
  symbol: SymbolSchema,
  startDate: DateSchema,
  endDate: DateSchema,
});

export const GetInvestorGradesSchema = z.object({
  symbol: SymbolSchema,
  startDate: DateSchema,
  endDate: DateSchema,
});

export const GetMarketMetricsSchema = z.object({
  startDate: DateSchema,
  endDate: DateSchema,
});

export const GetTradingSignalsSchema = z.object({
  symbol: SymbolSchema,
  startDate: DateSchema,
  endDate: DateSchema,
  signal: z.string().optional(),
});

export const GetAIReportsSchema = z.object({
  symbol: SymbolSchema,
});

export const GetTopMarketCapTokensSchema = z.object({
  top_k: TopKSchema,
});

export const GetResistanceSupportSchema = z.object({
  resistance: z.array(z.number()),
  support: z.array(z.number()),
});

export const GetPriceSchema = z.object({
  symbol: SymbolSchema,
  startDate: DateSchema,
  endDate: DateSchema,
});

export const GetSentimentSchema = z.object({
  symbol: SymbolSchema,
  startDate: DateSchema,
  endDate: DateSchema,
});

export const GetQuantMetricsSchema = z.object({
  symbol: SymbolSchema,
  startDate: DateSchema,
  endDate: DateSchema,
});

export const GetScenarioAnalysisSchema = z.object({
  scenarios: z.array(z.object({
    name: z.string(),
    probability: z.number(),
    priceTarget: z.number(),
    description: z.string(),
  })),
});

export const GetCorrelationSchema = z.object({
  correlation: z.number(),
  period: z.string(),
});

export const GetIndexHoldingsSchema = z.object({
  index_id: z.string(),
});

export const GetSectorIndicesHoldingsSchema = z.object({
  index_id: z.string(),
});

export const GetIndicesPerformanceSchema = z.object({
  startDate: DateSchema,
  endDate: DateSchema,
});

export const GetSectorIndicesPerformanceSchema = z.object({
  index_id: z.string(),
  startDate: DateSchema,
  endDate: DateSchema,
});

export const GetIndexTransactionSchema = z.object({
  index_id: z.string(),
  startDate: DateSchema,
  endDate: DateSchema,
});

export const GetSectorIndexTransactionSchema = z.object({
  index_id: z.string(),
  startDate: DateSchema,
  endDate: DateSchema,
});

export const DateRangeSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

export const PriceDataSchema = z.object({
  timestamp: z.string(),
  price: z.number(),
  volume: z.number(),
});

export const SentimentDataSchema = z.object({
  timestamp: z.string(),
  sentiment: z.number(),
  source: z.string(),
});

export const QuantMetricsSchema = z.object({
  timestamp: z.string(),
  metrics: z.record(z.string(), z.number()),
});

export const ScenarioAnalysisSchema = z.object({
  scenarios: z.array(z.object({
    name: z.string(),
    probability: z.number(),
    priceTarget: z.number(),
    description: z.string(),
  })),
});

export const CorrelationSchema = z.object({
  correlation: z.number(),
  period: z.string(),
});

export const IndexHoldingSchema = z.object({
  symbol: z.string(),
  weight: z.number(),
});

export const SectorIndexHoldingSchema = z.object({
  sector: z.string(),
  weight: z.number(),
}); 