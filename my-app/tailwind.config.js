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
      },
    },
  },
  plugins: [require("daisyui")],
};
