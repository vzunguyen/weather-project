import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# 1. Load the datasets
df1 = pd.read_csv('nyc_weather1.csv')
df2 = pd.read_csv('energy_usage.csv')
df3 = pd.read_csv('energy_effeciency.csv')

# 2. Inspect the datasets
print("Dataset 1 Info:")
print(df1.info())
print("Dataset 2 Info:")
print(df2.info())
print("Dataset 3 Info:")
print(df3.info())

# 3. Clean the datasets
# Handle missing values by filling with mean
df1_cleaned = df1.isnull().sum()
df2_cleaned = df2.isnull().sum()

print(df1_cleaned)
print(df2_cleaned)
print(df3_cleaned)

# Remove duplicates
df1_cleaned = df1_cleaned.drop_duplicates()
df2_cleaned = df2_cleaned.drop_duplicates()
df3_cleaned = df3_cleaned.drop_duplicates()

# 4. Merge the datasets  
merged_df = pd.merge(df1, df2, df3, left_index=True, right_index=True, how='outer')

# 5. Handle categorical data (One-Hot Encoding)
merged_df = pd.get_dummies(merged_df, drop_first=True)

# Save the merged and cleaned dataset (before scaling) to a CSV file
merged_df.to_csv('merged_cleaned_dataset.csv', index=False)

# 6. Feature Scaling (Normalizing)
scaler = StandardScaler()
scaled_df = pd.DataFrame(scaler.fit_transform(merged_df), columns=merged_df.columns)

# 7. Inspect the final dataset
print("Merged Dataset Info:")
print(scaled_df.info())
print(scaled_df.head())
