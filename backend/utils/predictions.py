# backend/utils/prediction.py

import pandas as pd
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
import joblib
import numpy as np

# Load models and scaler (done once at the beginning for efficiency)
reg_model = joblib.load('/Users/vzu/Projects/weather-project/model/models/reg_trained_model.pkl')
knn_model = joblib.load('/Users/vzu/Projects/weather-project/model/models/knn_trained_model.pkl')
scaler = StandardScaler()  # Assuming the model used this scaler
poly_model = joblib.load('/Users/vzu/Projects/weather-project/model/models/electricity_trained_model.pkl')
poly_transformer = PolynomialFeatures(degree=3)  # Same degree used in training

def predict_weather_type(data):
    """
    Predicts weather type using both logistic regression and KNN models.
    
    Args:
        scaled_data (numpy array): Scaled feature data.
        
    Returns:
        dict: A dictionary with predictions from both models.
    """
    features = {
        'temp_c': data['current']['temp_c'],
        'wind_kph': data['current']['wind_kph'],
        'humidity': data['current']['humidity'],
        'pressure_mb': data['current']['pressure_mb'],
    }
    df = pd.DataFrame([features])
    scaled_data = scaler.fit_transform(df)
    # Make predictions using both models
    reg_prediction = reg_model.predict(scaled_data)[0]
    knn_prediction = knn_model.predict(scaled_data)[0]
    
    return {
        "logistic_regression": reg_prediction,
        "knn": knn_prediction
    }

def predict_elec_usage(data):
    """
    Predicts electricity usage based on the temperature using the polynomial regression model.
    
    Args:
        temperature (float): Current temperature value.
        
    Returns:
        float: Predicted electricity usage (kWh).
    """
    scaled_data = pd.DataFrame({
    'temp_c': [data['current']['temp_c']]  # Wrap in a list to avoid scalar value error
    })
    # Transform the temperature input into polynomial features
    temperature_poly = poly_transformer.fit_transform(scaled_data)
    
    # Predict electricity usage with the polynomial model
    energy_usage_prediction = poly_model.predict(temperature_poly)[0]
    return energy_usage_prediction
