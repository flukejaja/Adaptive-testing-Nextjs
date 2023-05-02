const withMT = require("@material-tailwind/react/utils/withMT");
const { fontFamily } = require('tailwindcss/defaultTheme');
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'laptop': '1440px',
      },
      colors: {
        white: '#ffffff',
      },
      fontFamily: {
        akshar:['Akshar',...fontFamily.sans],
        kanit:['Kanit' ,...fontFamily.sans],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
})
