/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Remove or comment out darkMode to disable dark mode
  // darkMode: 'class', // Remove this line
  theme: {
    extend: {
      colors:{
        primary:{
          100: '#F0F0E4', // Lightest - good for backgrounds
          200: '#C2C2A3',
          300: '#A3A380',
          400: '#858566',
          500: '#66664D', // Medium - good for text
          600: '#4D4D33',
          700: '#3F3F2E',
          800: '#333326', // Darker - good for headings
          900: '#26261A', // Darkest - good for strong text
          950: '#030836', // Very dark blue accent
        },
        secondary: {
          100: '#E2E2D5', // Light secondary background
          200: '#888883', // Medium secondary for text
        },
      },
      fontFamily: {
        'sans': [ "Exo", 'sans-serif'],
      },
      container:{
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
      animation: {
        "border-shine": "shine 1s ease-out",
      },
      keyframes: {
        shine: {
          "0%": { borderColor: "transparent" },
          "50%": { borderColor: "#3b82f6" }, // Using a proper color value
          "100%": { borderColor: "transparent" },
        },
      },
      spacing: {
        "perspective": "1000px",
      },
    },
  },
  plugins: [],
}