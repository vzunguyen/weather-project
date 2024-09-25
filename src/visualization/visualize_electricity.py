import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import os

# Change directory to the location of the merged dataset
os.chdir('/Users/vzu/Projects/weather-project/data/processed')

# Load the dataset
df = pd.read_csv('merged_cleaned_dataset.csv')

# Select the necessary columns
columns_needed = ['temp', 'Electricity Use - Grid Purchase and Generated from Onsite Renewable Systems (kWh)']

# Sort the data by temperature for a smoother line plot
df_sorted = df[columns_needed].sort_values(by='temp')

# Set up the figure size
plt.figure(figsize=(10, 6))

# 1. Line plot for Temperature vs. Electricity Usage
# Plot temperature vs. electricity usage
sns.lineplot(x='temp', y='Electricity Use - Grid Purchase and Generated from Onsite Renewable Systems (kWh)', data=df_sorted)

# Add labels and title
plt.title('Temperature vs. Electricity Usage', fontsize=16)
plt.xlabel('Temperature (°C)', fontsize=12)
plt.ylabel('Electricity Usage (kWh)', fontsize=12)

# Show the plot
plt.show()

# Set up the figure size
plt.figure(figsize=(12, 6))

# 2. Histogram for Temperature
plt.subplot(1, 2, 1)
sns.histplot(df['temp'], bins=30, kde=True, color='blue')
plt.title('Temperature Distribution')
plt.xlabel('Temperature (°C)')
plt.ylabel('Frequency')

# 2. Histogram for Electricity Usage
plt.subplot(1, 2, 2)
sns.histplot(df['Electricity Use - Grid Purchase and Generated from Onsite Renewable Systems (kWh)'], bins=30, kde=True, color='green')
plt.title('Electricity Usage Distribution')
plt.xlabel('Electricity Usage (kWh)')
plt.ylabel('Frequency')

# Adjust layout
plt.tight_layout()

# Show the plot
plt.show()

# 3. Scatterplot
# Step 1: Create a scatter plot (Point and Figure-like chart)
plt.figure(figsize=(10, 6))

# Scatter plot with a point for each temp and electricity usage pair
sns.scatterplot(x='temp', y='Electricity Use - Grid Purchase and Generated from Onsite Renewable Systems (kWh)', data=df)

# Add labels and title
plt.title('Temperature vs. Electricity Usage (Point & Figure Style)', fontsize=16)
plt.xlabel('Temperature (°C)', fontsize=12)
plt.ylabel('Electricity Usage (kWh)', fontsize=12)

# Show the plot
plt.show()
