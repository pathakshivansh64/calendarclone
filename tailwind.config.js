/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#d4e4ff',
          200: '#a8c8ff',
          300: '#7dadff',
          400: '#5191ff',
          500: '#2576ff',
          600: '#1e5ecc',
          700: '#164799',
          800: '#0f2f66',
          900: '#071833'
        },
        secondary: {
          100: '#fae8ff',
          200: '#f5d0ff',
          300: '#f0b9ff',
          400: '#eba1ff',
          500: '#e68aff',
          600: '#b86ecc',
          700: '#8a5399',
          800: '#5c3766',
          900: '#2e1c33'
        },
      },
    },
  },
  plugins: [],
}