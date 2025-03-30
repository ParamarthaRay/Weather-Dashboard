import { WiMoonAltWaningCrescent5, WiDaySunny } from "react-icons/wi";
const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`fixed top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg shadow-md font-semibold transition-all duration-300
                  ${darkMode ? "bg-orange-600 text-black" : "bg-blue-400 text-white"}
                  hover:scale-105 transform`} >
      {darkMode ? <WiDaySunny className="text-yellow-400 text-2xl" /> : <WiMoonAltWaningCrescent5 className="text-gray-300 text-2xl" />}
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};
export default ThemeToggle;
