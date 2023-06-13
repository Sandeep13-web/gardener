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
        primary: '#E5002B',
        secondary: '#6c757d',
        violet: '#883677',
        congo: '##FF958C',
        success: '#198754',
        warning: '#FFA600',
        danger: '#dc3545',
        dark: '#212529',
        info: '#1CA7EC',
        black: '#2E3A44',
        grey1: '#A0AABF',
        grey2: '#C0C6D4',
        grey3: '#E3E8F1',
        light: '#F9FBFC',
        white: '#FFF',
        'bg-dark': '#141414',
      },
      fontFamily: {
        lato: ['Lato'],
      },
    },
  },
  plugins: [],
};
