/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  mode: 'jit',
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
      colors: {
        'pr-red': {
          light: '#F16158',
          DEFAULT: '#A91B12',
        },
        'pr-blue': {
          light: '#77BFC9',
          DEFAULT: '#34ACBC',
        },
        'pr-green': {
          light: '#8AF1B9',
          DEFAULT: '#42AB73'
        },
        gray: {
          300: '#626262',
          400: '#474747',
          500: '#3B3B3B',
          600: '#393939',
        },
        'bg-light-inner': '#DBDBDB',
        'bg-light-outer': '#FFFFFF',
        'bg-dark-inner': '#282C2D',
        'bg-dark-outer': '#3B3B3B',
      },
      borderRadius: {
        'xl': '25px',
      }
    },
  },
  plugins: [],
}