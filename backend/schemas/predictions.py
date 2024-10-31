# backend/schemas/prediction.py
from pydantic import BaseModel

class LocationInput(BaseModel):
    location: str
