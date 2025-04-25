from typing import Dict, List, Any, Optional
from pydantic import BaseModel, Field

class TokensResponse(BaseModel):
    """Response model for token information"""
    success: bool = Field(..., description="Whether the request was successful")
    data: List[Dict[str, Any]] = Field(..., description="Token data")
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "data": [
                    {
                        "TOKEN_SYMBOL": "BTC",
                        "NAME": "Bitcoin",
                        "CMC_ID": 1,
                        "CIRCULATING_SUPPLY": 19000000,
                        "TOTAL_SUPPLY": 21000000,
                        "MARKET_CAP": 1000000000000,
                        "VOLUME_24H": 50000000000
                    }
                ]
            }
        }

class TraderGradesResponse(BaseModel):
    """Response model for trader grades"""
    success: bool = Field(..., description="Whether the request was successful")
    data: List[Dict[str, Any]] = Field(..., description="Trader grades data")
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "data": [
                    {
                        "TOKEN_SYMBOL": "BTC",
                        "DATE": "2023-10-01",
                        "TM_TRADER_GRADE": 75,
                        "TECHNICAL_GRADE": 80,
                        "FUNDAMENTAL_GRADE": 70,
                        "RISK_GRADE": 65
                    }
                ]
            }
        }

class InvestorGradesResponse(BaseModel):
    """Response model for investor grades"""
    success: bool = Field(..., description="Whether the request was successful")
    data: List[Dict[str, Any]] = Field(..., description="Investor grades data")
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "data": [
                    {
                        "TOKEN_SYMBOL": "ETH",
                        "DATE": "2023-10-01",
                        "TM_INVESTOR_GRADE": 85,
                        "TECHNOLOGY_GRADE": 90,
                        "FUNDAMENTAL_GRADE": 80,
                        "RISK_GRADE": 75
                    }
                ]
            }
        }

class OHLCVResponse(BaseModel):
    """Response model for OHLCV data"""
    success: bool = Field(..., description="Whether the request was successful")
    data: List[Dict[str, Any]] = Field(..., description="OHLCV data")
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "data": [
                    {
                        "TOKEN_SYMBOL": "BTC",
                        "DATE": "2023-10-01",
                        "OPEN": 50000,
                        "HIGH": 51000,
                        "LOW": 49000,
                        "CLOSE": 50500,
                        "VOLUME": 50000000
                    }
                ]
            }
        }

class MarketMetricsResponse(BaseModel):
    """Response model for market metrics"""
    success: bool = Field(..., description="Whether the request was successful")
    data: List[Dict[str, Any]] = Field(..., description="Market metrics data")
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "data": [
                    {
                        "DATE": "2023-10-01",
                        "BITCOIN_DOMINANCE": 60,
                        "ALTCOIN_MARKET_CAP": 500000000000,
                        "FEAR_AND_GREED_VALUE": 55,
                        "FEAR_AND_GREED_CLASS": "Neutral"
                    }
                ]
            }
        }

class AIReportResponse(BaseModel):
    """Response model for AI reports"""
    success: bool = Field(..., description="Whether the request was successful")
    data: List[Dict[str, Any]] = Field(..., description="AI report data")
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "data": [
                    {
                        "TOKEN_SYMBOL": "BTC",
                        "TRADER_REPORT": "Bitcoin shows strong technical indicators with support at $48,000.",
                        "TECHNOLOGY_REPORT": "Bitcoin remains the leading cryptocurrency with solid network effects.",
                        "FUNDAMENTAL_REPORT": "Bitcoin adoption continues to grow with institutional interest."
                    }
                ]
            }
        }

class TradingSignalsResponse(BaseModel):
    """Response model for trading signals"""
    success: bool = Field(..., description="Whether the request was successful")
    data: List[Dict[str, Any]] = Field(..., description="Trading signals data")
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "data": [
                    {
                        "TOKEN_SYMBOL": "ETH",
                        "DATE": "2023-10-01",
                        "SIGNAL": 1,  # 1 for bullish, -1 for bearish
                        "SIGNAL_PRICE": 3000,
                        "SIGNAL_REASON": "Technical breakout detected",
                        "TRADING_SIGNALS_RETURNS": 5.2,
                        "HOLDING_RETURNS": 3.1
                    }
                ]
            }
        }

class AIAgentResponse(BaseModel):
    """Response model for AI agent"""
    question: str = Field(..., description="The question asked to the AI agent")
    answer: str = Field(..., description="The AI agent's answer")
    
    class Config:
        json_schema_extra = {
            "example": {
                "question": "What is your analysis of Bitcoin?",
                "answer": "Bitcoin currently shows strong bullish momentum with support at $48,000. Technical indicators suggest a potential move to $52,000 in the short term if the current trend continues."
            }
        }

class TraderIndicesResponse(BaseModel):
    """Response model for trader indices"""
    success: bool = Field(..., description="Whether the request was successful")
    data: List[Dict[str, Any]] = Field(..., description="Trader indices data")
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "data": [
                    {
                        "DATE": "2023-10-01",
                        "INDEX_NAME": "TM TOP 10 INDEX",
                        "INDEX_PERFORMANCE": 5.2,
                        "INDEX_HOLDINGS": [
                            {"TOKEN_SYMBOL": "BTC", "WEIGHT": 40},
                            {"TOKEN_SYMBOL": "ETH", "WEIGHT": 30},
                            {"TOKEN_SYMBOL": "SOL", "WEIGHT": 10}
                        ]
                    }
                ]
            }
        }

class SentimentResponse(BaseModel):
    """Response model for sentiment data"""
    success: bool = Field(..., description="Whether the request was successful")
    data: List[Dict[str, Any]] = Field(..., description="Sentiment data")
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "data": [
                    {
                        "DATE": "2023-10-01",
                        "SYMBOL": "BTC",
                        "SENTIMENT_SCORE": 75,
                        "SENTIMENT_LABEL": "Bullish",
                        "SOURCE": "Social Media"
                    }
                ]
            }
        } 