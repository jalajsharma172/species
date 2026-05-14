/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        turmeric: '#D8A700',
        chilli: '#9B1C14',
        burnt: '#B65A18',
        beige: '#E6D7C3',
        matte: '#0B0A09',
        earth: '#2E1F16'
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
