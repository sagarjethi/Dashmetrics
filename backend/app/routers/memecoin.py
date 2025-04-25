from fastapi import APIRouter, status
from typing import Dict, Any

router = APIRouter(
    prefix="/memecoin",
    tags=["Dashmetrics - Memecoin"],
    responses={404: {"description": "Not found"}},
)
        
@router.get(
    "/test", 
    response_model=Dict[str, str],
    status_code=status.HTTP_200_OK,
    summary="Test endpoint",
    description="Simple test endpoint to verify the Dashmetrics memecoin API is working"
)
async def test() -> Dict[str, str]:
    """
    Test endpoint for the Dashmetrics memecoin API.
    
    Returns:
        A simple JSON response with a hello message.
    """
    print("Hello meow")
    return {"message": "Hello meow"}