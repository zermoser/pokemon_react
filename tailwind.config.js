/** @type {import('tailwindcss').Config} */
export default {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          grass: '#78C850',
          poison: '#A040A0',
          fire: '#F08030',
          water: '#6890F0',
          flying: '#A890F0',
          bug: '#A8B820',
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  };
  