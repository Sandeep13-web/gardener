/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {},
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#00AE4D",
          secondary: "#87dd40",
          accent: "#F58220",
          neutral: "#25192e",
          "base-100": "#fff",
          info: "#4184e1",
          success: "#0c5a34",
          warning: "#edc95e",
          error: "#f2503a",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
