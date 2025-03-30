import { useState, useEffect } from "react";

const SearchBar = ({ city, setCity, fetchWeather }) => {
  const [history, setHistory] = useState([]);

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    setHistory(savedHistory);
  }, []);

  const handleSearch = () => {
    fetchWeather();

    // Update search history
    const updatedHistory = [city, ...history.filter((c) => c !== city)].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem("weatherHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center w-full">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="p-3 w-3/4 rounded-lg shadow-md text-black placeholder-white border-2 border-black bg-white"
        />
        <button onClick={handleSearch} className="ml-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800">
          Search
        </button>
      </div>

      {/* Recent Searches */}
      <div className="mt-3 flex gap-2">
        {history.map((item, index) => (
          <button
            key={index}
            className="px-3 py-1 bg-gray-200 text-black rounded-md hover:bg-gray-300"
            onClick={() => setCity(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
