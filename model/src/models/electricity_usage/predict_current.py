import pandas as pd
import joblib
from sklearn.preprocessing import PolynomialFeatures
import os

# Change directory to the location of the processed dataset
os.chdir('/Users/vzu/Projects/weather-project/model/data/predicted')

# Load the saved model
model = joblib.load('../../models/electricity_trained_model.pkl')
print("Model loaded successfully.")

# Example new data for prediction
new_data = pd.DataFrame({
    'temp': [18, 22, 28, 35]  # Replace with actual temperatures
})

# Transform the new data to match the polynomial features used in training
poly = PolynomialFeatures(degree=3)
new_data_poly = poly.fit_transform(new_data)

# Predict electricity usage for the new data
predicted_electricity_usage = model.predict(new_data_poly)

# Create a DataFrame with the predictions
prediction_df = pd.DataFrame({
    'Temperature (°C)': new_data['temp'],
    'Predicted Electricity Usage (kWh)': predicted_electricity_usage
})

# Display the predictions
print(prediction_df)

# Optional: Save predictions to a CSV file
prediction_df.to_csv('current_usage_predictions.csv', index=False)
print("Predictions saved to 'current_usage_predictions.csv'")