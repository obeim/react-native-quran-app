/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        HelveticaLight: ["HelveticaNeueLTArabic-Light"],
        HelveticaBold: ["HelveticaNeueLTArabic-Bold"],
        HelveticaRoman: ["HelveticaNeueLTArabic-Roman"],
      },
      colors: {
        primary: "#544981",
      },
    },
  },
  plugins: [],
};
