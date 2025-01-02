/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:{
          100: '#F0F0E4',
          200: '#C2C2A3',
          300: '#A3A380',
          400: '#858566',
          500: '#66664D',
          600: '#4D4D33',
          700: '#3F3F2E',
          800: '#333326',
          900: '#26261A',
          950: '#030836',
        },
        secondary: {
          100: '#E2E2D5',
          200: '#888883',
      },
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
      
    },
  },
  plugins: [],
}