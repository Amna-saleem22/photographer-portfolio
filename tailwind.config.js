/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0A",
          50: "#F5F5F5",
          100: "#E5E5E5",
          200: "#CCCCCC",
          300: "#A3A3A3",
          400: "#737373",
          500: "#525252",
          600: "#404040",
          700: "#262626",
          800: "#171717",
          900: "#0A0A0A",
        },
        bone: {
          DEFAULT: "#F5F2ED",
          50: "#FCFBF9",
          100: "#F5F2ED",
          200: "#EDE8E0",
          300: "#DCD4C8",
        },
        champagne: "#C9B99A",
        charcoal: "#1C1C1C",
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        sans: ['"Inter"', "sans-serif"],
      },
      letterSpacing: {
        tightest: "-.075em",
        tighter: "-.05em",
        tight: "-.025em",
        normal: "0",
        wide: ".025em",
        wider: ".05em",
        widest: ".25em",
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
        1200: "1200ms",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-down": "fadeDown 0.8s ease-out forwards",
        "fade-left": "fadeLeft 0.8s ease-out forwards",
        "fade-right": "fadeRight 0.8s ease-out forwards",
        "zoom-in": "zoomIn 1.2s ease-out forwards",
        "slow-zoom": "slowZoom 8s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        zoomIn: {
          "0%": { opacity: "0", transform: "scale(1.05)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slowZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
      },
    },
  },
  plugins: [],
};