/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 👈 necessário para toggle via classe
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}