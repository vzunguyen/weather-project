# backend/main.py

from fastapi import FastAPI
from backend.routers import router  # Import the prediction router
from backend.utils.weather_cache import update_weather_data_periodically
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
import asyncio


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from your frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include the predictions router
app.include_router(router.router)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup event: Launch the periodic weather data update task
    task = asyncio.create_task(update_weather_data_periodically())
    yield  # Run the application
    # Shutdown event: Cancel the weather update task and wait briefly for cleanup
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        pass

app.router.lifespan_context = lifespan
