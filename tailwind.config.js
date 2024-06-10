/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'palatte-notes' : '#F7ECDC',
        'palatte-others' : '#E8E8E8'
      }
    },
  },
  plugins: [],
}

