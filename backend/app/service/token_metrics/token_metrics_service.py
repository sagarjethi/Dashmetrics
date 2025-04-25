from tmai_api import TokenMetricsClient
import os
from dotenv import load_dotenv
from fastapi import HTTPException
from typing import Dict, List, Any, Optional
import pandas as pd
from datetime import datetime, timedelta
import requests

# Load environment variables
load_dotenv()

# Get Token Metrics API key from environment
TOKEN_METRICS_API_KEY = os.getenv("TOKEN_METRICS_API_KEY")

class TokenMetricsService:
    """Service for interacting with the Token Metrics AI API."""
    
    def __init__(self, api_key: Optional[str] = None):
        """Initialize the Token Metrics service.
        
        Args:
            api_key: The Token Metrics API key, defaults to environment variable if not provided
        """
        # Use provided API key or fallback to environment variable
        self.api_key = api_key or TOKEN_METRICS_API_KEY
        
        if not self.api_key:
            raise ValueError("Token Metrics API key not found. Please set TOKEN_METRICS_API_KEY in .env file.")
        
        # Initialize the Token Metrics client
        self.client = TokenMetricsClient(api_key=self.api_key)
    
    def get_tokens(self, symbols: str) -> Dict[str, Any]:
        """Get information for specified cryptocurrencies.
        
        Args:
            symbols: Comma-separated list of symbols (e.g., "BTC,ETH")
            
        Returns:
            Token information for the specified symbols
        """
        try:
            return self.client.tokens.get(symbol=symbols)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching token data: {str(e)}")
    
    def get_tokens_dataframe(self, symbols: str) -> pd.DataFrame:
        """Get token information as a DataFrame.
        
        Args:
            symbols: Comma-separated list of symbols (e.g., "BTC,ETH")
            
        Returns:
            DataFrame with token information
        """
        try:
            return self.client.tokens.get_dataframe(symbol=symbols)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching token data: {str(e)}")
    
    def get_trader_grades(self, symbols: str, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get short-term trading grades for specified tokens.
        
        Args:
            symbols: Comma-separated list of symbols (e.g., "BTC,ETH")
            start_date: Start date in YYYY-MM-DD format
            end_date: End date in YYYY-MM-DD format
            
        Returns:
            Trader grades for the specified symbols and date range
        """
        try:
            return self.client.trader_grades.get(
                symbol=symbols,
                startDate=start_date,
                endDate=end_date
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching trader grades: {str(e)}")
    
    def get_investor_grades(self, symbols: str, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get long-term investment grades for specified tokens.
        
        Args:
            symbols: Comma-separated list of symbols (e.g., "BTC,ETH")
            start_date: Start date in YYYY-MM-DD format
            end_date: End date in YYYY-MM-DD format
            
        Returns:
            Investor grades for the specified symbols and date range
        """
        try:
            return self.client.investor_grades.get(
                symbol=symbols,
                startDate=start_date,
                endDate=end_date
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching investor grades: {str(e)}")
    
    def get_daily_ohlcv(self, symbols: str, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get daily price data for specified tokens.
        
        Args:
            symbols: Comma-separated list of symbols (e.g., "BTC,ETH")
            start_date: Start date in YYYY-MM-DD format
            end_date: End date in YYYY-MM-DD format
            
        Returns:
            Daily OHLCV data for the specified symbols and date range
        """
        try:
            return self.client.daily_ohlcv.get(
                symbol=symbols,
                startDate=start_date,
                endDate=end_date
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching daily OHLCV data: {str(e)}")
    
    def get_hourly_ohlcv(self, symbols: str, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get hourly price data for specified tokens.
        
        Args:
            symbols: Comma-separated list of symbols (e.g., "BTC,ETH")
            start_date: Start date in YYYY-MM-DD format
            end_date: End date in YYYY-MM-DD format
            
        Returns:
            Hourly OHLCV data for the specified symbols and date range
        """
        try:
            return self.client.hourly_ohlcv.get(
                symbol=symbols,
                startDate=start_date,
                endDate=end_date
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching hourly OHLCV data: {str(e)}")
    
    def get_market_metrics(self, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get market metrics data.
        
        Args:
            start_date: Start date in YYYY-MM-DD format
            end_date: End date in YYYY-MM-DD format
            
        Returns:
            Market metrics data for the specified date range
        """
        try:
            return self.client.market_metrics.get(
                startDate=start_date,
                endDate=end_date
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching market metrics: {str(e)}")
    
    def get_ai_report(self, symbols: str) -> Dict[str, Any]:
        """Get AI-generated reports for specified tokens.
        
        Args:
            symbols: Comma-separated list of symbols (e.g., "BTC,ETH")
            
        Returns:
            AI reports for the specified symbols
        """
        try:
            return self.client.ai_reports.get(symbol=symbols)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching AI reports: {str(e)}")
    
    def get_trading_signals(self, symbols: str, start_date: str, end_date: str, signal: str = None) -> Dict[str, Any]:
        """Get trading signals for specified tokens.
        
        Args:
            symbols: Comma-separated list of symbols (e.g., "BTC,ETH")
            start_date: Start date in YYYY-MM-DD format
            end_date: End date in YYYY-MM-DD format
            signal: Signal type (1 for bullish, -1 for bearish, None for all)
            
        Returns:
            Trading signals for the specified symbols and date range
        """
        try:
            if signal:
                return self.client.trading_signals.get(
                    symbol=symbols,
                    startDate=start_date,
                    endDate=end_date,
                    signal=signal
                )
            else:
                return self.client.trading_signals.get(
                    symbol=symbols,
                    startDate=start_date,
                    endDate=end_date
                )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching trading signals: {str(e)}")
    
    def ask_ai_agent(self, question: str) -> str:
        """Ask the AI agent a question.
        
        Args:
            question: The question to ask the AI agent
            
        Returns:
            The AI agent's answer
        """
        try:
            return self.client.ai_agent.get_answer_text(question)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error asking AI agent: {str(e)}")
    
    def get_trader_indices(self, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get trader indices data.
        
        Args:
            start_date: Start date in YYYY-MM-DD format
            end_date: End date in YYYY-MM-DD format
            
        Returns:
            Trader indices data for the specified date range
        """
        try:
            return self.client.trader_indices.get(
                startDate=start_date,
                endDate=end_date
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching trader indices: {str(e)}")
    
    def get_sentiment(self, symbols: Optional[str] = None, limit: int = 1000, page: int = 0) -> Dict[str, Any]:
        """Get sentiment data for tokens.
        
        Args:
            symbols: Optional comma-separated list of symbols (e.g., "BTC,ETH")
            limit: Maximum number of results to return
            page: Page number for pagination
            
        Returns:
            Sentiment data for the specified symbols
        """
        try:
            url = f"https://api.tokenmetrics.com/v2/sentiments"
            params = {"limit": limit, "page": page}
            
            if symbols:
                params["symbol"] = symbols
                
            headers = {
                "accept": "application/json",
                "api_key": self.api_key
            }
            
            response = requests.get(url, headers=headers, params=params)
            
            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, 
                                   detail=f"Error fetching sentiment data: {response.text}")
            
            data = response.json()
            return {"success": True, "data": data}
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching sentiment data: {str(e)}")


# Create a singleton instance
token_metrics_service = None

def get_token_metrics_service() -> TokenMetricsService:
    """Get the Token Metrics service singleton instance.
    
    Returns:
        The Token Metrics service instance
    """
    global token_metrics_service
    if token_metrics_service is None:
        token_metrics_service = TokenMetricsService()
    return token_metrics_service 