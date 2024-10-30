# backend/main.py

from fastapi import FastAPI
from backend.routers import predictions  # Import the prediction router

app = FastAPI()

# Include the predictions router
app.include_router(predictions.router)
