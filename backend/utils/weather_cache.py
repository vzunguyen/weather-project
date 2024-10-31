import asyncio
from datetime import datetime
from backend.external_services.weather_api import get_weather_data
from backend.utils.file_operations import load_last_location

# Cache to store the latest weather data
weather_data_cache = {}

async def update_weather_data_periodically():
    """Fetch and update weather data every hour for the last requested location."""
    while True:
        await fetch_and_cache_weather_data(load_last_location())
        await asyncio.sleep(3600)  # 1-hour interval

async def fetch_and_cache_weather_data(location):
    """Fetch and cache weather data for a location if not in cache or outdated."""
    if location not in weather_data_cache or cache_is_outdated(location):
        weather_data = get_weather_data(location)
        
        if weather_data:
            weather_data_cache[location] = {
                "data": weather_data,
                "last_updated": datetime.now()
            }
        return weather_data_cache[location]
    return weather_data_cache[location]

def cache_is_outdated(location):
    """Check if cached data for a location is outdated (older than 1 hour)."""
    last_updated = weather_data_cache[location].get("last_updated")
    return not last_updated or (datetime.now() - last_updated).total_seconds() > 3600
