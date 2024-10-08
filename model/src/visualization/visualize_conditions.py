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
import os

# Change directory to the location of the merged dataset
os.chdir('/Users/vzu/Projects/weather-project/data/raw')


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

# Step 4. Merge the datasets on a common column 
merged_df = pd.concat([df1_cleaned, df2_cleaned, df3_cleaned], axis=1)
print(merged_df.head())

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

# Create a box plot for each feature in the dataset
plt.figure(figsize=(10, 6))
sns.boxplot(data=x)
plt.title("Box Plot of Features")
plt.xlabel("Features")
plt.ylabel("Values")
plt.show()

# Histograms of each feature
x.hist(figsize=(12, 8))
plt.suptitle("Feature Distributions")
plt.show()

# Pairplot to see relationships between variables
sns.pairplot(merged_df[columns_needed + ['conditions']])
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

# Function to plot decision boundaries
def plot_decision_boundary(model, x, y, ax, title):
    x_min, x_max = x[:, 0].min() - 1, x[:, 0].max() + 1
    y_min, y_max = x[:, 1].min() - 1, x[:, 1].max() + 1
    xx, yy = np.meshgrid(np.arange(x_min, x_max, 0.01),
                         np.arange(y_min, y_max, 0.01))
    
    Z = model.predict(np.c_[xx.ravel(), yy.ravel()])
    Z = Z.reshape(xx.shape)

    # Plot decision boundary
    ax.contourf(xx, yy, Z, alpha=0.4, cmap='coolwarm')
    ax.scatter(x[:, 0], x[:, 1], c=y, cmap='coolwarm', edgecolors='k')
    ax.set_title(title)
    ax.set_xlabel('Feature 1')
    ax.set_ylabel('Feature 2')

# Plotting for Logistic Regression and KNN
fig, ax = plt.subplots(1, 2, figsize=(12, 6))

# Using only the first two features for visualization
x_train_2D = x_train_scaled[:, :2]
x_test_2D = x_test_scaled[:, :2]

# Train models again using only the first two features for visualization
log_reg_2D = LogisticRegression(random_state=42)
log_reg_2D.fit(x_train_2D, y_train)

knn_2D = KNeighborsClassifier(n_neighbors=5)
knn_2D.fit(x_train_2D, y_train)

# Plot Logistic Regression decision boundary
plot_decision_boundary(log_reg_2D, x_test_2D, y_test, ax[0], "Logistic Regression")

# Plot KNN decision boundary
plot_decision_boundary(knn_2D, x_test_2D, y_test, ax[1], "KNN")

plt.tight_layout()
plt.show()