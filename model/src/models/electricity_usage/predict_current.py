import pandas as pd
import joblib
from sklearn.preprocessing import PolynomialFeatures
import os

# Change directory to the location of the processed dataset
os.chdir('/Users/vzu/Projects/weather-project/model/data/predicted')

# Step 1. Load the JSON file and convert it to DataFrame
json_file_path = '/Users/vzu/Projects/weather-project/model/data/processed/current_weather_data.json'
data = pd.read_json(json_file_path)

# Load the saved model
model = joblib.load('../../models/electricity_trained_model.pkl')
print("Model loaded successfully.")

# Step 2. Create a DataFrame for new data using an array of temperatures
new_data = pd.DataFrame({
    'temp_c': [data['current']['temp_c']]  # Wrap in a list to avoid scalar value error
})

# Optionally, if you have multiple temperature values, you can extend this like:
# new_data = pd.DataFrame({
#     'temp_c': data['current']['temp_c'].values  # Assuming you have a series or array
# })

# Step 3. Transform the new data to match the polynomial features used in training
poly = PolynomialFeatures(degree=3)
new_data_poly = poly.fit_transform(new_data)

# Step 4. Predict electricity usage for the new data
predicted_electricity_usage = model.predict(new_data_poly)

# Step 5. Create a DataFrame with the predictions
prediction_df = pd.DataFrame({
    'Temperature (°C)': new_data['temp_c'],
    'Predicted Electricity Usage (kWh)': predicted_electricity_usage
})

# Display the predictions
print(prediction_df)

# Optional: Save predictions to a CSV file
prediction_df.to_csv('current_usage_predictions.csv', index=False)
print("Predictions saved to 'current_usage_predictions.csv'")
