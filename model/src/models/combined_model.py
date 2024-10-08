import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, ConfusionMatrixDisplay, mean_squared_error, mean_absolute_error, r2_score
import os

# Change directory to the location of the processed dataset
os.chdir('/Users/vzu/Projects/weather-project/data/processed')

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
# Create a heatmap to visualize the correlation matrix
plt.figure(figsize=(10, 8))  # Set the figure size
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', vmin=-1, vmax=1, cbar=True, square=True, linewidths=0.5)

# Customize the plot
plt.title('Correlation Matrix Heatmap')
plt.show()

# Histograms of each feature
x_cls.hist(figsize=(12, 8))
plt.suptitle("Histogram")
plt.show()

# Step 6. Split the data into training and testing sets (80% - Training  20% - Test)
x_train_cls, x_test_cls, y_train_cls, y_test_cls = train_test_split(x_cls, y_cls, test_size=0.2, random_state=42)

# Scale the features
columns_to_normalize = merged_df.select_dtypes(include=['float64', 'int64']).columns
scaler = StandardScaler() 
merged_df[columns_to_normalize] = scaler.fit_transform(merged_df[columns_to_normalize])

# Step 7. Logistic Regression Model
log_reg = LogisticRegression(random_state=42)
log_reg.fit(x_train_cls,y_train_cls)

# Make predictions
y_pred_cls = log_reg.predict(x_test_cls)

# Step 8. Confusion Matrix for Logistic Regression
# Get unique classes dynamically
unique_classes = np.unique(y_test_cls)
print("Unique classes:", unique_classes)

# Display the confusion matrix using the unique classes as labels
disp = ConfusionMatrixDisplay(confusion_matrix=confusion_matrix(y_test_cls, y_pred_cls), display_labels=unique_classes)
disp.plot(cmap='Blues')

plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix (Logistic Regression)')
plt.show()

# Logistic Regression Evaluation
print("\nLogistic Regression Evaluation:")
print(f"Accuracy: {accuracy_score(y_test_cls, y_pred_cls):.2f}")
print(f"Precision: {precision_score(y_test_cls, y_pred_cls, average='macro', zero_division=0):.2f}")
print(f"Recall: {recall_score(y_test_cls, y_pred_cls, average='macro'):.2f}")
print(f"F1-Score: {f1_score(y_test_cls, y_pred_cls, average='macro'):.2f}")

# Step 9. K-Nearest Neighbors (KNN) Model
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(x_train_cls, y_train_cls)

# Make predictions
y_pred_knn = knn.predict(x_test_cls)

# Confusion Matrix for KNN
disp = ConfusionMatrixDisplay(confusion_matrix=confusion_matrix(y_test_cls, y_pred_knn), display_labels=unique_classes)
disp.plot(cmap='Greens')

plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix (KNN)')
plt.show()

# KNN Evaluation
print("\nKNN Evaluation:")
print(f"Accuracy: {accuracy_score(y_test_cls, y_pred_knn):.2f}")
print(f"Precision: {precision_score(y_test_cls, y_pred_knn, average='macro', zero_division=0):.2f}")
print(f"Recall: {recall_score(y_test_cls, y_pred_knn, average='macro', zero_division=0):.2f}")
print(f"F1-Score: {f1_score(y_test_cls, y_pred_knn, average='macro'):.2f}")

# Step 10. Polynomial Regression for Electricity Usage
# Load the dataset
merged_df = pd.read_csv('merged_cleaned_dataset.csv')

# Select the necessary columns for polynomial regression
poly_columns_needed = ['temp', 'Electricity Use - Grid Purchase and Generated from Onsite Renewable Systems (kWh)']

# Separate features (X) and target (y) for polynomial regression
X_poly = merged_df[['temp']]  
y_poly = merged_df['Electricity Use - Grid Purchase and Generated from Onsite Renewable Systems (kWh)']  # Target: Electricity usage

# Create polynomial features
poly = PolynomialFeatures(degree=5)
X_poly_transformed = poly.fit_transform(X_poly)  # Transform the temperature data into polynomial features

# Split the data (80% training, 20% testing)
X_train_poly, X_test_poly, y_train_poly, y_test_poly = train_test_split(X_poly_transformed, y_poly, test_size=0.2, random_state=42)

# Initialize the polynomial regression model
poly_model = LinearRegression()

# Train the polynomial regression model
poly_model.fit(X_train_poly, y_train_poly)

# Predict electricity usage for the test set
y_pred_poly = poly_model.predict(X_test_poly)

# Evaluate the polynomial regression model
mae_poly = mean_absolute_error(y_test_poly, y_pred_poly)
mse_poly = mean_squared_error(y_test_poly, y_pred_poly)
r2_poly = r2_score(y_test_poly, y_pred_poly)

print(f"\nPolynomial Regression Evaluation:")
print(f"Mean Absolute Error (MAE): {mae_poly:.2f}")
print(f"Mean Squared Error (MSE): {mse_poly:.2f}")
print(f"R-Squared (R²): {r2_poly:.2f}")

# Scatter plot of actual vs predicted values for polynomial regression
plt.scatter(X_test_poly[:, 1], y_test_poly, color='blue', label='Actual')  # Using X_test_poly[:, 1] to get the temperature values
plt.scatter(X_test_poly[:, 1], y_pred_poly, color='red', label='Predicted')
plt.xlabel('Temperature')
plt.ylabel('Electricity Usage')
plt.title('Actual vs Predicted Electricity Usage (Polynomial Regression)')
plt.legend()
plt.show()
