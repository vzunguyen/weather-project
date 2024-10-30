from fastapi import APIRouter, HTTPException
from backend.external_services.weather_api import get_weather_data
from backend.utils.predictions import predict_weather_type, predict_elec_usage
from backend.schemas.predictions import LocationInput
import pandas as pd

router = APIRouter()

json_file_path = '/Users/vzu/Projects/weather-project/backend/data/current_weather_data.json'
data = pd.read_json(json_file_path)

# Get weather data method
@router.post('/weather_data')
async def get_current_data(location: str):
    weather_data = get_weather_data(location)
    if not weather_data:
        raise HTTPException(status_code=500, detail="Failed to fetch weather data.")
    return weather_data

@router.post("/predict_weather")
async def predict_weather(location_input: LocationInput):
    location = location_input.location
    weather_data = get_weather_data(location)

    if not weather_data:
        raise HTTPException(status_code=500, detail="Failed to fetch weather data.")
    weather_prediction = predict_weather_type(weather_data)

    return {
        "location": location,
        "predicted_weather_type": weather_prediction
    }

# Get electricity usage prediction method
@router.post("/predict_electricity")
async def predict_electricity(location_input: LocationInput):
    location = location_input.location
    weather_data = get_weather_data(location)
    if not weather_data:
        raise HTTPException(status_code=500, detail="Failed to fetch weather data.")
    electricity_usage = predict_elec_usage(weather_data)
    if not electricity_usage:
        raise HTTPException(status_code=500, detail="Failed to predict electricity usage.")
    return {
        "location": location,
        "predicted_electricity_usage": electricity_usage
    }