/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        "gray-350" : "#ebebeb",
        "gray-450" : "#999",
        "gray-550": "#555555",
        "gray-650": "#666",
        
        "slate-850" : "#253237",
        "slate-955": '#3a3a3a',
        "orange-450": '#f58220',
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
