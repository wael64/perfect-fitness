/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Work Sans', 'Segoe UI', 'Roboto', 'sans-serif'],
    },
    extend: {
      fontSize: {
        lg: [
          {
            lineHeight: '1.2',
          },
        ],
        xl: [
          {
            lineHeight: '1.2',
          },
        ],
        '2xl': [
          {
            lineHeight: '1.2',
          },
        ],
        '3xl': [
          {
            lineHeight: '1.2',
          },
        ],
        '4xl': [
          {
            lineHeight: '1.1',
          },
        ],
        '5xl': [
          {
            lineHeight: '1.1',
          },
        ],
        '6xl': [
          {
            lineHeight: '1.1',
          },
        ],
        '7xl': [
          {
            lineHeight: '1.1',
          },
        ],
        '8xl': [
          {
            lineHeight: '1.1',
          },
        ],
        '9xl': [
          {
            lineHeight: '1.1',
          },
        ],
      },
      colors: {
        primary: '#A9FE86',
        secondary: {
          dark: '#151A28',
          light: '#212940',
          lighter: '#262F4A',
          transparent: '#151A28e0',
        },
      },
    },
    screens: {
      spc: '0px',
      xxs: '280px',
      xs: '400px',
      sm: '600px',
      md: '900px',
      lg: '1280px',
      xl: '1500px',
      '2xl': '2000px',
    },
  },
  plugins: [
    function ({ addVariant, addUtilities }) {
      addVariant('child', '& > *')
      addUtilities({
        '.verticle-ellipsis-three': {
          display: '-webkit-box',
          '-webkit-line-clamp': '3',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
      })
      // addVariant('first-line', '&::first-line')
      // addVariant('child-hover', '& > *:hover');
    },
  ],
}
