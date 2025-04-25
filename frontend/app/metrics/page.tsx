"use client";

import { motion } from "framer-motion";
import { AppLayout } from "../components/app-layout";
import GridBackground from "../components/GridBackground";
import { useState, useEffect } from "react";
import * as tokenMetrics from "../services/tokenMetrics";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays, format, subDays, differenceInDays } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Area } from 'recharts';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { Calendar as CalendarIcon } from "lucide-react";

// Sentiment data interfaces
interface SentimentData {
  DATETIME: string;
  MARKET_SENTIMENT_GRADE: number;
  MARKET_SENTIMENT_LABEL: string;
  NEWS_SENTIMENT_GRADE: number;
  NEWS_SENTIMENT_LABEL: string;
  NEWS_SUMMARY: string;
  REDDIT_SENTIMENT_GRADE: number;
  REDDIT_SENTIMENT_LABEL: string;
  REDDIT_SUMMARY: string;
  TWITTER_SENTIMENT_GRADE: number;
  TWITTER_SENTIMENT_LABEL: string;
  TWITTER_SUMMARY: string;
}

interface SentimentResponse {
  success: boolean;
  message: string;
  length: number;
  data: SentimentData[];
}

// Utility functions for sentiment styling
const getSentimentColor = (grade: number) => {
  if (grade > 70) return 'text-green-500';
  if (grade > 40) return 'text-yellow-500';
  return 'text-red-500';
};

const getSentimentBgColor = (grade: number) => {
  if (grade > 70) return 'bg-green-500/10';
  if (grade > 40) return 'bg-yellow-500/10';
  return 'bg-red-500/10';
};

// Sentiment Card Component
const SentimentCard = ({ title, grade, label }: { title: string; grade: number; label: string }) => (
  <div className={`p-4 rounded-lg ${getSentimentBgColor(grade)}`}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium">{title}</span>
      <div className={`w-2 h-2 rounded-full ${getSentimentColor(grade)}`} />
    </div>
    <div className="flex items-baseline gap-2">
      <span className={`text-2xl font-bold ${getSentimentColor(grade)}`}>
        {grade.toFixed(2)}
      </span>
      <span className="text-sm text-muted-foreground capitalize">
        ({label})
      </span>
    </div>
  </div>
);

// Insight Card Component
const InsightCard = ({ title, content, icon }: { title: string; content: string; icon: React.ReactNode }) => (
  <div className="p-4 rounded-lg bg-background/50">
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h4 className="text-sm font-semibold">{title}</h4>
    </div>
    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{content}</p>
  </div>
);

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Error Message Component
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="p-4 text-center text-red-500 bg-red-500/10 rounded-lg">
    {message}
  </div>
);

// No Data Message Component
const NoDataMessage = () => (
  <div className="p-4 text-center text-muted-foreground">
    No sentiment data available
  </div>
);

// Add interface for trading signal data
interface TradingSignalData {
  TOKEN_ID: number;
  TOKEN_NAME: string;
  TOKEN_SYMBOL: string;
  DATE: string;
  TRADING_SIGNAL: number;
  TOKEN_TREND: number;
  TRADING_SIGNALS_RETURNS: number;
  HOLDING_RETURNS: number;
  tm_link: string;
  TM_TRADER_GRADE: number;
  TM_INVESTOR_GRADE: number | null;
  TM_LINK: string;
}

