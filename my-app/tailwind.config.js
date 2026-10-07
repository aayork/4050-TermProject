/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "monkey-white": "#FAF9F6",
        "monkey-beige": "#E3EDD9",
        "monkey-brown": "#B8975A",
        "monkey-green": "#1F4D36",
        "monkey-yellow": "#F2C14E",
        "monkey-ink": "#1B231E",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        borderColor: {
          border: "hsl(var(--border))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        serif: ["Lora", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      screens: {
        xs: "490px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        "2xl": "1536px",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1F4D36",
          "primary-content": "#FAF9F6",
          secondary: "#1B231E",
          "secondary-content": "#FAF9F6",
          accent: "#F2C14E",
          "accent-content": "#1B231E",
          neutral: "#FFFFFF",
          "neutral-content": "#1B231E",
          "base-100": "#FAF9F6",
          "base-200": "#F1EDE0",
          "base-300": "#E6E1D3",
          "base-content": "#1B231E",
          info: "#3B6E9E",
          success: "#2F7D4F",
          warning: "#E0A526",
          error: "#B42318",
          "--rounded-box": "1rem",
          "--rounded-btn": "0.6rem",
          "--rounded-badge": "999px",
          "--btn-focus-scale": "0.98",
          "--tab-radius": "0.6rem",
        },
      },
    ],
  },
  plugins: [daisyui, "tailwindcss-animate"],
};
