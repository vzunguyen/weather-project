import pandas as pd
import joblib
from sklearn.preprocessing import StandardScaler
import os

# Change directory to the location of the processed dataset
os.chdir('/Users/vzu/Projects/weather-project/model/data/processed')

# Step 1. Load the JSON file and convert it to DataFrame
json_file_path = 'current_weather_data.json'
data = pd.read_json(json_file_path)

# Step 2. Extract only the relevant columns that were used during model training
# Adjust these feature names according to your training set
features = {
    'temp_c': data['current']['temp_c'],
    'wind_kph': data['current']['wind_kph'],
    'humidity': data['current']['humidity'],
    'pressure_mb': data['current']['pressure_mb'],  # Example of an additional feature, adjust as necessary
    # Include only the features that were used to train your model
}
df = pd.DataFrame([features])  # Convert extracted data to a DataFrame

# Step 3. Fit a new scaler on the current weather data
scaler = StandardScaler()
scaler.fit(df)  # Fit the scaler to the current weather data

# Transform the current weather data using the new scaler
scaled_data = scaler.transform(df)

# Step 4. Load pre-trained model(s)
log_reg = joblib.load('../../models/reg_trained_model.pkl')  # Adjust path if necessary

# Step 5. Make predictions
y_pred_log = log_reg.predict(scaled_data)
print("Logistic Regression Prediction:", y_pred_log)

# Step 6. Create a DataFrame to include all the data and the prediction
output_df = df.copy()  # Copy original features DataFrame
output_df['Predicted Weather Type'] = y_pred_log  # Add predictions

# Print to CSV file
output_file_path = '/Users/vzu/Projects/weather-project/model/data/predicted/current_weather_predictions.csv'
output_df.to_csv(output_file_path, index=False)

# Print to console for verification
print(output_df)

# KNN predictions
knn = joblib.load('../../models/knn_trained_model.pkl')
y_pred_knn = knn.predict(scaled_data)
print("KNN Prediction:", y_pred_knn)

# Save KNN predictions in a similar manner
output_df['Predicted Weather Type (KNN)'] = y_pred_knn  # Add KNN predictions

# Save updated predictions to CSV file
output_df.to_csv(output_file_path, index=False)

print(f"Predictions saved to '{output_file_path}'")
