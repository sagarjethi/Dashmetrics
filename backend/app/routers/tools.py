from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional
from fastapi import APIRouter, Query, status, HTTPException, Path

from app.service.search.pumpfun import (
    fetch_top_token_creators, get_dev_holdings, get_first_buyers, 
    get_historical_price_and_volume, get_last_n_transactions, get_latest_trades, 
    get_token_creation_info, get_token_information, get_top_market_cap_pumpfun_coin, 
    get_top_token_holders, get_top_traders, get_trading_volume_on_dexs, 
    get_volume_and_marketcap
)

router = APIRouter(
    prefix="/tools",
    tags=["Dashmetrics - Tools"],
    responses={
        404: {"description": "Not found"},
        500: {"description": "Internal server error"}
    }
)

@router.get(
    "/pumpfun-top-holders/{token_mint_address}",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Get top token holders",
    description="Dashmetrics analytics: Retrieves a list of top token holders for a specific token"
)
async def top_token_holders(
    token_mint_address: str = Path(
        ..., 
        description="Token mint address to query"
    )
):
    """
    Get the top token holders for a specific token using Dashmetrics analytics.
    
    Args:
        token_mint_address: The token mint address
        
    Returns:
        List of top token holders with their holdings
    """
    return await get_top_token_holders(token_mint_address)

@router.get(
    "/pumpfun-dev-holdings/{dev_address}/{token_mint_address}",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Get developer holdings",
    description="Dashmetrics analytics: Retrieves the token holdings of a specific developer address"
)
async def dev_holdings(
    dev_address: str = Path(
        ..., 
        description="Developer wallet address"
    ),
    token_mint_address: str = Path(
        ..., 
        description="Token mint address"
    )
):
    """
    Get the token holdings of a specific developer address via Dashmetrics.
    
    Args:
        dev_address: Developer wallet address
        token_mint_address: Token mint address
        
    Returns:
        Developer's holdings for the specified token
    """
    return await get_dev_holdings(dev_address, token_mint_address)

@router.get(
    "/pump-volume-marketcap/{token_mint_address}",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Get volume and market cap",
    description="Dashmetrics analytics: Retrieves trading volume and market cap data for a specific token"
)
async def volume_and_marketcap(
    token_mint_address: str = Path(
        ..., 
        description="Token mint address"
    ),
    side: str = Query(
        "buy", 
        description="Trading side to analyze",
        enum=["buy", "sell"]
    ),
):
    """
    Get trading volume and market cap data for a specific token using Dashmetrics analytics.
    
    Args:
        token_mint_address: Token mint address
        side: Trading side to analyze (buy or sell)
        
    Returns:
        Volume and market cap data for the specified token
    """
    return await get_volume_and_marketcap(token_mint_address, side)

@router.get(
    "/pump-top-market-cap",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Get top market cap tokens",
    description="Dashmetrics analytics: Retrieves a list of tokens with the highest market capitalization"
)
async def top_market_cap_pumpfun_coin():
    """
    Get a list of tokens with the highest market capitalization using Dashmetrics analytics.
    
    Returns:
        List of tokens sorted by market capitalization
    """
    return await get_top_market_cap_pumpfun_coin()
    
@router.get(
    "/pump-info/{token}",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Get token information",
    description="Dashmetrics analytics: Retrieves detailed information about a specific token"
)
async def token_information(
    token: str = Path(
        ..., 
        description="Token identifier or address"
    ),
    before_timestamp: Optional[datetime] = Query(
        None, 
        description="Get token information since this timestamp"
    ),
):
    """
    Get detailed information about a specific token using Dashmetrics.
    
    Args:
        token: Token identifier or address
        before_timestamp: Optional timestamp to filter data
        
    Returns:
        Detailed information about the specified token
    """
    return await get_token_information(token, before_timestamp)

@router.get(
    "/pump-top-token-creators",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Get top token creators",
    description="Dashmetrics analytics: Retrieves a list of the most prolific token creators"
)
async def top_token_creators():
    """
    Get a list of the most prolific token creators via Dashmetrics.
    
    Returns:
        List of top token creators with their statistics
    """
    return await fetch_top_token_creators()

@router.get(
    "/pump-top-traders-token/{token_mint_address}",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Get top traders for token",
    description="Dashmetrics analytics: Retrieves a list of top traders for a specific token"
)
async def get_pumpfun_top_traders(
    token_mint_address: str = Path(
        ..., 
        description="Token mint address"
    ), 
    limit: int = Query(
        10, 
        ge=1,
        description="Number of top traders to return"
    )
):
    """
    Get a list of top traders for a specific token using Dashmetrics analytics.
    
    Args:
        token_mint_address: Token mint address
        limit: Number of top traders to return
        
    Returns:
        List of top traders for the specified token
    """
    return await get_top_traders(token_address=token_mint_address, limit=limit)

