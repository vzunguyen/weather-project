import axios from "axios";

// Create an Axios instance for the API
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to get location
export const getLocation = async (location) => {
  try {
    const response = await api.get(
      `/get_location?location=${encodeURIComponent(location)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching location:", error);
    throw error; // Rethrow error for further handling
  }
};

// Function to get current weather data
export const getCurrentWeatherData = async () => {
  try {
    const response = await api.post("/weather_data");
    return response.data;
  } catch (error) {
    console.error("Error fetching current weather data:", error);
    throw error; // Rethrow error for further handling
  }
};

// Function to predict weather
export const predictWeather = async () => {
  try {
    const response = await api.post("/predict_weather");
    return response.data;
  } catch (error) {
    console.error("Error predicting weather:", error);
    throw error; // Rethrow error for further handling
  }
};

// Function to predict electricity usage
export const predictElectricityUsage = async () => {
  try {
    const response = await api.post("/predict_electricity");
    return response.data;
  } catch (error) {
    console.error("Error predicting electricity usage:", error);
    throw error; // Rethrow error for further handling
  }
};
