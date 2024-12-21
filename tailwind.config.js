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
    container:{
      center:true,
      padding:{
        DEFAULT:'1rem',
        sm:'2rem',
        lg:"4rem",
        xl:'5rem',
        '2xl':'6rem'
      }
    }
    },
  },
  plugins: [],
}

