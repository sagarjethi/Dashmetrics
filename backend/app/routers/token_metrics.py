from fastapi import APIRouter, Depends, Query, Path, status, HTTPException
from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta
from app.service.token_metrics import get_token_metrics_service
from app.schema.token_metrics import (
    TokensResponse, 
    TraderGradesResponse, 
    InvestorGradesResponse,
    OHLCVResponse,
    MarketMetricsResponse,
    AIReportResponse,
    TradingSignalsResponse,
    AIAgentResponse,
    TraderIndicesResponse,
    SentimentResponse
)

router = APIRouter(
    prefix="/token-metrics",
    tags=["Dashmetrics - Token Metrics"],
    responses={
        404: {"description": "Not found"},
        500: {"description": "Internal server error"}
    }
)

@router.get(
    "/tokens/{symbols}",
    response_model=TokensResponse,
    status_code=status.HTTP_200_OK,
    summary="Get token information",
    description="Dashmetrics Token Metrics: Get detailed information about specified cryptocurrencies"
)
async def get_tokens(
    symbols: str = Path(
        ..., 
        description="Comma-separated list of symbols (e.g., BTC,ETH)"
    )
):
    """
    Get detailed information about specified cryptocurrencies using Token Metrics API.
    
    Args:
        symbols: Comma-separated list of token symbols
        
    Returns:
        Detailed information about the specified tokens
    """
    service = get_token_metrics_service()
    return service.get_tokens(symbols=symbols)

