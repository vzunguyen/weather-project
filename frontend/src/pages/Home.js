import React, { useState } from "react";

const WeatherHomePage = () => {
  const [location, setLocation] = useState("Current Location");
  const [temperature, setTemperature] = useState(40);
  const [weatherType, setWeatherType] = useState("Sunny");

  return (
    <div className="weather-homepage">
      {/* Main Content */}
      <main className="weather-content">
        {/* Page Title */}
        <h1 className="page-title">What's the weather in...?</h1>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder={`Search for location (Default: ${location})`}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Temperature and Location Info */}
        <div className="weather-info">
          <div className="temperature">
            <h2>{temperature}°C</h2>
            <p>Location: {location}</p>
            <p>{weatherType}</p>
          </div>
        </div>

        {/* Weather Detail Buttons */}
        <div className="weather-details">
          <div className="detail-button">Humidity</div>
          <div className="detail-button">Precipitation</div>
          <div className="detail-button">Feels like</div>
          <div className="detail-button">Wind</div>
          <div className="detail-button">UV</div>
        </div>
      </main>
    </div>
  );
};

export default WeatherHomePage;
