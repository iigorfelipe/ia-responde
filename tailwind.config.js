/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#7B00C7',
        secondary: '#F7EEFB',
        background: '#F4F7FA',
        border: '#808080',
      },
    },
  },
  plugins: [],
};
