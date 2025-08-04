/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        islamic: {
          primary: '#059669',
          secondary: '#D97706',
          accent: '#0D9488',
          dark: '#064E3B',
          light: '#F0FDF4'
        }
      },
      fontFamily: {
        arabic: ['Amiri', 'serif'],
      }
    },
  },
  plugins: [],
}