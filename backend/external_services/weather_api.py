# backend/external_services/weather_api.py

import requests
import json
import os

def get_data(url):
    try:
        response = requests.get(url)

        # Check if the request was successful (status code 200
        if response.status_code == 200:
            data = response.json()
            return data
        else:
            print('Error:', response.status_code)
            return None
    except requests.exceptions.RequestException as e:
        print('Error:', e)
        return None
    except requests.exceptions.RequestException as e:
        # Handle any network-related errors or exceptions
        print('Error:', e)
        return None

def get_weather_data(location: str):
    """Fetches current weather data for a given location from the weather API."""
    data = get_data(f"http://api.weatherapi.com/v1/current.json?key=e17fd8ecf740460b95602417241609&q={location}")

    if data:
        # Write the weather data into a file in data/raw directory
        with open('../data/current_weather_data.json', 'w', encoding='utf-8') as f:
            f.write(json.dumps(data, indent=4))
            print('Weather data saved to data/raw/current_weather_data.json')
            return data # Return the JSON data for further processing
    else:
        print('Failed to fetch data from API.')
        return None
