/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        text: "#555555",
      },
      container: {
        // margin: {
        //   sm: "1rem",
        //   md: "4rem",
        // },
        padding: {
          sm: "1rem",
          md: "4rem",
        },
      },
      screens: {
        xxs: "490px",
        xs: "640px",
        sm: "768px",
        md: "975px",
      },
    },
  },
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
          error: "red",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
