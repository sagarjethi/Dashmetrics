#!/usr/bin/env python
import uvicorn
import argparse

def parse_args():
    parser = argparse.ArgumentParser(description="Run the Dashmetrics FastAPI backend server")
    parser.add_argument('--host', type=str, default="0.0.0.0", help="Host to run the server on")
    parser.add_argument('--port', type=int, default=8000, help="Port to run the server on")
    parser.add_argument('--reload', action='store_true', help="Enable auto-reload for development")
    return parser.parse_args()

if __name__ == "__main__":
    args = parse_args()
    
    print(f"Starting Dashmetrics backend server on {args.host}:{args.port}")
    print("API documentation will be available at http://localhost:8000/docs")
    
    uvicorn.run(
        "main:app", 
        host=args.host, 
        port=args.port, 
        reload=args.reload
    ) 