import pandas as pd
from sklearn.preprocessing import PolynomialFeatures
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import matplotlib.pyplot as plt
import numpy as np
import os

# Change directory to the location of the merged dataset
os.chdir('/Users/vzu/Projects/weather-project/data/processed')

# Load the dataset
df = pd.read_csv('merged_cleaned_dataset.csv')

# Select the necessary columns
columns_needed = ['temp', 'Electricity Use - Grid Purchase and Generated from Onsite Renewable Systems (kWh)']

# Separate features (X) and target (y)
X = df[['temp']]  # Feature: Temperature
y = df['Electricity Use - Grid Purchase and Generated from Onsite Renewable Systems (kWh)']  # Target: Electricity usage

poly = PolynomialFeatures(degree=5)
X_poly = poly.fit_transform(X)  # Transform the temperature data into polynomial features

# Split the data (80% training, 20% testing)
X_train, X_test, y_train, y_test = train_test_split(X_poly, y, test_size=0.2, random_state=42)

# Initialize the model
model = LinearRegression()

# Train the model
model.fit(X_train, y_train)

# Predict electricity usage for the test set
y_pred = model.predict(X_test)

# Evaluate the model
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Mean Absolute Error (MAE): {mae:.2f}")
print(f"Mean Squared Error (MSE): {mse:.2f}")
print(f"R-Squared (R²): {r2:.2f}")

# VISULIZATION
# Step 1: Sort the test set for smooth line chart plotting
sorted_indices = np.argsort(X_test[:, 1])  # Sort based on the temperature values
X_test_sorted = X_test[sorted_indices]
y_test_sorted = y_test.iloc[sorted_indices]
y_pred_sorted = y_pred[sorted_indices]

# Step 2: Line chart for actual vs predicted electricity usage
plt.figure(figsize=(10, 6))
plt.plot(X_test_sorted[:, 1], y_test_sorted, color='blue', label='Actual Usage', linestyle='-', marker='o')  # Actual values
plt.plot(X_test_sorted[:, 1], y_pred_sorted, color='red', label='Predicted Usage', linestyle='--', marker='x')  # Predicted values
plt.title('Line Chart: Actual vs Predicted Electricity Usage')
plt.xlabel('Temperature (°C)')
plt.ylabel('Electricity Usage (kWh)')
plt.legend()
plt.grid(True)
plt.show()
