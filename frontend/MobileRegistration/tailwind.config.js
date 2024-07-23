/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
      extend: {
          colors: {
              primary: "#3949AB",
              textGray: "#4A5568",
              bgLight: "#F7FAFC",
          },
          fontFamily: {
              sans: ["Lato", "sans-serif"],
          },
      },
  },
  plugins: [],
};
