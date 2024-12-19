import { NextRequest, NextResponse } from "next/server";

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const GEOCODING_URL = "http://api.openweathermap.org/geo/1.0/direct";
const CURRENT_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

// Ensure edge runtime for optimized performance
export const runtime = "edge";

function formatTime(hour: number): string {
  const amPm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour} ${amPm}`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json(
      { message: 'Query parameter "city" is required.' },
      { status: 400 }
    );
  }

  if (!OPENWEATHERMAP_API_KEY) {
    return NextResponse.json(
      { message: "OpenWeatherMap API key is not configured in .env.local." },
      { status: 500 }
    );
  }

  try {
    // Fetch coordinates for the city
    const geoResponse = await fetch(
      `${GEOCODING_URL}?q=${encodeURIComponent(
        city
      )}&limit=1&appid=${OPENWEATHERMAP_API_KEY}`
    );

    if (!geoResponse.ok) {
      throw new Error(
        `Geocoding API request failed with status ${geoResponse.status}`
      );
    }

    const geoData = await geoResponse.json();
    if (geoData.length === 0) {
      return NextResponse.json({ message: "City not found." }, { status: 404 });
    }

    const { lat, lon, name: cityName } = geoData[0];

    // Fetch current weather and forecast
    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      fetch(
        `${CURRENT_WEATHER_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`
      ),
      fetch(
        `${FORECAST_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`
      ),
    ]);

    if (!currentWeatherResponse.ok || !forecastResponse.ok) {
      throw new Error("Failed to fetch weather data.");
    }

    const currentWeatherData = await currentWeatherResponse.json();
    const forecastData = await forecastResponse.json();

    // Format response data
    const data = {
      city: cityName,
      current: {
        temperature: Math.round(currentWeatherData.main.temp),
        weather: currentWeatherData.weather[0].main,
        description: currentWeatherData.weather[0].description,
        icon: currentWeatherData.weather[0].icon,
      },
      hourly: forecastData.list.slice(0, 5).map((hour: any) => ({
        time: formatTime(new Date(hour.dt * 1000).getHours()),
        temperature: Math.round(hour.main.temp),
        weather: hour.weather[0].main,
        icon: hour.weather[0].icon,
      })),
      daily: {
        maxTemp: Math.round(
          Math.max(
            ...forecastData.list
              .slice(0, 8)
              .map((item: any) => item.main.temp_max)
          )
        ),
        minTemp: Math.round(
          Math.min(
            ...forecastData.list
              .slice(0, 8)
              .map((item: any) => item.main.temp_min)
          )
        ),
      },
    };

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching weather data:", error.message);
    return NextResponse.json(
      { message: "An error occurred while fetching weather data." },
      { status: 500 }
    );
  }
}
