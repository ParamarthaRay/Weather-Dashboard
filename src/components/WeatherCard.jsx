import { WiDaySunny, WiMoonAltWaxingCrescent4, WiSunset } from "react-icons/wi";

const WeatherCard = ({ weather }) => {
  const { name, main, weather: weatherInfo, wind, sys } = weather;
  const weatherCondition = weatherInfo[0].main;
  const weatherIcon = `http://openweathermap.org/img/wn/${weatherInfo[0].icon}@2x.png`;

  const currentTime = new Date((weather.dt + weather.timezone) * 1000).getUTCHours();

  const sunriseTime = new Date((sys.sunrise + weather.timezone) * 1000).getUTCHours();
  const sunsetTime = new Date((sys.sunset + weather.timezone) * 1000).getUTCHours();

  let timeOfDayIcon;
  if (currentTime >= sunriseTime && currentTime < sunsetTime - 2) {
    timeOfDayIcon = <WiDaySunny className="text-yellow-500 text-6xl" />;
  } else if (currentTime >= sunsetTime - 2 && currentTime <= sunsetTime + 2) {
    timeOfDayIcon = <WiSunset className="text-orange-500 text-6xl" />;
  } else {
    timeOfDayIcon = <WiMoonAltWaxingCrescent4 className="text-blue-500 text-6xl" />;
  }
  return (
    <div
      className="flex flex-col items-center justify-center w-96 p-6 mt-6 rounded-lg shadow-lg transition-all duration-500
                 bg-rose-300 text-black border-4 border-aquagreen-400 m-4 hover:scale-105 transform"
    >
      <h2 className="text-2xl font-bold">{name}</h2>
      {timeOfDayIcon}
      <img src={weatherIcon} alt={weatherCondition} className="w-16 h-16" />
      
      <p className="text-xl">{weatherCondition}</p>
      <p className="text-4xl font-semibold">{main.temp}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind Speed: {wind.speed} km/h</p>
    </div>
  );
};

export default WeatherCard;
