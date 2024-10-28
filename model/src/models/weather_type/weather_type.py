import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, ConfusionMatrixDisplay, mean_squared_error, mean_absolute_error, r2_score
import os

# Change directory to the location of the processed dataset
os.chdir('/Users/vzu/Projects/weather-project/model/data/processed')

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

# Replace 'Partly' with 'Cloudy' in the 'weather_condition' column
df1['conditions'] = df1['conditions'].replace(to_replace='Partly', value='Cloudy', regex=True)

# Step 3. Clean the datasets
# Handle missing values by filling with 'null'
df1_cleaned = df1.fillna('null')
df2_cleaned = df2.fillna('null')
df3_cleaned = df3.fillna('null')

# Remove duplicates
df1_cleaned = df1_cleaned.drop_duplicates()
df2_cleaned = df2_cleaned.drop_duplicates()
df3_cleaned = df3_cleaned.drop_duplicates()

# Step 4. Merge the datasets on a common column 
merged_df = pd.concat([df1, df2, df3], axis=1)
merged_df.fillna({'preciptype': 'null'}, inplace=True)

# Outliers
def find_and_remove_outliers(data):
    outliers_dict = {}
    
    # Iterate through numeric columns
    for column in data.select_dtypes(include=['float64', 'int64']).columns:
        Q1 = data[column].quantile(0.25)  # First quartile
        Q3 = data[column].quantile(0.75)  # Third quartile
        IQR = Q3 - Q1  # Interquartile range

        # Define bounds for outliers
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR

        # Find outliers
        outliers = data[(data[column] < lower_bound) | (data[column] > upper_bound)]
        
        # Store outliers in dictionary
        outliers_dict[column] = outliers

    # Remove outliers from the DataFrame
    filtered_data = data[~data.index.isin(outliers.index)]
    
    return filtered_data

filtered_merged_df = find_and_remove_outliers(merged_df)

# Summary statistics before removing outliers
print("Summary statistics before removing outliers:")
print(merged_df.describe())

# Summary statistics after removing outliers
print("\nSummary statistics after removing outliers:")
print(filtered_merged_df.describe())

# Save the merged dataset
merged_df.to_csv('merged_cleaned_dataset.csv', index=False)

# Specify the columns you need for your model
columns_needed = ['temp', 'humidity', 'precip', 'windspeed'] 

# Step 5. Preprocess the data
# Assuming 'conditions' is the target variable (for classification)
# Separate features (x) and target (y)
x_cls = merged_df[columns_needed]
y_cls = merged_df['conditions']  

# Step 6. Data Exploration
print("\nDescriptive Statistics:")
print(merged_df.describe())  # Statistical summary

print("\nCorrelation Matrix:")
correlation_matrix = x_cls.corr()
print(correlation_matrix)  # Correlation between features

# Step 6. Split the data into training and testing sets (80% - Training  20% - Test)
x_train_cls, x_test_cls, y_train_cls, y_test_cls = train_test_split(x_cls, y_cls, test_size=0.2, random_state=42)

# Scale the features
columns_to_normalize = merged_df.select_dtypes(include=['float64', 'int64']).columns
scaler = StandardScaler() 
merged_df[columns_to_normalize] = scaler.fit_transform(merged_df[columns_to_normalize])

# Step 7. Logistic Regression Model
log_reg = LogisticRegression(random_state=42)
log_reg.fit(x_train_cls,y_train_cls)

# Save the trained model
import joblib
joblib.dump(log_reg, '../../models/reg_trained_model.pkl')
print("Model saved as 'reg_trained_model.pkl'")

# Make predictions
y_pred_cls = log_reg.predict(x_test_cls)

# Step 8. Confusion Matrix for Logistic Regression
# Get unique classes dynamically
unique_classes = np.unique(y_test_cls)
print("Unique classes:", unique_classes)

# Logistic Regression Evaluation
print("\nLogistic Regression Evaluation:")
print(f"Accuracy: {accuracy_score(y_test_cls, y_pred_cls):.2f}")
print(f"Precision: {precision_score(y_test_cls, y_pred_cls, average='macro', zero_division=0):.2f}")
print(f"Recall: {recall_score(y_test_cls, y_pred_cls, average='macro', zero_division=0):.2f}")
print(f"F1-Score: {f1_score(y_test_cls, y_pred_cls, average='macro', zero_division=0):.2f}")

# Step 9. K-Nearest Neighbors (KNN) Model
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(x_train_cls, y_train_cls)

import joblib
joblib.dump(knn, '../../models/knn_trained_model.pkl')
print("Model saved as 'knn_trained_model.pkl'")

# Make predictions
y_pred_knn = knn.predict(x_test_cls)

# KNN Evaluation
print("\nKNN Evaluation:")
print(f"Accuracy: {accuracy_score(y_test_cls, y_pred_knn):.2f}")
print(f"Precision: {precision_score(y_test_cls, y_pred_knn, average='macro', zero_division=0):.2f}")
print(f"Recall: {recall_score(y_test_cls, y_pred_knn, average='macro', zero_division=0):.2f}")
print(f"F1-Score: {f1_score(y_test_cls, y_pred_knn, average='macro'):.2f}")

# Step 11. Save the merged and cleaned dataset
# Change directory
os.chdir('/Users/vzu/Projects/weather-project/model/data/predicted')

# Saving the DataFrame to a CSV file
merged_df.to_csv('weather_predictions.csv', index=False)

print("Predictions saved to 'weather_predictions.csv'")
