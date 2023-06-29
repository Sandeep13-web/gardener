/* @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        container: {
            center: true,
        },
        extend: {
            colors: {
                "gray-150": "#eeeeee",
                "gray-250": "#8f8f8f",
                "gray-350": "#ebebeb",
                "gray-450": "#999",
                "gray-550": "#555555",
                "gray-650": "#666",
                "gray-750": "#888",
                "gray-850": "#77777a",
                "gray-950": "#e8e8e8",
                "zinc-250": '#454545',
                "zinc-450": '#c1c1c1',
                "slate-150": '#f6f6f6',
                "slate-250": '#f9f9f9',
                "slate-850": "#253237",
                "slate-955": '#3a3a3a',
                "orange-250": '#e57615',
                "orange-450": '#f58220',
                "red-250": '#cf2929',
                "darkBlack": '#253237'
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
        themes: [{
            mytheme: {
                primary: "#00AE4D",
                secondary: "#87dd40",
                accent: "#F58220",
                neutral: "#25192e",
                "base-100": "#fff",
                info: "#4184e1",
                success: "#0c5a34",
                warning: "#edc95e",
                error: "#dc3545",
                tertiary: '#f2f2f2',
            },
        }, ],
    },
    plugins: [require("daisyui")],
};