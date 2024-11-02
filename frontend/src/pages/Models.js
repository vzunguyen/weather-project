import React from "react";
import { LineChart, BarChart } from "lucide-react";
import ElectricityChart from "../components/ElectricityChart";
import WeatherChart from "../components/WeatherChart";

export default function ModelsPage() {
  return (
    <div className="min-h-screen pt-32 pb-32 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg mb-4">
            <BarChart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Our Models
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our predictive models for electricity usage and weather
            patterns
          </p>
        </div>

        {/* Electricity Usage Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <LineChart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Electricity Usage Predictions
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
            <ElectricityChart />
          </div>
        </div>

        {/* Weather Type Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <BarChart className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Weather Type Analysis
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
            <WeatherChart />
          </div>
        </div>
      </div>
    </div>
  );
}
