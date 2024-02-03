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
        UthmanicHafs: ["UthmanicHafs"],
      },
      colors: {
        primary: "#544981", // light mode text color
        secondary: "#2D264B",
        lotion: "#F5F4F4", // light mode card bg
        lightGray: "#FBFBFB",
        darkGray: "#505050",
        primaryDark: "#FAF0E6", // dark mode text color
        blackCoral: "#292630", //dark mode card bg
        darkBg: "#34303D",
      },
    },
  },
  plugins: [],
};
