const SearchBar = ({ city, setCity, fetchWeather }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="p-3 w-3/4 rounded-lg shadow-md text-black placeholder-gray-600 border-4 border-teal-400 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
      />
      <button
        onClick={fetchWeather}
        className="ml-2 px-5 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 border-2 border-teal-400"
      >
        Search
      </button>
    </div>
  );
};
export default SearchBar;
