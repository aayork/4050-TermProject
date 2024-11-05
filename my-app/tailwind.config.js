/** @type {import('tailwindcss').Config} */
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
      screens: {
        xs: "490px",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#166434",

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
  plugins: [require("daisyui")],
};
