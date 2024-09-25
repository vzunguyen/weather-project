import requests
import json

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
    
def main():
    LOCATION = input('Enter the location (e.g., London, Paris): ')
    data = get_data(f"http://api.weatherapi.com/v1/current.json?key=e17fd8ecf740460b95602417241609&q={LOCATION}")

    if data:
        # Write the weather data into a file in data/raw directory
        with open('./data/raw/current_weather_data.json', 'w', encoding='utf-8') as f:
            f.write(json.dumps(data, indent=4))
            print('Weather data saved to data/raw/current_weather_data.json')
    else:
        print('Failed to fetch data from API.')

if __name__ == '__main__':
    main()