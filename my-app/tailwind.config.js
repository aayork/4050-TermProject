/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "monkey-white": "#FFFBE6",
        "monkey-beige": "#C0EBA6",
        "monkey-brown": "#c6a969",
        "monkey-green": "#347928",
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

          neutral: "#222222",

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
