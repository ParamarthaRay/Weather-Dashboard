import { useState, useEffect } from "react";
const SearchBar = ({ city, setCity, fetchWeather }) => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    setHistory(savedHistory);
  }, []);
  const handleSearch = () => {
    if (!city.trim()) return; 
    fetchWeather();
    const updatedHistory = [city, ...history].filter(
      (c, index, self) => self.indexOf(c) === index
    ).slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem("weatherHistory", JSON.stringify(updatedHistory));
  };
  return (
    <div className="flex items-center w-full">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="p-3 w-3/4 rounded-lg shadow-md text-black placeholder-gray-600 border-2 border-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        onClick={handleSearch} 
        className="ml-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
      >
        Search
      </button>
    </div>
  );
};
export default SearchBar;
