'use client'
import React, { useState } from "react";

type WeatherResults = {
  city: string;
  current: {
    temperature: number;
    weather: string;
    description: string;
    icon: string;
  };
  hourly: {
    time: string;
    temperature: number;
    weather: string;
    icon: string;
  }[];
  daily: {
    maxTemp: number;
    minTemp: number;
  };
};

const Weather: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weatherResults, setWeatherResults] = useState<WeatherResults | null>(
    null
  );
  const [error, setError] = useState<string>("");

  const fetchWeather = async () => {
    setError("");
    setWeatherResults(null);

    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
      const data: WeatherResults = await response.json();
      setWeatherResults(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather data.");
    }
  };

  return (
    <div className="flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Weather</h1>
      <div className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="text-gray-500 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchWeather}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Get Weather
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {weatherResults && (
        <div className="bg-white p-6 rounded-lg shadow-md text-center w-full max-w-md">
          <h2 className="text-gray-600 text-2xl font-bold mb-2">{weatherResults.city}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${weatherResults.current.icon}@2x.png`}
            alt="Current Weather Icon"
            className="mx-auto mb-2"
          />
          <p className="text-gray-600 text-lg capitalize mb-2">
            {weatherResults.current.description}
          </p>
          <p className="text-gray-600 text-xl font-semibold">
            {weatherResults.current.temperature}°C
          </p>
          <p className="text-gray-600 text-sm">
            <strong>High:</strong> {weatherResults.daily.maxTemp}°C |{" "}
            <strong>Low:</strong> {weatherResults.daily.minTemp}°C
          </p>
          <div className="text-gray-600 grid grid-cols-2 gap-2 mt-4">
            {weatherResults.hourly.map((hour, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-2 bg-gray-100 rounded-md"
              >
                <p className="text-sm font-medium">{hour.time}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${hour.icon}@2x.png`}
                  alt="Hourly Weather Icon"
                  className="h-10 w-10"
                />
                <p className="text-sm">{hour.temperature}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
