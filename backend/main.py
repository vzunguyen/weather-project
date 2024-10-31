# backend/main.py

from fastapi import FastAPI
from backend.routers import router  # Import the prediction router
from backend.utils.weather_cache import update_weather_data_periodically
from contextlib import asynccontextmanager
import asyncio


app = FastAPI()

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
