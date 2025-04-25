from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.constant.config import SECRET_KEY
from app.middleware.log import APIGatewayMiddleware
from starlette.middleware.sessions import SessionMiddleware
#from app.database.database import session_manager
from contextlib import asynccontextmanager

from app.routers import memecoin, tools, coingecko, token_metrics

# @asynccontextmanager
# async def lifespan(app: FastAPI):  
#     await session_manager.create_tables()
#     yield
#     if session_manager._engine is not None:
#         await session_manager.close()
        
# app = FastAPI(lifespan=lifespan)
app = FastAPI(
    title="Dashmetrics API",
    description="""
    Dashmetrics Backend API provides cryptocurrency market data, meme coin tracking, and trading tools.
    
    ## Features
    
    * **Memecoin**: Endpoints for tracking and analyzing meme coins
    * **Coingecko**: Access to market data, price information, and liquidity pools
    * **Tools**: Advanced analysis tools for cryptocurrency traders and researchers
    * **Token Metrics**: Professional-grade crypto analytics and AI-powered insights
    
    ## Authentication
    
    Most endpoints do not require authentication. Authorized endpoints will use bearer token authentication.
    """,
    version="1.0.0",
    contact={
        "name": "Dashmetrics Support",
        "email": "support@dashmetrics.example.com",
    },
    license_info={
        "name": "MIT",
    },
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'], #  allows requests from any origin 
    allow_credentials=True,
    allow_methods=['*'], # allows all HTTP methods
    allow_headers=['*'], # allows all headers
)
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)
app.add_middleware(APIGatewayMiddleware)

router_list = [
    memecoin.router,
    tools.router,
    coingecko.router,
    token_metrics.router
]

for router in router_list:
    app.include_router(router=router)
    

#redis_client = Redis.from_url(REDIS_URL, decode_responses=True)
