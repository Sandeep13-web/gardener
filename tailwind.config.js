/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dangerColor: '#FF0000',
        active: '#A9CDB3',
        lighestBackground: '#F0F4F2',
        primaryText: '#04290F',
        lightBackground: '#F8FAF9',
        positive: '#10B981',
        negative: '#F0950C',
        lightGray: '#B3B3B3',
        grayBorder: '#C8D0CC',
        textGray: '#9B9B9B',
        placeholder: '#64748B',
        borderColor: '#D9D9D9',
        badgeBorder: '#E2E8F0',
        activeBlue: '#4B4EDC',
      },
      fontFamily: {
        lato: ['Lato'],
      },
    },
  },
  plugins: [],
};
