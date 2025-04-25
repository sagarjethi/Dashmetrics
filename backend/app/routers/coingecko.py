import time
from typing import Optional, Dict, List, Any
from fastapi import APIRouter, Query, status, HTTPException

from app.service.search.coingeckco import find_liquidity_pool_by_token, get_ohlcv_data, get_sorted_trending_pools, get_specific_token

router = APIRouter(
    prefix="/coins",
    tags=["Dashmetrics - CoinGecko"],
    responses={
        404: {"description": "Not found"},
        500: {"description": "Internal server error"}
    }
)
        
@router.get(
    "/trending_pools",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Get trending liquidity pools",
    description="Fetches a list of trending liquidity pools sorted by various metrics from Dashmetrics analytics"
)
async def trending_pools(
    include: str = Query(
        "base_token,quote_token", 
        description="Comma-separated attributes to include in the response, e.g., base_token,quote_token"
    ),
    page: int = Query(
        1, 
        ge=1, 
        description="Page number for paginated results"
    ),
    duration: str = Query(
        "1h", 
        description="Duration for sorting the trending list. Options: 1h, 24h, 7d, 30d"
    )
):
    """
    Get a list of trending liquidity pools from Dashmetrics CoinGecko integration.
    
    Args:
        include: Comma-separated attributes to include in the response
        page: Page number for results pagination
        duration: Duration for sorting the trending list
        
    Returns:
        List of trending liquidity pools with the requested attributes
    """
    return await get_sorted_trending_pools(include=include, page=page, duration=duration)

@router.get(
    "/ohlcv",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Get OHLCV data",
    description="Fetches OHLCV (Open, High, Low, Close, Volume) data for a specific liquidity pool via Dashmetrics"
)
async def ohlcv_data(
    network: str = Query(
        ..., 
        description="Network identifier, e.g., ethereum, sui-network"
    ),
    pool_address: str = Query(
        ..., 
        description="Liquidity pool contract address"
    ),
    timeframe: str = Query(
        "hour", 
        description="Timeframe for OHLCV data. Options: minute, hour, day, week"
    ),
    aggregate: int = Query(
        1, 
        ge=1, 
        description="Aggregation period for the data"
    ),
    limit: int = Query(
        100, 
        ge=1, 
        le=1000, 
        description="Number of results to return (max 1000)"
    ),
    currency: str = Query(
        "usd", 
        description="Currency for price data. Options: usd, quote"
    ),
    token: str = Query(
        "base", 
        description="Token to get data for. Options: base, quote"
    )
):
    """
    Get OHLCV data for a specific liquidity pool using Dashmetrics analytics.
    
    Args:
        network: Network identifier
        pool_address: Liquidity pool contract address
        timeframe: Timeframe for OHLCV data
        aggregate: Aggregation period
        limit: Number of results to return
        currency: Currency for price data
        token: Token to get data for
        
    Returns:
        OHLCV data for the specified pool
    """
    before_timestamp = int(time.time())
    return await get_ohlcv_data(
        network=network,
        pool_address=pool_address,
        timeframe=timeframe,
        aggregate=aggregate,
        before_timestamp=before_timestamp,
        limit=limit,
        currency=currency,
        token=token,
    )

@router.get(
    "/find_pool",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Find liquidity pools by token",
    description="Find liquidity pools containing a specific token using Dashmetrics search"
)
async def find_pool(
    token_address: str = Query(
        ..., 
        description="Token contract address to search for"
    ),
    network: str = Query(
        "sui-network", 
        description="Network ID, e.g., ethereum, sui-network"
    ),
    include: str = Query(
        "base_token,quote_token,dex", 
        description="Comma-separated attributes to include in the response"
    ),
    page: int = Query(
        1, 
        ge=1, 
        description="Page number for paginated results"
    )
):
    """
    Find liquidity pools that contain a specific token using Dashmetrics analytics.
    
    Args:
        token_address: Token contract address
        network: Network identifier
        include: Attributes to include in the response
        page: Page number for results pagination
        
    Returns:
        List of liquidity pools containing the specified token
    """
    return await find_liquidity_pool_by_token(
        token_address=token_address,
        network=network,
        include=include,
        page=page,
    )

@router.get(
    "/token",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Get token details",
    description="Get detailed information about a specific token from Dashmetrics analytics"
)
async def specific_token(
    token_address: str = Query(
        ..., 
        description="Token contract address"
    ),
    network: str = Query(
        "sui-network", 
        description="Network ID, e.g., ethereum, sui-network"
    ),
    include: str = Query(
        "top_pools", 
        description="Comma-separated attributes to include, such as 'top_pools'"
    )
):
    """
    Get detailed information about a specific token using Dashmetrics analytics.
    
    Args:
        token_address: Token contract address
        network: Network identifier
        include: Attributes to include in the response
        
    Returns:
        Detailed information about the specified token
    """
    return await get_specific_token(
        token_address=token_address,
        network=network,
        include=include,
    )