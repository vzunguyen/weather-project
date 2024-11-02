import React, { useState, useEffect } from "react";
import LocationSearch from "../components/LocationSearch";
import lastLocation from "../../../backend/data/last_location.json";
import {
  getCurrentWeatherData,
  predictElectricityUsage,
  predictWeather,
} from "../services/api";
import {
  Sun,
  Cloud,
  Droplets,
  Wind,
  Thermometer,
  Umbrella,
  ZapOff,
  CloudRainWind,
  Gauge,
} from "lucide-react";

export default function HomePage() {
  const [location, setLocation] = useState(lastLocation.location);
  const [temperature, setTemperature] = useState(null);
  const [weatherType, setWeatherType] = useState("");
  const [humidity, setHumidity] = useState(null);
  const [precipitation, setPrecipitation] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [wind, setWind] = useState(null);
  const [uv, setUv] = useState(null);
  const [error, setError] = useState(null);
  const [predictedKNN, setPredictedKNN] = useState(null);
  const [predictedLogReg, setPredictedLogReg] = useState(null);
  const [predictedElectricityUsage, setPredictedElectricityUsage] =
    useState(null);

  const updateWeatherData = async (newLocation) => {
    try {
      setError(null);
      const weatherData = await getCurrentWeatherData(newLocation || location);
      setLocation(weatherData.location.name);
      setTemperature(weatherData.current.temp_c);
      setWeatherType(weatherData.current.condition.text);
      setHumidity(weatherData.current.humidity);
      setPrecipitation(weatherData.current.precip_mm);
      setFeelsLike(weatherData.current.feelslike_c);
      setWind(weatherData.current.wind_kph);
      setUv(weatherData.current.uv);
    } catch (error) {
      console.error("Failed to fetch weather data", error);
      setError("Error fetching weather data");
    }
  };

  const handlePredictWeather = async () => {
    try {
      const prediction = await predictWeather();
      setPredictedKNN(prediction.predicted_weather_type.knn); // Assuming the response contains weatherType
      setPredictedLogReg(prediction.predicted_weather_type.logistic_regression);
    } catch (error) {
      console.error("Error predicting weather type", error);
      setError("Error predicting weather type");
    }
  };

  const handlePredictElectricityUsage = async () => {
    try {
      const prediction = await predictElectricityUsage();
      setPredictedElectricityUsage(prediction.predicted_electricity_usage); // Assuming the response contains electricityUsage
    } catch (error) {
      console.error("Error predicting electricity usage", error);
      setError("Error predicting electricity usage");
    }
  };

  useEffect(() => {
    if (location) {
      updateWeatherData();
    }
  }, [location]);

  return (
    <div className="min-h-screen pt-32 pb-32 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
          <LocationSearch
            setLocation={(newLocation) => {
              setLocation(newLocation);
              updateWeatherData(newLocation);
            }}
          />
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400 text-center">
              {error}
            </p>
          </div>
        )}

        {location && !error && (
          <div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Main Weather Card */}
              <div className="col-span-full lg:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {location}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                      {weatherType}
                    </p>
                  </div>
                  <div className="text-right">
                    {temperature !== null && (
                      <div className="text-6xl font-bold text-gray-900 dark:text-white">
                        {temperature}°
                        <span className="text-2xl font-bold text-gray-900 dark:text-gray-400">
                          C
                        </span>
                      </div>
                    )}
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Feels like {feelsLike}°C
                    </p>
                  </div>
                </div>
              </div>

              {/* Weather Details Cards */}
              <div className="col-span-full lg:col-span-1 grid grid-cols-2 gap-4">
                {/* Humidity Card */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Droplets className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Humidity
                      </p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">
                        {humidity}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Wind Card */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Wind className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Wind
                      </p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">
                        {wind} kph
                      </p>
                    </div>
                  </div>
                </div>

                {/* Precipitation Card */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Umbrella className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Precipitation
                      </p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">
                        {precipitation} mm
                      </p>
                    </div>
                  </div>
                </div>

                {/* UV Index Card */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                      <Sun className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        UV Index
                      </p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">
                        {uv}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* New Predictions Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Weather & Energy Predictions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Weather Prediction Card */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <CloudRainWind className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Weather Prediction
                      </h3>
                    </div>
                    <button
                      onClick={handlePredictWeather}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                    >
                      <Gauge className="w-4 h-4 mr-2" />
                      Predict
                    </button>
                  </div>

                  {predictedKNN && predictedLogReg ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
                          KNN Prediction
                        </p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {predictedKNN}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-2">
                          Logistic Regression
                        </p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {predictedLogReg}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      Click predict to see weather forecast
                    </div>
                  )}
                </div>

                {/* Electricity Usage Prediction Card */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <ZapOff className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Energy Usage Prediction
                      </h3>
                    </div>
                    <button
                      onClick={handlePredictElectricityUsage}
                      className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                    >
                      <Gauge className="w-4 h-4 mr-2" />
                      Predict
                    </button>
                  </div>

                  {predictedElectricityUsage ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-2">
                          Predicted Usage
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {predictedElectricityUsage}
                          <span className="text-lg font-normal text-gray-500 dark:text-gray-400 ml-1">
                            kWh
                          </span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      Click predict to see energy usage forecast
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
