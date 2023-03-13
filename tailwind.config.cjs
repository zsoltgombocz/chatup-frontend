/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'logo': ['Black Ops One', 'sans'],
        'pridi': ['Pridi', 'sans'],
        'cabin': ['Cabin Condensed', 'sans'],
      },
      borderRadius: {
        'xl': '25px',
      },
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        'primary': {
          blue: {
            light: '#77BFC9',
            DEFAULT: '#34ACBC',
            dark: '#278591'
          },
          red: {
            light: '#F16158',
            DEFAULT: '#A91B12',
            dark: '#87130c'
          },
        },
        gray: {
          200: '#DBDBDB',
          300: '#626262',
          400: '#474747',
          500: '#3B3B3B',
          600: '#393939',
        },
        'bg-light-inner': '#DBDBDB',
        'bg-light-outer': '#FFFFFF',
        'bg-dark-inner': '#282C2D',
        'bg-dark-outer': '#3B3B3B',
        'status-red': '#B03737',
        'status-orange': '#B08E37',
        'status-green': '#24FF00',
        'toast-green': '#24FF00',
        'toast-red': '#B03737',
      }
    },
  },
  plugins: [],
}