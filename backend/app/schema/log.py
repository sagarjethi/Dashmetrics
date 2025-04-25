# Created by: thongnt
from datetime import datetime
from typing import Optional, Union
from pydantic import BaseModel


class LogModel(BaseModel):
    action_date: datetime = datetime.now()
    path_name: str
    method: str
    ip: str
    status_response: int
    response: str
    request_query: Optional[str] = None
    request_body: Optional[Union[str, bytes]] = None
    description: Optional[str] = None
    duration: Optional[float] = None