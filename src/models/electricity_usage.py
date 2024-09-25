import pandas as pd
from sklearn.preprocessing import PolynomialFeatures
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import matplotlib.pyplot as plt
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

# Create polynomial features (degree 2 for U-shaped trend)
poly = PolynomialFeatures(degree=2)
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

# Scatter plot of actual vs predicted values
plt.scatter(X_test[:, 1], y_test, color='blue', label='Actual')  # Using X_test[:, 1] to get the temperature values
plt.scatter(X_test[:, 1], y_pred, color='red', label='Predicted')
plt.title('Actual vs Predicted Electricity Usage')
plt.xlabel('Temperature (°C)')
plt.ylabel('Electricity Usage (kWh)')
plt.legend()
plt.show()
