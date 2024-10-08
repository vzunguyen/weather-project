import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import os

# Change directory to the location of the merged dataset
os.chdir('/Users/vzu/Projects/weather-project/data/processed')

# Load the dataset
df = pd.read_csv('merged_cleaned_dataset.csv')

# Inspect the dataset
print("\nDataset Info:")
print(df.info())

# Select the necessary columns
columns_needed = ['temp', 'Electricity Use - Grid Purchase and Generated from Onsite Renewable Systems (kWh)']

# Sort the data by temperature for a smoother line plot
df_sorted = df[columns_needed].sort_values(by='temp')

# Descriptive statistics
print("\nDescriptive Statistics:")
print(df_sorted.describe())

# Correlation matrix
correlation_matrix = df_sorted.corr()
print("Correlation Matrix:")
print(correlation_matrix)

#`Heatmap`
plt.figure(figsize=(10, 8))
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', vmin=-1, vmax=1, cbar=True, square=True, linewidths=0.5)
plt.title('Correlation Matrix Heatmap', fontsize=16)

plt.show()

# Line plot for Temperature vs. Electricity Usage
# Set up the figure size
plt.figure(figsize=(10, 6))

# Plot temperature vs. electricity usage
sns.lineplot(x='temp', y='Electricity Use - Grid Purchase and Generated from Onsite Renewable Systems (kWh)', data=df_sorted)

# Add labels and title
plt.title('Temperature vs. Electricity Usage', fontsize=16)
plt.xlabel('Temperature (°C)', fontsize=12)
plt.ylabel('Electricity Usage (kWh)', fontsize=12)

# Show the plot
plt.show()

#  Scatterplot
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
