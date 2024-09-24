import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, classification_report

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
# Handle missing values by filling with 'null'
df1_cleaned = df1.fillna('null')
df2_cleaned = df2.fillna('null')
df3_cleaned = df3.fillna('null')

# Remove duplicates
df1_cleaned = df1_cleaned.drop_duplicates()
df2_cleaned = df2_cleaned.drop_duplicates()
df3_cleaned = df3_cleaned.drop_duplicates()

# Function to remove outliers using IQR
def remove_outliers_iqr(df1, columns):
    Q1 = df1[columns].quantile(0.25)
    Q3 = df1[columns].quantile(0.75)
    IQR = Q3 - Q1

    # Define the bounds for non-outliers
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR

    # Filter the dataset to remove outliers
    df1_cleaned = df1[~((df1[columns] < lower_bound) | (df1[columns] > upper_bound)).any(axis=1)]

    return df1_cleaned

# Applying the function to remove outliers
columns_needed = ['temp', 'humidity', 'precip', 'windspeed']  # Specify the columns to check for outliers

# Step 4. Merge the datasets on a common column 
merged_df = pd.concat([df1_cleaned, df2_cleaned, df3_cleaned], axis=1)

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

#print(merged_df)
merged_df.to_csv('merged_cleaned_dataset.csv', index=False)

# Specify the columns you need for your model
columns_needed = ['temp', 'humidity', 'precip', 'windspeed'] 

# Step 5. Preprocess the data
# Assuming 'conditions' is the target variable (for classification)
# Separate features (x) and target (y)
x = merged_df[columns_needed]
y = merged_df['conditions']  

# Step 6. Data Exploration
print("\nDescriptive Statistics:")
print(merged_df.describe())  # Statistical summary

print("\nCorrelation Matrix:")
print(x.corr())  # Correlation between features

# Pairplot to see relationships between variables
sns.pairplot(merged_df[columns_needed + ['conditions']])
plt.show()

# Histograms of each feature
x.hist(figsize=(12, 8))
plt.suptitle("Historgram")
plt.show()

# Step 6. Split the data into training and testing sets
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

# Scale the features
scaler = StandardScaler() 
x_train_scaled = scaler.fit_transform(x_train)
x_test_scaled = scaler.fit_transform(x_test)

# Step 7. Logistic Regression Model
log_reg = LogisticRegression(random_state=42)
log_reg.fit(x_train_scaled,y_train)

# Make predictions
y_pred = log_reg.predict(x_test_scaled)
y_prob = log_reg.predict(x_test_scaled)

# Evaluate Logistic Regression Model
print("\nLogistic Regression Evaluation:")
print(f"Accuracy: {accuracy_score(y_test, y_pred):.2f}")
print(f"Precision: {precision_score(y_test, y_pred, average='macro', zero_division=0):.2f}")
print(f"Recall: {recall_score(y_test, y_pred, average='macro'):.2f}")
print(f"F1-Score: {f1_score(y_test, y_pred, average='macro'):.2f}")
print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# Step 8. K-Nearest Neighbors (KNN) Model
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(x_train_scaled, y_train)

# Make predictions
y_pred_knn = knn.predict(x_test_scaled)

# Evaluate KNN Model
print("\nKNN Evaluation:")
print(f"Accuracy: {accuracy_score(y_test, y_pred_knn):.2f}")
print(f"Precision: {precision_score(y_test, y_pred_knn, average='macro', zero_division=0):.2f}")
print(f"Recall: {recall_score(y_test, y_pred_knn, average='macro', zero_division=0):.2f}")
print(f"F1-Score: {f1_score(y_test, y_pred_knn, average='macro'):.2f}")
print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred_knn))

# Step 9. Save the merged and cleaned dataset
merged_df.to_csv('merged_cleaned_dataset.csv', index=False)
print("\nMerged dataset saved as 'merged_cleaned_dataset.csv'")

