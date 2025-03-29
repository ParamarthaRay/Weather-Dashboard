/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables dark mode with class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: "#f5f5dc", // Hex code for beige
      },
    }
  },
  plugins: [],
};
