/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "monkey-white": "#ffffec",
        "monkey-beige": "#f1e4c3",
        "monkey-brown": "#c6a969",
        "monkey-green": "#597e52",
        "monkey-yellow": "#ffe135",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#597e52",

          secondary: "#c6a969",

          accent: "#ffe135",

          neutral: "#f1e4c3",

          "base-100": "#ffffec",

          info: "#0000ff",

          success: "#00ff00",

          warning: "#f59e0b",

          error: "#ff0000",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
