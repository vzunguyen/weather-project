import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# Step 1. Load the datasets
df1 = pd.read_csv('nyc_weather.csv')
df2 = pd.read_csv('energy_usage.csv')
df3 = pd.read_csv('cleaned_energy_effeciency.csv')

# Step 2. Inspect the datasets
print("Dataset 1 Info:")
print(df1.info())
print("\nDataset 2 Info:")
print(df2.info())
print("\nDataset 3 Info:")
print(df3.info())

# Step 3. Clean the datasets
# Handle missing values by filling with mean
df1_cleaned = df1.isnull().sum()
df2_cleaned = df2.isnull().sum()
df3_cleaned = df3.isnull().sum()

print(df1_cleaned)
print(df2_cleaned)
print(df3_cleaned)

# Remove duplicates
df1_cleaned = df1_cleaned.drop_duplicates()
df2_cleaned = df2_cleaned.drop_duplicates()
df3_cleaned = df3_cleaned.drop_duplicates()

# Step 4. Merge the datasets on a common column 
merged_df = pd.concat([df1, df2, df3], axis=1)
print(merged_df.head())

# Add a specific column from df1 to the merged dataset
column_to_add = 'conditions' 
merged_df[column_to_add] = df1[column_to_add]

# Step 5. Handle categorical data (One-Hot Encoding)
merged_df = pd.get_dummies(merged_df, drop_first=True)

# Step 6. Feature Scaling (Normalizing)
scaler = StandardScaler()
scaled_df = pd.DataFrame(scaler.fit_transform(merged_df), columns=merged_df.columns)

# Step 7. Prepare the data for machine learning
x = scaled_df
merged_df.to_csv('merged_cleaned_dataset.csv', index=False)

