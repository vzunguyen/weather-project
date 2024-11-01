# API documentation
## Configurations for the application
### 1. Download Postman
[Download Postman from this page](https://www.postman.com/downloads/)

### 2. Install Fast API
[Fast API documentation](https://fastapi.tiangolo.com/#opinions)
```
conda activate sklearn-env
pip install "fastapi[standard]"
```
### 3. Run the API
```
fastapi dev backend/main.py
```
Make sure the your current directory should be: "path/to/weather_project"

## Requests
***GET /get_location***: Get user input for location, update the location file. <br/>
***POST /weather_data***: Get the current weather data. <br/>
***POST /predict_weather***: Predict the weather type. <br/>
***POST /predict_electricity***: Predict the electricity usage. <br/>
