/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      purple: '#3f3cbb',
      midnight: '#121063',
      metal: '#565584',
      tahiti: '#3ab7bf',
      silver: '#ecebff',
      bermuda: '#78dcca',
      blue: '#11376b',
      gray: '#f7f7f7',
      black: '#000000',
      red: '#ef2828',
    },
    extend: {
      height: {
        content: 'calc(100vh - 4rem)',
      },
    },
  },
  plugins: [],
};
