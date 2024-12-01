/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html"
  ],
  theme: {
    extend: { 
      colors: {
        navy: {
          50: '#f5f8fc',   // Very light navy tint
          100: '#e2eaf5',  // Light navy tint
          200: '#c1cde4',  // Soft light navy
          300: '#97a8d0',  // Muted navy
          400: '#5973b3',  // Mid navy
          500: '#2f4a91',  // Base navy
          600: '#253875',  // Dark navy
          700: '#1b2958',  // Deeper navy
          800: '#131d40',  // Very dark navy
          900: '#0c1229',  // Near-black navy
        },
      },
      animation: {
        shine: 'shine 2min linear infinite',
      },
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
      },
    },
  },
  plugins: [],
}