// Update TradingSignalCard component
const TradingSignalCard = ({ signal }: { signal: TradingSignalData }) => {
  const signalType = signal.TRADING_SIGNAL === 0 ? 'HOLD' : 
                     signal.TRADING_SIGNAL === 1 ? 'BUY' : 'SELL';
  
  const trendType = signal.TOKEN_TREND === 1 ? 'UPTREND' : 
                    signal.TOKEN_TREND === -1 ? 'DOWNTREND' : 'NEUTRAL';

  const getSignalColor = (signal: number) => {
    switch(signal) {
      case 1: return 'bg-green-500/10 text-green-500';
      case -1: return 'bg-red-500/10 text-red-500';
      default: return 'bg-yellow-500/10 text-yellow-500';
    }
  };

  const formatReturn = (value: number) => {
    return value.toFixed(2) + '%';
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">{signal.TOKEN_NAME}</h3>
        <span className="text-xs text-muted-foreground">{format(new Date(signal.DATE), 'MMM dd, yyyy')}</span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 rounded text-xs ${getSignalColor(signal.TRADING_SIGNAL)}`}>
            {signalType}
          </span>
          <span className={`px-2 py-1 rounded text-xs ${
            signal.TOKEN_TREND === 1 ? 'bg-green-500/10 text-green-500' : 
            signal.TOKEN_TREND === -1 ? 'bg-red-500/10 text-red-500' : 
            'bg-yellow-500/10 text-yellow-500'
          }`}>
            {trendType}
          </span>
        </div>

        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Signal Returns:</span>
            <span className={signal.TRADING_SIGNALS_RETURNS >= 0 ? 'text-green-500' : 'text-red-500'}>
              {formatReturn(signal.TRADING_SIGNALS_RETURNS)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Holding Returns:</span>
            <span className={signal.HOLDING_RETURNS >= 0 ? 'text-green-500' : 'text-red-500'}>
              {formatReturn(signal.HOLDING_RETURNS)}
            </span>
          </div>

          {signal.TM_TRADER_GRADE && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Trader Grade:</span>
              <span>{signal.TM_TRADER_GRADE.toFixed(1)}</span>
            </div>
          )}

          {signal.TM_INVESTOR_GRADE && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Investor Grade:</span>
              <span>{signal.TM_INVESTOR_GRADE.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

// Add a PriceChart component to properly display the price data
const PriceChart = ({ data, symbol }: { data: any[]; symbol: string }) => {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatVolume = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex items-center justify-between px-4">
        <div>
          <h2 className="text-2xl font-bold">{symbol}</h2>
          <p className="text-lg text-muted-foreground">
            Latest Price: {data.length > 0 ? formatPrice(data[data.length - 1].price) : 'N/A'}
          </p>
        </div>
        {data.length > 1 && (
          <div className={`px-3 py-1 rounded-full text-sm ${
            data[data.length - 1].price > data[0].price
              ? 'bg-green-500/10 text-green-500'
              : 'bg-red-500/10 text-red-500'
          }`}>
            {((data[data.length - 1].price - data[0].price) / data[0].price * 100).toFixed(2)}%
          </div>
        )}
      </div>

      {/* Chart section with adjusted margins */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{
              top: 10,
              right: 60, // Increased right margin for price labels
              left: 60,  // Increased left margin for volume labels
              bottom: 30 // Increased bottom margin for date labels
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="date"
              stroke="#666"
              tick={{ fill: '#666' }}
              interval="preserveStartEnd"
              tickMargin={10}
              height={40}
            />
            <YAxis
              yAxisId="price"
              orientation="right"
              domain={['auto', 'auto']}
              tick={{ fill: '#666' }}
              tickFormatter={formatPrice}
              tickMargin={8}
              width={60}
            />
            <YAxis
              yAxisId="volume"
              orientation="left"
              domain={['auto', 'auto']}
              tick={{ fill: '#666' }}
              tickFormatter={formatVolume}
              tickMargin={8}
              width={60}
            />
            <Tooltip
              contentStyle={{
                background: '#1a1a1a',
                border: '1px solid #333',
                padding: '8px',
                fontSize: '12px'
              }}
              labelStyle={{ color: '#666', marginBottom: '4px' }}
              formatter={(value: any, name: string) => {
                if (name === 'Volume') return [formatVolume(value), 'Volume'];
                return [formatPrice(value), 'Price'];
              }}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Area
              yAxisId="volume"
              dataKey="volume"
              fill="rgba(59, 130, 246, 0.1)"
              stroke="rgba(59, 130, 246, 0.5)"
              name="Volume"
            />
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="price"
              stroke="#10b981"
              dot={false}
              name="Price"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Stats section with improved spacing */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        <div className="p-4 rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground mb-1">24h High</p>
          <p className="text-lg font-semibold truncate">
            {data.length > 0 ? formatPrice(Math.max(...data.map(d => d.high))) : 'N/A'}
          </p>
        </div>
        <div className="p-4 rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground mb-1">24h Low</p>
          <p className="text-lg font-semibold truncate">
            {data.length > 0 ? formatPrice(Math.min(...data.map(d => d.low))) : 'N/A'}
          </p>
        </div>
        <div className="p-4 rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground mb-1">24h Volume</p>
          <p className="text-lg font-semibold truncate">
            {data.length > 0 ? formatVolume(data[data.length - 1].volume) : 'N/A'}
          </p>
        </div>
        <div className="p-4 rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground mb-1">Open</p>
          <p className="text-lg font-semibold truncate">
            {data.length > 0 ? formatPrice(data[data.length - 1].open) : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

// Add interfaces for market metrics data
interface MarketMetric {
  DATE: string;
  TOTAL_MARKET_CAP: number;
  TOTAL_VOLUME: number;
  BTC_DOMINANCE: number;
  DEFI_MARKET_CAP: number;
  DEFI_VOLUME: number;
  DEFI_TVL: number;
  NFT_MARKET_CAP: number;
  NFT_VOLUME: number;
}

// Add MarketMetricsCard component
const MarketMetricsCard = ({ title, value, change, prefix = '$' }: { 
  title: string;
  value: number;
  change?: number;
  prefix?: string;
}) => {
  const formatValue = (val: number) => {
    if (prefix === '%') return `${val.toFixed(2)}%`;
    if (val >= 1e12) return `${prefix}${(val / 1e12).toFixed(2)}T`;
    if (val >= 1e9) return `${prefix}${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `${prefix}${(val / 1e6).toFixed(2)}M`;
    return `${prefix}${val.toFixed(2)}`;
  };

  return (
    <Card className="p-4">
      <div className="flex flex-col space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-2xl font-bold">{formatValue(value)}</p>
        {change !== undefined && (
          <div className={`text-sm ${
            change >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
          </div>
        )}
      </div>
    </Card>
  );
};

// Add MarketChart component
const MarketChart = ({ data, dataKey, title, prefix = '$' }: {
  data: any[];
  dataKey: string;
  title: string;
  prefix?: string;
}) => {
  const formatValue = (val: number) => {
    if (prefix === '%') return `${val.toFixed(2)}%`;
    if (val >= 1e12) return `${prefix}${(val / 1e12).toFixed(2)}T`;
    if (val >= 1e9) return `${prefix}${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `${prefix}${(val / 1e6).toFixed(2)}M`;
    return `${prefix}${val.toFixed(2)}`;
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 60, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="date"
              stroke="#666"
              tick={{ fill: '#666' }}
              tickFormatter={(val) => format(new Date(val), 'MMM dd')}
            />
            <YAxis
              stroke="#666"
              tick={{ fill: '#666' }}
              tickFormatter={formatValue}
            />
            <Tooltip
              contentStyle={{ background: '#1a1a1a', border: '1px solid #333' }}
              formatter={(value: any) => [formatValue(value), title]}
              labelFormatter={(label) => format(new Date(label), 'MMM dd, yyyy')}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#3b82f6"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

// Update date utility functions
const getDefaultDateRange = () => {
  const end = subDays(new Date(), 1); // Set to yesterday
  end.setHours(23, 59, 59, 999);
  const start = subDays(end, 30); // Set to 30 days before end date
  start.setHours(0, 0, 0, 0);
  return { from: start, to: end };
};

const validateAndUpdateDates = (newDates: DateRange | undefined) => {
  if (!newDates?.from || !newDates?.to) {
    return getDefaultDateRange();
  }

  const yesterday = subDays(new Date(), 1);
  yesterday.setHours(23, 59, 59, 999);

  let to = newDates.to;
  let from = newDates.from;

  // If selected 'to' date is in future, set it to yesterday
  if (to > yesterday) {
    to = yesterday;
  }

  // If selected 'from' date is after 'to' date, adjust it
  if (from > to) {
    from = subDays(to, 30);
  }

  // If date range is more than 30 days, adjust 'from' date
  const daysDiff = differenceInDays(to, from);
  if (daysDiff > 30) {
    from = subDays(to, 30);
  }

  return { from, to };
};

// Update formatDateForAPI function
const formatDateForAPI = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

interface TokenMetricsResponse {
  success: boolean;
  message?: string;
  data: any;
}

interface MarketMetricsParams {
  startDate: string;
  endDate: string;
}

interface TradingSignalsParams {
  symbols: string[];
  startDate: string;
  endDate: string;
  signal: string;
}

interface AIAnalysisResponse {
  success: boolean;
  message: string;
  data: {
    analysis: string;
    sentiment: string;
    confidence: number;
  };
}

interface TradingSignal {
  date: string;
  signal: string;
  confidence: number;
  TOKEN_SYMBOL: string;
  TOKEN_NAME: string;
  TOKEN_ID: number;
  TRADING_SIGNAL: number;
  TOKEN_TREND: number;
  TRADING_SIGNALS_RETURNS: number;
  HOLDING_RETURNS: number;
  TM_TRADER_GRADE: number;
  TM_INVESTOR_GRADE: number | null;
  DATE: string;
  tm_link: string;
  TM_LINK: string;
}

export default function TokenMetricsPage() {
  // Initialize with default date range
  const [selectedDates, setSelectedDates] = useState(getDefaultDateRange());
  const [selectedSymbol, setSelectedSymbol] = useState("BTC");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Data states
  const [topTokens, setTopTokens] = useState<any[]>([]);
  const [marketMetrics, setMarketMetrics] = useState<MarketMetric[]>([]);
  const [traderGrades, setTraderGrades] = useState<any[]>([]);
  const [investorGrades, setInvestorGrades] = useState<any[]>([]);
  const [priceData, setPriceData] = useState<any[]>([]);
  const [groupedPriceData, setGroupedPriceData] = useState<Record<string, any[]>>({});
  const [sentiment, setSentiment] = useState<any>(null);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [aiQuestion, setAiQuestion] = useState("");
  const [groupedTraderGrades, setGroupedTraderGrades] = useState<Record<string, any[]>>({});
  const [groupedInvestorGrades, setGroupedInvestorGrades] = useState<Record<string, any[]>>({});
  const [sentimentData, setSentimentData] = useState<SentimentData | null>(null);
  const [sentimentLoading, setSentimentLoading] = useState(false);
  const [sentimentError, setSentimentError] = useState<string | null>(null);
  const [tradingSignals, setTradingSignals] = useState<TradingSignal[]>([]);
  const [tradingSignalsLoading, setTradingSignalsLoading] = useState(false);
  const [tradingSignalsError, setTradingSignalsError] = useState<string | null>(null);

  // Fetch functions
  const fetchData = async (dates = selectedDates) => {
    setLoading(true);
    setError(null);
    try {
      const [marketMetricsResponse, tokenDataResponse] = await Promise.all([
        tokenMetrics.getMarketMetrics({
          startDate: formatDateForAPI(dates.from),
          endDate: formatDateForAPI(dates.to)
        } as MarketMetricsParams),
        fetchTokenData(selectedSymbol, dates)
      ]);

      if (marketMetricsResponse?.success) {
        setMarketMetrics(marketMetricsResponse.data);
      }
    } catch (error) {
      setError('Error fetching data');
      console.error('Data fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTokenData = async (symbol: string, dates = selectedDates) => {
    try {
      const [priceResponse, traderResponse, investorResponse] = await Promise.all([
        tokenMetrics.getDailyOHLCV(
          symbol,
          formatDateForAPI(dates.from),
          formatDateForAPI(dates.to)
        ),
        tokenMetrics.getTraderGrades(
          symbol,
          formatDateForAPI(dates.from),
          formatDateForAPI(dates.to)
        ),
        tokenMetrics.getInvestorGrades(
          symbol,
          formatDateForAPI(dates.from),
          formatDateForAPI(dates.to)
        )
      ]);

      // Fetch trading signals separately with fixed dates
      const signalsResponse = await tokenMetrics.getTradingSignals(
        symbol,
        '2025-03-25',  // Fixed start date for trading signals
        '2025-04-23',  // Fixed end date for trading signals
        'all'
      );

      if (priceResponse?.success) {
        setPriceData(priceResponse.data);
        setGroupedPriceData(groupPriceData(priceResponse.data));
      }
      
      // Handle trader grades response
      if (!traderResponse?.success) {
        console.warn('Failed to fetch trader grades:', traderResponse?.message || 'Unknown error');
        setTraderGrades([]);
      } else if (traderResponse?.data) {
        setTraderGrades(traderResponse.data);
      }

      // Handle investor grades response
      if (!investorResponse?.success) {
        console.warn('Failed to fetch investor grades:', investorResponse?.message || 'Unknown error');
        setInvestorGrades([]);
      } else if (investorResponse?.data) {
        setInvestorGrades(investorResponse.data);
      }

      // Handle trading signals response
      if (!signalsResponse?.success) {
        console.warn('Failed to fetch trading signals:', signalsResponse?.message || 'Unknown error');
        setTradingSignals([]);
      } else if (signalsResponse?.data) {
        setTradingSignals(signalsResponse.data.signals || []);
      }

    } catch (error) {
      console.error('Error fetching token data:', error);
      throw error;
    }
  };

  // Function to group price data by token
  const groupPriceData = (data: any[]) => {
    const grouped: Record<string, any[]> = {};
    data.forEach(item => {
      const key = item.SYMBOL; // OHLCV data format uses SYMBOL
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push({
        date: format(new Date(item.DATE), 'MMM dd'),
        price: item.CLOSE,
        open: item.OPEN,
        high: item.HIGH,
        low: item.LOW,
        volume: item.VOLUME
      });
    });
    return grouped;
  };

  // Function to group trader grades data by token
  const groupTraderGrades = (data: any[]) => {
    const grouped: Record<string, any[]> = {};
    data.forEach(item => {
      const key = `${item.TOKEN_NAME} (${item.TOKEN_SYMBOL})`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push({
        date: format(new Date(item.DATE), 'MMM dd'),
        taGrade: item.TA_GRADE,
        quantGrade: item.QUANT_GRADE,
        traderGrade: item.TM_TRADER_GRADE,
        gradeChange: item.TM_TRADER_GRADE_24H_PCT_CHANGE
      });
    });
    return grouped;
  };

  // Function to group investor grades data by token
  const groupInvestorGrades = (data: any[]) => {
    const grouped: Record<string, any[]> = {};
    data.forEach(item => {
      const key = `${item.TOKEN_NAME} (${item.TOKEN_SYMBOL})`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push({
        date: format(new Date(item.DATE), 'MMM dd'),
        TM_INVESTOR_GRADE: item.TM_INVESTOR_GRADE,
        TM_INVESTOR_GRADE_7D_PCT_CHANGE: item.TM_INVESTOR_GRADE_7D_PCT_CHANGE,
        TECHNOLOGY_GRADE: item.TECHNOLOGY_GRADE,
        ACTIVITY_SCORE: item.ACTIVITY_SCORE,
        REPOSITORY_SCORE: item.REPOSITORY_SCORE,
        COLLABORATION_SCORE: item.COLLABORATION_SCORE,
        DEFI_SCANNER_SCORE: item.DEFI_SCANNER_SCORE
      });
    });
    return grouped;
  };

  // Add a useEffect to reset dates when component mounts
  useEffect(() => {
    const defaultDates = getDefaultDateRange();
    setSelectedDates(defaultDates);
    fetchData(defaultDates);
  }, []); // Run once on mount

  useEffect(() => {
    if (priceData.length > 0) {
      setGroupedPriceData(groupPriceData(priceData));
    }
  }, [priceData]);

  useEffect(() => {
    if (traderGrades.length > 0) {
      setGroupedTraderGrades(groupTraderGrades(traderGrades));
    }
  }, [traderGrades]);

  useEffect(() => {
    if (investorGrades.length > 0) {
      setGroupedInvestorGrades(groupInvestorGrades(investorGrades));
    }
  }, [investorGrades]);

  const handleFetchTradingSignals = async () => {
    try {
      setTradingSignalsLoading(true);
      const response = await tokenMetrics.getTradingSignals(
        selectedSymbol,
        '2025-03-25',  // Fixed start date for trading signals
        '2025-04-23',  // Fixed end date for trading signals
        'all'
      );
      
      if (response?.success) {
        setTradingSignals(response.data.signals || []);
      } else {
        setTradingSignalsError(response?.message || 'Failed to fetch trading signals');
      }
    } catch (err) {
      console.error('Error fetching trading signals:', err);
      setTradingSignalsError('Failed to fetch trading signals');
    } finally {
      setTradingSignalsLoading(false);
    }
  };

  const handleAskAI = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tokenMetrics.getAIAnalysis(selectedSymbol);
      const analysisResponse = response as AIAnalysisResponse;
      
      if (!analysisResponse.success) {
        setError(analysisResponse.message || 'Failed to get AI analysis');
        return;
      }
      
      setAiAnalysis(analysisResponse.data.analysis);
    } catch (err) {
      setError('Failed to get AI analysis');
      console.error('Error fetching AI analysis:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch sentiment data
  const fetchSentimentData = async () => {
    try {
      setSentimentLoading(true);
      setSentimentError(null);
      
      console.log('Fetching sentiment data for:', selectedSymbol);
      const response: TokenMetricsResponse = await tokenMetrics.getSentiment(
        selectedSymbol,
        format(selectedDates.from, 'yyyy-MM-dd'),
        format(selectedDates.to, 'yyyy-MM-dd')
      );
      
      console.log('Sentiment response:', response);
      
      if (!response?.success) {
        throw new Error(response?.message || 'Failed to fetch sentiment data');
      }
      
      if (!response.data || response.data.length === 0) {
        throw new Error('No sentiment data available');
      }
      
      setSentimentData(response.data[0]);
      console.log('Set sentiment data:', response.data[0]);
    } catch (error) {
      console.error('Error fetching sentiment:', error);
      setSentimentError(error instanceof Error ? error.message : 'An error occurred');
      setSentimentData(null);
    } finally {
      setSentimentLoading(false);
    }
  };

  // Call fetchSentimentData when needed
  useEffect(() => {
    if (selectedSymbol) {
      console.log('Selected symbol changed:', selectedSymbol);
      fetchSentimentData();
    }
  }, [selectedSymbol, selectedDates]);

  // Update signals response handling
  const handleSignalsResponse = (response: TokenMetricsResponse) => {
    if (response?.success) {
      setTradingSignals(response.data);
    } else {
      setError(response?.message || 'Failed to fetch signals');
    }
  };

  // Update useEffect to call handleFetchTradingSignals without dates
  useEffect(() => {
    if (selectedSymbol) {
      handleFetchTradingSignals();
    }
  }, [selectedSymbol]); // Only depend on symbol changes for trading signals

  return (
    <AppLayout showFooter={false}>
      <GridBackground />
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container py-8"
        >
          <h1 className="mb-2 text-4xl font-bold">
            Token <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Metrics</span>
          </h1>
          <p className="mb-8 text-muted-foreground">
            Professional-grade cryptocurrency analysis and insights
          </p>

          {error && (
            <div className="p-4 mb-4 text-sm text-red-500 bg-red-500/10 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex items-center gap-4 mb-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !selectedDates && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDates?.from ? (
                    selectedDates.to ? (
                      <>
                        {format(selectedDates.from, "LLL dd, y")} -{" "}
                        {format(selectedDates.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(selectedDates.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={selectedDates?.from}
                  selected={selectedDates}
                  onSelect={(newDates) => {
                    const validatedDates = validateAndUpdateDates(newDates);
                    setSelectedDates(validatedDates);
                    if (validatedDates.from && validatedDates.to) {
                      fetchData(validatedDates);
                    }
                  }}
                  numberOfMonths={2}
                  disabled={(date) => {
                    const yesterday = subDays(new Date(), 1);
                    yesterday.setHours(23, 59, 59, 999);
                    const monthsAgo = subDays(new Date(), 365); // Keep 1 year limit for historical data
                    return date > yesterday || date < monthsAgo;
                  }}
                />
              </PopoverContent>
            </Popover>
            <Input
              placeholder="Enter token symbol (e.g., BTC)"
              value={selectedSymbol}
              onChange={(e) => setSelectedSymbol(e.target.value.toUpperCase())}
              className="max-w-[200px]"
            />
            <Button onClick={() => fetchData()}>
              Analyze Token
            </Button>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="market">Market</TabsTrigger>
              <TabsTrigger value="trader">Trader</TabsTrigger>
              <TabsTrigger value="investor">Investor</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="ai">AI Agent</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {loading ? (
                <LoadingSpinner />
              ) : error ? (
                <ErrorMessage message={error} />
              ) : (
                <>
                  {priceData && priceData.length > 0 && (
                    <Card className="p-6 overflow-hidden">
                      <PriceChart 
                        data={priceData.map(d => ({
                          date: format(new Date(d.DATE), 'MMM dd'),
                          price: d.CLOSE,
                          high: d.HIGH,
                          low: d.LOW,
                          volume: d.VOLUME,
                          open: d.OPEN
                        }))} 
                        symbol={selectedSymbol}
                      />
                    </Card>
                  )}

                  {/* Trading Signals Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">Trading Signals</h2>
                      <span className="text-sm text-muted-foreground">
                        Latest signals for {selectedSymbol}
                      </span>
                    </div>
                    
                    {tradingSignalsLoading ? (
                      <LoadingSpinner />
                    ) : tradingSignalsError ? (
                      <ErrorMessage message={tradingSignalsError} />
                    ) : !tradingSignals || tradingSignals.length === 0 ? (
                      <div className="text-center text-muted-foreground p-4 bg-muted/50 rounded-lg">
                        No trading signals available for {selectedSymbol}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tradingSignals
                          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                          .slice(0, 6)
                          .map((signal, index) => (
                            <TradingSignalCard 
                              key={`${signal.TOKEN_SYMBOL}-${signal.date}-${index}`} 
                              signal={signal} 
                            />
                          ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="sentiment" className="space-y-4">
              {sentimentLoading ? (
                <LoadingSpinner />
              ) : sentimentError ? (
                <ErrorMessage message={sentimentError} />
              ) : !sentimentData ? (
                <NoDataMessage />
              ) : (
                <div className="space-y-6">
                  <Card className="p-6 bg-card/50 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Market Sentiment Analysis</h2>
                      <div className="text-sm text-muted-foreground">
                        Last Updated: {new Date(sentimentData.DATETIME).toLocaleString()}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      <div className="p-6 rounded-lg bg-[#1a1b1e] border border-blue-500/20">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-medium text-blue-400">Market Sentiment</span>
                          <div className={`w-2 h-2 rounded-full ${
                            Number(sentimentData.MARKET_SENTIMENT_GRADE) > 70 ? 'bg-green-500' : 
                            Number(sentimentData.MARKET_SENTIMENT_GRADE) > 40 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-4xl font-bold text-blue-400 mb-1">
                            {Number(sentimentData.MARKET_SENTIMENT_GRADE).toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-400">
                            ({sentimentData.MARKET_SENTIMENT_LABEL})
                          </span>
                        </div>
                      </div>

                      <div className="p-6 rounded-lg bg-[#1a1b1e] border border-purple-500/20">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-medium text-purple-400">News Sentiment</span>
                          <div className={`w-2 h-2 rounded-full ${
                            Number(sentimentData.NEWS_SENTIMENT_GRADE) > 70 ? 'bg-green-500' : 
                            Number(sentimentData.NEWS_SENTIMENT_GRADE) > 40 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-4xl font-bold text-purple-400 mb-1">
                            {Number(sentimentData.NEWS_SENTIMENT_GRADE).toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-400">
                            ({sentimentData.NEWS_SENTIMENT_LABEL})
                          </span>
                        </div>
                      </div>

                      <div className="p-6 rounded-lg bg-[#1a1b1e] border border-orange-500/20">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-medium text-orange-400">Reddit Sentiment</span>
                          <div className={`w-2 h-2 rounded-full ${
                            Number(sentimentData.REDDIT_SENTIMENT_GRADE) > 70 ? 'bg-green-500' : 
                            Number(sentimentData.REDDIT_SENTIMENT_GRADE) > 40 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-4xl font-bold text-orange-400 mb-1">
                            {Number(sentimentData.REDDIT_SENTIMENT_GRADE).toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-400">
                            ({sentimentData.REDDIT_SENTIMENT_LABEL})
                          </span>
                        </div>
                      </div>

                      <div className="p-6 rounded-lg bg-[#1a1b1e] border border-cyan-500/20">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-medium text-cyan-400">Twitter Sentiment</span>
                          <div className={`w-2 h-2 rounded-full ${
                            Number(sentimentData.TWITTER_SENTIMENT_GRADE) > 70 ? 'bg-green-500' : 
                            Number(sentimentData.TWITTER_SENTIMENT_GRADE) > 40 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-4xl font-bold text-cyan-400 mb-1">
                            {Number(sentimentData.TWITTER_SENTIMENT_GRADE).toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-400">
                            ({sentimentData.TWITTER_SENTIMENT_LABEL})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="p-6 rounded-lg bg-[#1a1b1e] border border-blue-500/20">
                        <div className="flex items-center gap-3 mb-4">
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                          <h3 className="text-lg font-medium text-blue-400">News Analysis</h3>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                          {sentimentData.NEWS_SUMMARY}
                        </p>
                      </div>

                      <div className="p-6 rounded-lg bg-[#1a1b1e] border border-orange-500/20">
                        <div className="flex items-center gap-3 mb-4">
                          <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                          </svg>
                          <h3 className="text-lg font-medium text-orange-400">Reddit Community</h3>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                          {sentimentData.REDDIT_SUMMARY}
                        </p>
                      </div>

                      <div className="p-6 rounded-lg bg-[#1a1b1e] border border-cyan-500/20">
                        <div className="flex items-center gap-3 mb-4">
                          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          <h3 className="text-lg font-medium text-cyan-400">Twitter Pulse</h3>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                          {sentimentData.TWITTER_SUMMARY}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="market" className="space-y-6">
              {loading ? (
                <LoadingSpinner />
              ) : error ? (
                <ErrorMessage message={error} />
              ) : marketMetrics && marketMetrics.length > 0 ? (
                <>
                  {/* Overview Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MarketMetricsCard
                      title="Total Market Cap"
                      value={marketMetrics[marketMetrics.length - 1].TOTAL_MARKET_CAP}
                      change={((marketMetrics[marketMetrics.length - 1].TOTAL_MARKET_CAP - marketMetrics[0].TOTAL_MARKET_CAP) / 
                        marketMetrics[0].TOTAL_MARKET_CAP) * 100}
                    />
                    <MarketMetricsCard
                      title="Total Volume (24h)"
                      value={marketMetrics[marketMetrics.length - 1].TOTAL_VOLUME}
                    />
                    <MarketMetricsCard
                      title="Bitcoin Dominance"
                      value={marketMetrics[marketMetrics.length - 1].BTC_DOMINANCE}
                      prefix="%"
                    />
                    <MarketMetricsCard
                      title="DeFi TVL"
                      value={marketMetrics[marketMetrics.length - 1].DEFI_TVL}
                    />
                  </div>

                  {/* Market Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <MarketChart
                      data={marketMetrics}
                      dataKey="TOTAL_MARKET_CAP"
                      title="Total Market Capitalization"
                    />
                    <MarketChart
                      data={marketMetrics}
                      dataKey="TOTAL_VOLUME"
                      title="Total Trading Volume"
                    />
                  </div>

                  {/* DeFi & NFT Section */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">DeFi & NFT Markets</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <MarketMetricsCard
                        title="DeFi Market Cap"
                        value={marketMetrics[marketMetrics.length - 1].DEFI_MARKET_CAP}
                        change={((marketMetrics[marketMetrics.length - 1].DEFI_MARKET_CAP - marketMetrics[0].DEFI_MARKET_CAP) / 
                          marketMetrics[0].DEFI_MARKET_CAP) * 100}
                      />
                      <MarketMetricsCard
                        title="DeFi Volume"
                        value={marketMetrics[marketMetrics.length - 1].DEFI_VOLUME}
                      />
                      <MarketMetricsCard
                        title="NFT Market Cap"
                        value={marketMetrics[marketMetrics.length - 1].NFT_MARKET_CAP}
                        change={((marketMetrics[marketMetrics.length - 1].NFT_MARKET_CAP - marketMetrics[0].NFT_MARKET_CAP) / 
                          marketMetrics[0].NFT_MARKET_CAP) * 100}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <MarketChart
                        data={marketMetrics}
                        dataKey="DEFI_TVL"
                        title="DeFi Total Value Locked"
                      />
                      <MarketChart
                        data={marketMetrics}
                        dataKey="NFT_VOLUME"
                        title="NFT Trading Volume"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center text-muted-foreground p-4">
                  No market data available
                </div>
              )}
            </TabsContent>

            <TabsContent value="trader" className="space-y-4">
              {loading ? (
                <div className="text-center text-muted-foreground">Loading trader grades...</div>
              ) : error ? (
                <div className="text-center text-red-500">{error}</div>
              ) : Object.keys(groupedTraderGrades).length > 0 ? (
                <div className="grid gap-6">
                  {Object.entries(groupedTraderGrades).map(([tokenName, data]) => {
                    const latestData = data[0];
                    const previousData = data[1];
                    const gradeChange = Number(latestData.gradeChange) || 0;
                    const isPositive = gradeChange > 0;

                    return (
                      <Card key={tokenName} className="p-6 bg-card/50 backdrop-blur-sm">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{tokenName}</h3>
                            <p className="text-sm text-muted-foreground">
                              Trader Grade: {Number(latestData.traderGrade).toFixed(2)}
                            </p>
                          </div>
                          <div className={`px-3 py-1 rounded-full ${
                            isPositive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                          }`}>
                            {isPositive ? '↑' : '↓'} {Math.abs(gradeChange).toFixed(2)}%
                          </div>
                        </div>

                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={[...data].reverse()}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis domain={[0, 100]} />
                              <Tooltip 
                                formatter={(value: number) => [Number(value).toFixed(2), 'Grade']}
                              />
                              <Area 
                                type="monotone" 
                                dataKey="traderGrade" 
                                fill={isPositive ? "#22c55e" : "#ef4444"}
                                fillOpacity={0.1}
                                stroke={isPositive ? "#22c55e" : "#ef4444"}
                                strokeWidth={2}
                              />
                            </ComposedChart>
                          </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-muted-foreground">TA Grade</p>
                            <div className="flex items-center gap-2">
                              <p className="text-lg font-semibold">{Number(latestData.taGrade).toFixed(2)}</p>
                              <div className={`w-2 h-2 rounded-full ${
                                Number(latestData.taGrade) > 70 ? 'bg-green-500' : 
                                Number(latestData.taGrade) > 40 ? 'bg-yellow-500' : 'bg-red-500'
                              }`} />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Quant Grade</p>
                            <div className="flex items-center gap-2">
                              <p className="text-lg font-semibold">{Number(latestData.quantGrade).toFixed(2)}</p>
                              <div className={`w-2 h-2 rounded-full ${
                                Number(latestData.quantGrade) > 70 ? 'bg-green-500' : 
                                Number(latestData.quantGrade) > 40 ? 'bg-yellow-500' : 'bg-red-500'
                              }`} />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">24h Change</p>
                            <p className={`text-lg font-semibold ${
                              isPositive ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {isPositive ? '+' : ''}{gradeChange.toFixed(2)}%
                            </p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-muted-foreground">No trader grades available</div>
              )}
            </TabsContent>

            <TabsContent value="investor" className="space-y-4">
              {loading ? (
                <div className="text-center text-muted-foreground">Loading investor grades...</div>
              ) : error ? (
                <div className="text-center text-red-500">{error}</div>
              ) : investorGrades.length > 0 ? (
                <div className="grid gap-6">
                  {Object.entries(groupedInvestorGrades).map(([tokenName, data]) => {
                    const latestData = data[0];
                    const previousData = data[1];
                    const gradeChange = latestData.TM_INVESTOR_GRADE_7D_PCT_CHANGE !== null ? 
                      Number(latestData.TM_INVESTOR_GRADE_7D_PCT_CHANGE) : 0;
                    const isPositive = gradeChange > 0;

                    return (
                      <Card key={tokenName} className="p-6 bg-card/50 backdrop-blur-sm">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{tokenName}</h3>
                            <p className="text-sm text-muted-foreground">
                              Investor Grade: {latestData.TM_INVESTOR_GRADE !== null ? 
                                Number(latestData.TM_INVESTOR_GRADE).toFixed(2) : 'N/A'}
                            </p>
                          </div>
                          <div className={`px-3 py-1 rounded-full ${
                            isPositive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                          }`}>
                            {isPositive ? '↑' : '↓'} {Math.abs(gradeChange).toFixed(2)}%
                          </div>
                        </div>

                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={[...data].reverse()}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis domain={[0, 100]} />
                              <Tooltip 
                                formatter={(value: number) => [Number(value).toFixed(2), 'Grade']}
                              />
                              <Area 
                                type="monotone" 
                                dataKey="TM_INVESTOR_GRADE" 
                                fill={isPositive ? "#22c55e" : "#ef4444"}
                                fillOpacity={0.1}
                                stroke={isPositive ? "#22c55e" : "#ef4444"}
                                strokeWidth={2}
                              />
                            </ComposedChart>
                          </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                          {latestData.TECHNOLOGY_GRADE !== null && (
                            <div>
                              <p className="text-sm text-muted-foreground">Technology Grade</p>
                              <div className="flex items-center gap-2">
                                <p className="text-lg font-semibold">{Number(latestData.TECHNOLOGY_GRADE).toFixed(2)}</p>
                                <div className={`w-2 h-2 rounded-full ${
                                  Number(latestData.TECHNOLOGY_GRADE) > 70 ? 'bg-green-500' : 
                                  Number(latestData.TECHNOLOGY_GRADE) > 40 ? 'bg-yellow-500' : 'bg-red-500'
                                }`} />
                              </div>
                            </div>
                          )}
                          {latestData.ACTIVITY_SCORE !== null && (
                            <div>
                              <p className="text-sm text-muted-foreground">Activity Score</p>
                              <div className="flex items-center gap-2">
                                <p className="text-lg font-semibold">{Number(latestData.ACTIVITY_SCORE).toFixed(2)}</p>
                                <div className={`w-2 h-2 rounded-full ${
                                  Number(latestData.ACTIVITY_SCORE) > 7 ? 'bg-green-500' : 
                                  Number(latestData.ACTIVITY_SCORE) > 4 ? 'bg-yellow-500' : 'bg-red-500'
                                }`} />
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-muted-foreground">No investor grades available</div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </AppLayout>
  );
}