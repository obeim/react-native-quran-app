/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        HelveticaLight: ["HelveticaNeueLTArabic-Light"],
        HelveticaBold: ["HelveticaNeueLTArabic-Bold"],
        HelveticaRoman: ["HelveticaNeueLTArabic-Roman"],
        HafsSmart: ["HafsSmart"],
      },
      colors: {
        primary: "#544981",
        secondary: "#2D264B",
        lotion: "#F5F4F4",
        lightGray: "#FBFBFB",
        darkGray: "#505050",
      },
    },
  },
  plugins: [],
};
