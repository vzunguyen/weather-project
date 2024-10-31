from fastapi import APIRouter, HTTPException
from backend.external_services.weather_api import get_weather_data
from backend.utils.predictions import predict_weather_type, predict_elec_usage
from backend.schemas.predictions import LocationInput
from backend.utils.file_operations import save_last_location, load_last_location
from backend.utils.weather_cache import fetch_and_cache_weather_data, cache_is_outdated
import pandas as pd

router = APIRouter()

json_file_path = '/Users/vzu/Projects/weather-project/backend/data/current_weather_data.json'
data = pd.read_json(json_file_path)

@router.get('/get_location')
async def get_location(location):
    if not location:
        raise HTTPException(status_code=400, detail="Location must be provided.")

    # Save the last requested location
    save_last_location(location)
    return {"message": f"Location updated to {location}."}

# Get weather data method
@router.post('/weather_data')
async def get_current_data():
    location = load_last_location()
    weather_data = get_weather_data(location)
    if not weather_data:
        raise HTTPException(status_code=500, detail="Failed to fetch weather data.")
    return weather_data

@router.post("/predict_weather")
async def predict_weather():
    location = load_last_location()
    cache_entry = await fetch_and_cache_weather_data(location)  # Await here

    if not cache_entry:
        raise HTTPException(status_code=500, detail="Failed to fetch weather data.")

    weather_prediction = predict_weather_type(cache_entry["data"])

    return {
        "location": location,
        "predicted_weather_type": weather_prediction,
        "last_updated": cache_entry["last_updated"]
    }

@router.post("/predict_electricity")
async def predict_electricity():
    location = load_last_location()
    cache_entry = await fetch_and_cache_weather_data(location)  # Await here

    if not cache_entry:
        raise HTTPException(status_code=500, detail="Failed to fetch weather data.")

    electricity_usage = predict_elec_usage(cache_entry["data"])

    return {
        "location": location,
        "predicted_electricity_usage": electricity_usage,
        "last_updated": cache_entry["last_updated"]
    }