@router.get(
    "/trader-grades/{symbols}",
    response_model=TraderGradesResponse,
    status_code=status.HTTP_200_OK,
    summary="Get trader grades",
    description="Dashmetrics Token Metrics: Get short-term trading grades for specified tokens"
)
async def get_trader_grades(
    symbols: str = Path(
        ..., 
        description="Comma-separated list of symbols (e.g., BTC,ETH)"
    ),
    start_date: str = Query(
        None, 
        description="Start date in YYYY-MM-DD format (defaults to 30 days ago)"
    ),
    end_date: str = Query(
        None, 
        description="End date in YYYY-MM-DD format (defaults to today)"
    )
):
    """
    Get short-term trading grades for specified tokens using Token Metrics AI.
    
    Args:
        symbols: Comma-separated list of token symbols
        start_date: Start date in YYYY-MM-DD format (defaults to 30 days ago)
        end_date: End date in YYYY-MM-DD format (defaults to today)
        
    Returns:
        Short-term trading grades for the specified tokens and date range
    """
    service = get_token_metrics_service()
    
    # Set default dates if not provided
    if not start_date:
        start_date = (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d")
    if not end_date:
        end_date = datetime.now().strftime("%Y-%m-%d")
    
    return service.get_trader_grades(symbols=symbols, start_date=start_date, end_date=end_date)

@router.get(
    "/investor-grades/{symbols}",
    response_model=InvestorGradesResponse,
    status_code=status.HTTP_200_OK,
    summary="Get investor grades",
    description="Dashmetrics Token Metrics: Get long-term investment grades for specified tokens"
)
async def get_investor_grades(
    symbols: str = Path(
        ..., 
        description="Comma-separated list of symbols (e.g., BTC,ETH)"
    ),
    start_date: str = Query(
        None, 
        description="Start date in YYYY-MM-DD format (defaults to 30 days ago)"
    ),
    end_date: str = Query(
        None, 
        description="End date in YYYY-MM-DD format (defaults to today)"
    )
):
    """
    Get long-term investment grades for specified tokens using Token Metrics AI.
    
    Args:
        symbols: Comma-separated list of token symbols
        start_date: Start date in YYYY-MM-DD format (defaults to 30 days ago)
        end_date: End date in YYYY-MM-DD format (defaults to today)
        
    Returns:
        Long-term investment grades for the specified tokens and date range
    """
    service = get_token_metrics_service()
    
    # Set default dates if not provided
    if not start_date:
        start_date = (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d")
    if not end_date:
        end_date = datetime.now().strftime("%Y-%m-%d")
    
    return service.get_investor_grades(symbols=symbols, start_date=start_date, end_date=end_date)

@router.get(
    "/daily-ohlcv/{symbols}",
    response_model=OHLCVResponse,
    status_code=status.HTTP_200_OK,
    summary="Get daily OHLCV data",
    description="Dashmetrics Token Metrics: Get daily price and volume data for specified tokens"
)
async def get_daily_ohlcv(
    symbols: str = Path(
        ..., 
        description="Comma-separated list of symbols (e.g., BTC,ETH)"
    ),
    start_date: str = Query(
        None, 
        description="Start date in YYYY-MM-DD format (defaults to 30 days ago)"
    ),
    end_date: str = Query(
        None, 
        description="End date in YYYY-MM-DD format (defaults to today)"
    )
):
    """
    Get daily price and volume data for specified tokens using Token Metrics.
    
    Args:
        symbols: Comma-separated list of token symbols
        start_date: Start date in YYYY-MM-DD format (defaults to 30 days ago)
        end_date: End date in YYYY-MM-DD format (defaults to today)
        
    Returns:
        Daily OHLCV data for the specified tokens and date range
    """
    service = get_token_metrics_service()
    
    # Set default dates if not provided
    if not start_date:
        start_date = (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d")
    if not end_date:
        end_date = datetime.now().strftime("%Y-%m-%d")
    
    return service.get_daily_ohlcv(symbols=symbols, start_date=start_date, end_date=end_date)

@router.get(
    "/hourly-ohlcv/{symbols}",
    response_model=OHLCVResponse,
    status_code=status.HTTP_200_OK,
    summary="Get hourly OHLCV data",
    description="Dashmetrics Token Metrics: Get hourly price and volume data for specified tokens"
)
async def get_hourly_ohlcv(
    symbols: str = Path(
        ..., 
        description="Comma-separated list of symbols (e.g., BTC,ETH)"
    ),
    start_date: str = Query(
        None, 
        description="Start date in YYYY-MM-DD format (defaults to 7 days ago)"
    ),
    end_date: str = Query(
        None, 
        description="End date in YYYY-MM-DD format (defaults to today)"
    )
):
    """
    Get hourly price and volume data for specified tokens using Token Metrics.
    
    Args:
        symbols: Comma-separated list of token symbols
        start_date: Start date in YYYY-MM-DD format (defaults to 7 days ago)
        end_date: End date in YYYY-MM-DD format (defaults to today)
        
    Returns:
        Hourly OHLCV data for the specified tokens and date range
    """
    service = get_token_metrics_service()
    
    # Set default dates if not provided
    if not start_date:
        start_date = (datetime.now() - timedelta(days=7)).strftime("%Y-%m-%d")
    if not end_date:
        end_date = datetime.now().strftime("%Y-%m-%d")
    
    return service.get_hourly_ohlcv(symbols=symbols, start_date=start_date, end_date=end_date)

@router.get(
    "/market-metrics",
    response_model=MarketMetricsResponse,
    status_code=status.HTTP_200_OK,
    summary="Get market metrics",
    description="Dashmetrics Token Metrics: Get overall market metrics and sentiment data"
)
async def get_market_metrics(
    start_date: str = Query(
        None, 
        description="Start date in YYYY-MM-DD format (defaults to 30 days ago)"
    ),
    end_date: str = Query(
        None, 
        description="End date in YYYY-MM-DD format (defaults to today)"
    )
):
    """
    Get overall market metrics and sentiment data using Token Metrics.
    
    Args:
        start_date: Start date in YYYY-MM-DD format (defaults to 30 days ago)
        end_date: End date in YYYY-MM-DD format (defaults to today)
        
    Returns:
        Market metrics data for the specified date range
    """
    service = get_token_metrics_service()
    
    # Set default dates if not provided
    if not start_date:
        start_date = (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d")
    if not end_date:
        end_date = datetime.now().strftime("%Y-%m-%d")
    
    return service.get_market_metrics(start_date=start_date, end_date=end_date)

@router.get(
    "/ai-reports/{symbols}",
    response_model=AIReportResponse,
    status_code=status.HTTP_200_OK,
    summary="Get AI reports",
    description="Dashmetrics Token Metrics: Get AI-generated analysis reports for specified tokens"
)
async def get_ai_reports(
    symbols: str = Path(
        ..., 
        description="Comma-separated list of symbols (e.g., BTC,ETH)"
    )
):
    """
    Get AI-generated analysis reports for specified tokens using Token Metrics.
    
    Args:
        symbols: Comma-separated list of token symbols
        
    Returns:
        AI-generated reports for the specified tokens
    """
    service = get_token_metrics_service()
    return service.get_ai_report(symbols=symbols)

@router.get(
    "/trading-signals/{symbols}",
    response_model=TradingSignalsResponse,
    status_code=status.HTTP_200_OK,
    summary="Get trading signals",
    description="Dashmetrics Token Metrics: Get AI-generated trading signals for specified tokens"
)
async def get_trading_signals(
    symbols: str = Path(
        ..., 
        description="Comma-separated list of symbols (e.g., BTC,ETH)"
    ),
    start_date: str = Query(
        None, 
        description="Start date in YYYY-MM-DD format (defaults to 30 days ago)"
    ),
    end_date: str = Query(
        None, 
        description="End date in YYYY-MM-DD format (defaults to today)"
    ),
    signal: Optional[str] = Query(
        None, 
        description="Signal type (1 for bullish, -1 for bearish, None for all)"
    )
):
    """
    Get AI-generated trading signals for specified tokens using Token Metrics.
    
    Args:
        symbols: Comma-separated list of token symbols
        start_date: Start date in YYYY-MM-DD format (defaults to 30 days ago)
        end_date: End date in YYYY-MM-DD format (defaults to today)
        signal: Signal type (1 for bullish, -1 for bearish, None for all)
        
    Returns:
        Trading signals for the specified tokens and date range
    """
    service = get_token_metrics_service()
    
    # Set default dates if not provided
    if not start_date:
        start_date = (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d")
    if not end_date:
        end_date = datetime.now().strftime("%Y-%m-%d")
    
    return service.get_trading_signals(
        symbols=symbols, 
        start_date=start_date, 
        end_date=end_date, 
        signal=signal
    )

@router.post(
    "/ai-agent/ask",
    response_model=AIAgentResponse,
    status_code=status.HTTP_200_OK,
    summary="Ask AI agent",
    description="Dashmetrics Token Metrics: Ask the AI agent a question about cryptocurrencies"
)
async def ask_ai_agent(
    question: str = Query(
        ..., 
        description="The question to ask the AI agent"
    )
):
    """
    Ask the Token Metrics AI agent a question about cryptocurrencies.
    
    Args:
        question: The question to ask the AI agent
        
    Returns:
        The AI agent's answer
    """
    service = get_token_metrics_service()
    answer = service.ask_ai_agent(question=question)
    return {"question": question, "answer": answer}

@router.get(
    "/trader-indices",
    response_model=TraderIndicesResponse,
    status_code=status.HTTP_200_OK,
    summary="Get trader indices",
    description="Dashmetrics Token Metrics: Get AI-generated trading portfolios and indices"
)
async def get_trader_indices(
    start_date: str = Query(
        None, 
        description="Start date in YYYY-MM-DD format (defaults to 30 days ago)"
    ),
    end_date: str = Query(
        None, 
        description="End date in YYYY-MM-DD format (defaults to today)"
    )
):
    """
    Get AI-generated trading portfolios and indices using Token Metrics.
    
    Args:
        start_date: Start date in YYYY-MM-DD format (defaults to 30 days ago)
        end_date: End date in YYYY-MM-DD format (defaults to today)
        
    Returns:
        Trader indices data for the specified date range
    """
    service = get_token_metrics_service()
    
    # Set default dates if not provided
    if not start_date:
        start_date = (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d")
    if not end_date:
        end_date = datetime.now().strftime("%Y-%m-%d")
    
    return service.get_trader_indices(start_date=start_date, end_date=end_date)

@router.get(
    "/sentiment",
    response_model=SentimentResponse,
    status_code=status.HTTP_200_OK,
    summary="Get sentiment data for all tokens",
    description="Dashmetrics Token Metrics: Get sentiment data for all tokens"
)
async def get_all_sentiment(
    limit: int = Query(
        1000,
        description="Maximum number of results to return"
    ),
    page: int = Query(
        0,
        description="Page number for pagination"
    )
):
    """
    Get sentiment data for all tokens using Token Metrics API.
    
    Args:
        limit: Maximum number of results to return
        page: Page number for pagination
        
    Returns:
        Sentiment data for all tokens
    """
    service = get_token_metrics_service()
    return service.get_sentiment(symbols=None, limit=limit, page=page)

@router.get(
    "/sentiment/{symbols}",
    response_model=SentimentResponse,
    status_code=status.HTTP_200_OK,
    summary="Get sentiment data for specific tokens",
    description="Dashmetrics Token Metrics: Get sentiment data for specified tokens"
)
async def get_token_sentiment(
    symbols: str = Path(
        ..., 
        description="Comma-separated list of symbols (e.g., BTC,ETH)"
    ),
    limit: int = Query(
        1000,
        description="Maximum number of results to return"
    ),
    page: int = Query(
        0,
        description="Page number for pagination"
    )
):
    """
    Get sentiment data for specified tokens using Token Metrics API.
    
    Args:
        symbols: Comma-separated list of token symbols
        limit: Maximum number of results to return
        page: Page number for pagination
        
    Returns:
        Sentiment data for the specified tokens
    """
    service = get_token_metrics_service()
    return service.get_sentiment(symbols=symbols, limit=limit, page=page) 