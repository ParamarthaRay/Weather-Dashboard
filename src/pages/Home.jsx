import { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ThemeToggle from "../components/ThemeToggle";
const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = "572c25b0f2764c0c7e701daae0c76e42"; 
  const fetchWeather = async () => {
    if (!city) return;
  
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},IN&units=metric&appid=${API_KEY}`
      );
  
      if (response.data.cod !== 200) {
        throw new Error(response.data.message);  
      }
  
      setWeather(response.data);
      setError("");
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      setError("City not found. Please try valid name.");
      setWeather(null);
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
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {weather && <WeatherCard weather={weather} darkMode={darkMode} />}
      </div>
    </div>
  );
};
export default Home;
