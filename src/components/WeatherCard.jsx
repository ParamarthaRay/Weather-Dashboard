import { WiDaySunny, WiMoonAltWaxingCrescent4, WiSunset } from "react-icons/wi";

const WeatherCard = ({ weather, forecast }) => {
  const { name, main, weather: weatherInfo, wind, sys, dt, timezone } = weather;
  const weatherCondition = weatherInfo[0].main;
  const weatherIcon = `http://openweathermap.org/img/wn/${weatherInfo[0].icon}@2x.png`;

  const currentTime = new Date((dt + timezone) * 1000).getUTCHours();
  const sunriseTime = new Date((sys.sunrise + timezone) * 1000).getUTCHours();
  const sunsetTime = new Date((sys.sunset + timezone) * 1000).getUTCHours();

  let timeOfDayIcon;
  if (currentTime >= sunriseTime && currentTime < sunsetTime - 2) {
    timeOfDayIcon = <WiDaySunny className="text-yellow-500 text-6xl" />;
  } else if (currentTime >= sunsetTime - 2 && currentTime <= sunsetTime + 2) {
    timeOfDayIcon = <WiSunset className="text-orange-500 text-6xl" />;
  } else {
    timeOfDayIcon = <WiMoonAltWaxingCrescent4 className="text-blue-500 text-6xl" />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-96 p-6 mt-6 rounded-lg shadow-lg 
                    bg-rose-200 text-black border-4 border-aquagreen-400 m-4 
                    hover:scale-105 transform transition-all duration-300">
      <h2 className="text-2xl font-bold">{name}</h2>
      {timeOfDayIcon}
      <img src={weatherIcon} alt={weatherCondition} className="w-16 h-16" />
      
      <p className="text-xl">{weatherCondition}</p>
      <p className="text-4xl font-semibold">{main.temp}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind Speed: {wind.speed} km/h</p>

      {/* 5-Day Forecast Section */}
      {forecast && (
        <div className="mt-6 w-full">
          <h3 className="text-lg font-semibold mb-2 text-center">5-Day Forecast</h3>
          <div className="flex justify-center items-center gap-4 flex-wrap w-full">
            {forecast.map((day, index) => (
              <div key={index} className="flex flex-col items-center w-20 text-center">
                <p className="text-sm font-medium">{new Date(day.dt_txt).toLocaleDateString()}</p>
                <img 
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} 
                  alt="Forecast Icon" 
                  className="w-12 h-12"
                />
                <p className="text-sm">{Math.round(day.main.temp)}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
