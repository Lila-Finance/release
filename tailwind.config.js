/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1850px",
      },
      colors: {
        themeColor: "#FFC9C9",
      },
    },
  },
  plugins: [],
};
