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
      fontFamily:{
playfair:["playfair","Display","serif"]
      },
      colors:{
        secondary:'#ff8901',
        primary:"#0911eb"
      },
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

