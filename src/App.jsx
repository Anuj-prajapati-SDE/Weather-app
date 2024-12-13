import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("Noida");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const API_KEY = "00e6e38fb78b4a671c842f61d24d9e3f";
  const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

  const fetchWeatherData = async () => {
    if (!city) {
      setError("Please enter a city name!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found!");
      }

      const data = await response.json();
      console.log(data)
      setWeatherData({
        temperature: data.main.temp,
        description: data.weather[0].description,
        rainChance: data.clouds.all + "%",
        location: `${data.name}, ${data.sys.country}`,
        uvIndex: Math.round(data.main.uvi || 5),
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
        visibility: data.visibility / 1000,
        airQuality: 50,
        airQualityNote: "Moderate",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const weeklyForecast = [
    { day: "Sun", temp: "15° - 3°", icon: "☀️" },
    { day: "Mon", temp: "12° - 7°", icon: "🌦" },
    { day: "Tue", temp: "9° - 0°", icon: "☁️" },
    { day: "Wed", temp: "8° - 1°", icon: "🌧" },
    { day: "Thu", temp: "5° - 2°", icon: "❄️" },
    { day: "Fri", temp: "4° - 4°", icon: "☀️" },
    { day: "Sat", temp: "3° - 3°", icon: "☀️" },
  ];

  return (
    <div className="app">
      <div className="weather-container">
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for places..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeatherData}>🔍</button>
        </div>

        {/* Error Message */}
        {error && <p className="error">{error}</p>}

        {/* Loading Spinner */}
        {loading && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}

        {/* Main Weather Section */}
        {weatherData && !loading ? (
          <div className="main-weather">
            <div className="weather-icon">☀️</div>
            <div className="weather-info">
              <h1>{weatherData.temperature}°C</h1>
              <p>{weatherData.description}</p>
              <p>Rain: {weatherData.rainChance}</p>
              <p>{weatherData.location}</p>
            </div>
          </div>
        ) : !loading && (
          <p className="placeholder">Search for a city to see its weather.</p>
        )}

        {/* Weekly Forecast */}
        <div className="weekly-forecast">
          {weeklyForecast.map((item, index) => (
            <div key={index} className="forecast-day">
              <p>{item.day}</p>
              <div className="forecast-icon">{item.icon}</div>
              <p>{item.temp}</p>
            </div>
          ))}
        </div>

        {/* Highlights Section */}
        {weatherData && (
          <div className="highlights">
            <div className="highlight-card">
              <p>UV Index</p>
              <h3>{weatherData.uvIndex}</h3>
            </div>
            <div className="highlight-card">
              <p>Wind Status</p>
              <h3>{weatherData.windSpeed} km/h</h3>
            </div>
            <div className="highlight-card">
              <p>Humidity</p>
              <h3>{weatherData.humidity}%</h3>
            </div>
            <div className="highlight-card">
              <p>Visibility</p>
              <h3>{weatherData.visibility} km</h3>
            </div>
            <div className="highlight-card">
              <p>Air Quality</p>
              <h3>{weatherData.airQuality}</h3>
              <p>{weatherData.airQualityNote}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
