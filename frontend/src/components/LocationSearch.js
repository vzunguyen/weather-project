import React, { useState } from "react";
import lastLocation from "../../../backend/data/last_location.json";
import { getLocation } from "../services/api";

const LocationSearch = ({ setLocation }) => {
  const [searchLocation, setSearchLocation] = useState(lastLocation.location);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(""); // New error state

  const handleSearch = async (event) => {
    event.preventDefault();
    // setMessage("");
    // setError(""); // Clear any previous error before search

    try {
      const locationResponse = await getLocation(searchLocation);
      setLocation(searchLocation); // Update location immediately
      setMessage(locationResponse.message);
    } catch (error) {
      console.error("Error fetching location data:", error);
      setError(
        `Error: Cannot get weather data for this location: ${searchLocation}`
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 class="animate-fade-right text-3xl font-extrabold font-sans mb-6">
        What's the weather in...?
      </h1>

      <form onSubmit={handleSearch} class="relative">
        <label
          htmlFor="location-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search Location
        </label>

        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>

          <input
            type="search"
            id="location-search"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for location..."
            required
          />

          <button
            type="submit"
            class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      {message && !error && (
        <p class="mt-4 text-sm text-gray-600 dark:text-gray-300">{message}</p>
      )}
    </div>
  );
};

export default LocationSearch;
