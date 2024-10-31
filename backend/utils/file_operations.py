import json
import os

LAST_LOCATION_FILE = '/Users/vzu/Projects/weather-project/backend/data/last_location.json'

def load_last_location():
    if os.path.exists(LAST_LOCATION_FILE):
        with open(LAST_LOCATION_FILE, 'r') as f:
            # Load the last location from the file
            last_location = json.load(f)
            return last_location["location"]
    else:
        # Write the last location to the file if it doesn't exist
        reset_last_location()
        return last_location["location"]
def reset_last_location():
    with open(LAST_LOCATION_FILE, 'w') as f:
        json.dump({"location": "Melbourne"}, f)

def save_last_location(location):
    with open(LAST_LOCATION_FILE, 'w') as f:
        json.dump({"location": location}, f)