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
        'bg-dark': '#141414',
      },
      fontFamily: {
        lato: ['Lato'],
      },
    },
  },
  plugins: [],
};