@router.get(
    "/pump-trading-volumes/dexes/{token_mint_address}",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Get trading volumes on DEXes",
    description="Dashmetrics analytics: Retrieves trading volume data from different decentralized exchanges for a specific token"
)
async def get_trading_volume(
    token_mint_address: str = Path(
        ..., 
        description="Token mint address"
    ),
    before_timestamp: datetime = Query(
        ..., 
        description="Get trading volumes since this timestamp"
    ),
):
    """
    Get trading volume data from different decentralized exchanges for a specific token using Dashmetrics.
    
    Args:
        token_mint_address: Token mint address
        before_timestamp: Timestamp to filter data
        
    Returns:
        Trading volume data from different DEXes for the specified token
    """
    return await get_trading_volume_on_dexs(
        token_mint_address=token_mint_address, 
        before_timestamp=before_timestamp
    )

@router.get(
    "/pump-first-token-buyers/{token_mint_address}",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Get first token buyers",
    description="Dashmetrics analytics: Retrieves a list of the first buyers of a specific token"
)
async def get_first_buyer_token(
    token_mint_address: str = Path(
        ..., 
        description="Token mint address"
    ),
    limit: int = Query(
        10, 
        ge=1,
        description="Number of first buyers to return"
    ),
):
    """
    Get a list of the first buyers of a specific token using Dashmetrics.
    
    Args:
        token_mint_address: Token mint address
        limit: Number of first buyers to return
        
    Returns:
        List of the first buyers of the specified token
    """
    return await get_first_buyers(token_address=token_mint_address, limit=limit)

@router.get(
    "/pump-first-latest-trades/{token_mint_address}",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Get latest trades",
    description="Dashmetrics analytics: Retrieves a list of the most recent trades for a specific token"
)
async def get_latest_trades_(
    token_mint_address: str = Path(
        ..., 
        description="Token mint address"
    ),
    limit: int = Query(
        10, 
        ge=1,
        description="Number of latest trades to return"
    ),
):
    """
    Get a list of the most recent trades for a specific token using Dashmetrics.
    
    Args:
        token_mint_address: Token mint address
        limit: Number of latest trades to return
        
    Returns:
        List of the most recent trades for the specified token
    """
    return await get_latest_trades(token_address=token_mint_address, limit=limit)

################################ NOT USED ################################
    
@router.get(
    "/pumpfun-historical-price-volume/{token_mint_address}",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Get historical price and volume",
    description="Dashmetrics analytics (deprecated): Retrieves historical price and volume data for a specific token",
    deprecated=True
)
async def historical_price_and_volume(
    token_mint_address: str = Path(
        ..., 
        description="Token mint address"
    ),
    since: datetime = Query(
        ..., 
        description="Start timestamp for historical data"
    ),
    interval_in: str = Query(
        "hour", 
        description="Interval unit for data aggregation",
        enum=["minute", "hour", "day", "week"]
    ),
    interval_count: int = Query(
        1, 
        ge=1,
        description="Number of interval units to aggregate"
    ),
):
    """
    Get historical price and volume data for a specific token using Dashmetrics.
    
    Args:
        token_mint_address: Token mint address
        since: Start timestamp for historical data
        interval_in: Interval unit for data aggregation
        interval_count: Number of interval units to aggregate
        
    Returns:
        Historical price and volume data for the specified token
        
    Raises:
        HTTPException: If there's an error retrieving the data
    """
    try:
        return await get_historical_price_and_volume(token_mint_address, since, interval_in, interval_count)
    except Exception as e:
        return {"error": str(e)}

@router.get(
    "/pump-last-transactions/{token_mint_address}",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Get last transactions",
    description="Dashmetrics analytics (deprecated): Retrieves the last N transactions for a specific token",
    deprecated=True
)
async def last_n_transactions(
    token_mint_address: str = Path(
        ..., 
        description="Token mint address"
    ), 
    n: int = Query(
        10, 
        ge=1,
        description="Number of transactions to return"
    )
):
    """
    Get the last N transactions for a specific token using Dashmetrics.
    
    Args:
        token_mint_address: Token mint address
        n: Number of transactions to return
        
    Returns:
        Last N transactions for the specified token
        
    Raises:
        HTTPException: If there's an error retrieving the data
    """
    try:
        return await get_last_n_transactions(token_mint_address, n)
    except Exception as e:
        return {"error": str(e)}
    
@router.get(
    "/pumpfun-creation-info/{token_mint_address}",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Get token creation info",
    description="Dashmetrics analytics (deprecated): Retrieves information about the creation of a specific token",
    deprecated=True
)
async def token_creation_info(
    token_mint_address: str = Path(
        ..., 
        description="Token mint address"
    )
):
    """
    Get information about the creation of a specific token using Dashmetrics.
    
    Args:
        token_mint_address: Token mint address
        
    Returns:
        Information about the creation of the specified token
        
    Raises:
        HTTPException: If there's an error retrieving the data
    """
    try:
        return await get_token_creation_info(token_mint_address)
    except Exception as e:
        return {"error": str(e)}