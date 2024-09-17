import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, MinMaxScaler

# Load dataset
#file = './nyc_weather.csv'
file = pd.read_csv('nyc_weather.csv')

# Step 1: Identifying the missing data
missing_values = file.isnull().sum()

print(missing_values)

# Remove rows with missing values 
file_cleaned = file.dropna()  
# Remove duplicate rows
file.drop_duplicates(inplace=True)

# Step 2: Detect outliers using the IQR method
def detect_outliers(file, method = 'cap'):
    capped_outliers = pd.DataFrame()  # DataFrame to hold outliers
    
    for column in file.select_dtypes(include=[np.number]).columns:  # Loop through all numerical columns
        Q1 = file[column].quantile(0.25)
        Q3 = file[column].quantile(0.75)
        IQR = Q3 - Q1
        
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR
        
        # Identify outliers in the current column
        if method == 'cap':
            # Cap outliers to the boundaries
            file[column] = np.where(file[column] < lower_bound, lower_bound, file[column])
            file[column] = np.where(file[column] > upper_bound, upper_bound, file[column])
    
    return capped_outliers.drop_duplicates()  # Drop duplicates if an outlier appears in multiple columns

# Cap (clip) outliers 
capped_outliers = detect_outliers(file, method = 'cap')

# Display the outliers
print("Outliers found:")
print(capped_outliers)

# Step 5: Standardize and Normalize the data
# Define the columns to standardize and normalize (numerical columns only)
numerical_columns = ['tempmax','tempmin','temp','feelslikemax','feelslikemin','feelslike','dew','humidity','precip','precipprob','precipcover','windgust','windspeed','winddir','sealevelpressure','cloudcover','visibility','solarradiation','solarenergy','uvindex','severerisk']

# Step 5.1: Standardize the dataset (mean = 0, variance = 1)
scaler = StandardScaler()
df_standardized = file.copy()  # Make a copy of the original dataframe
df_standardized[numerical_columns] = scaler.fit_transform(file[numerical_columns])

# Step 5.2: Normalize the dataset (scale to range [0, 1])
normalizer = MinMaxScaler()
df_normalized = file.copy()  
df_normalized[numerical_columns] = normalizer.fit_transform(file[numerical_columns])

# Check if data is normalized
for col in ['tempmax','tempmin','temp','feelslikemax','feelslikemin','feelslike','dew','humidity','precip','precipprob','precipcover','windgust','windspeed','winddir','sealevelpressure','cloudcover','visibility','solarradiation','solarenergy','uvindex','severerisk']:
    min_val = file[col].min()
    max_val = file[col].max()
    print(f"Column: {col} | Min: {min_val}, Max: {max_val}")
    
# Print the processed dataset
print(file_cleaned)
file_cleaned.to_csv('cleaned_data.csv', index=False)
