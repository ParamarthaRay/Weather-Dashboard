import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ThemeToggle from "../components/ThemeToggle";
const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const API_KEY = "572c25b0f2764c0c7e701daae0c76e42";
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    setSearchHistory(savedHistory);
  }, []);
  const fetchWeather = async (selectedCity = city) => {
    if (!selectedCity) return;
    setLoading(true);
    setError("");
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(selectedCity)},IN&units=metric&appid=${API_KEY}`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(selectedCity)},IN&units=metric&appid=${API_KEY}`
      );
      if (weatherResponse.data.cod !== 200) {
        throw new Error(weatherResponse.data.message);
      }
      setWeather(weatherResponse.data);
      const dailyForecast = forecastResponse.data.list.filter((_, index) => index % 8 === 0);
      setForecast(dailyForecast);
      const updatedHistory = [selectedCity, ...searchHistory.filter((c) => c !== selectedCity)].slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem("weatherHistory", JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      setError("City not found. Please enter a valid name.");
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={`flex items-center justify-center min-h-screen transition-all duration-500
                  ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <div className="absolute top-4 right-4">
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>  
      <div
        className={`flex flex-col items-center justify-center p-8 rounded-xl shadow-lg w-[90%] max-w-lg transition-all duration-500
                    ${darkMode ? "bg-orange-600 text-black" : "bg-blue-400 text-white"}
                    border-4 border-green-700 hover:scale-105 transform transition-all duration-300`}
      >
        <h1 className="text-3xl font-bold mb-6">Weather Dashboard</h1>
        <div className="w-full flex justify-center">
          <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeather} />
        </div>
        {searchHistory.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Recent Searches:</h2>
            <div className="flex gap-2 mt-2">
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  onClick={() => fetchWeather(item)}
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 text-black"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {loading && <p className="mt-4 text-lg font-semibold">Loading...</p>}
        {weather && <WeatherCard weather={weather} forecast={forecast} darkMode={darkMode} />}
        {weather && (
          <button
            onClick={() => fetchWeather(weather.name)}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Refresh Weather
          </button>
        )}
      </div>
    </div>
  );
};
export default Home;
