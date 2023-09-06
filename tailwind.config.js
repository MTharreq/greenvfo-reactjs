/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Plus Jakarta Sans'] 
      },
      colors: {
        'primary' : '#8EAC50',
        'secondary': '#808080',
        'blackFo' : '#343538',
        'redFo' : '#FF6C6C',
      }
    },
  },
  plugins: [],
}