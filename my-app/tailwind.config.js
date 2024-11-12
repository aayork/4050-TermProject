/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "monkey-white": "#FFFFF2",
        "monkey-beige": "#C0EBA6",
        "monkey-brown": "#c6a969",
        "monkey-green": "#166434",
        "monkey-yellow": "#FCCD2A",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#347928",

          secondary: "#222222",

          accent: "#FCCD2A",

          neutral: "#FFFFFF",

          "base-100": "#FFFFF2",

          info: "#0000ff",

          success: "#00ff00",

          warning: "#f59e0b",

          error: "#ff0000",
        },
      },
    ],
  },
  plugins: [daisyui],
};
