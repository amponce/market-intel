/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./app/**/*.{js,jsx,ts,tsx,vue,mdx}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-yellow": "#F6F1EB",
        "custom-green": "#9ff1e9",
        "custom-purple": "#6200EE",
        "custom-grey": "#D7E6D1",
        "custom-mint-green": "#D7E6D1",
        "custom-dark-teal": "#1d6169", // Replace with the color you want on hover
        "custom-purple-hover": "#9a76d1", // Replace with the color you want on hover
        "custom-button-yellow": "#FFD687",
        "custom-button-coral": "#F1BAA1",
        "custom-button-teal": "#B2DFEF",
        "custom-button-light-teal": "#D7E6D1",
        "custom-button-purple": "#CFC7FF",
        "custom-button-green": "#DEECC5",
        "custom-button-tan": "#E5D5BF",
        "custom-button-warm-gray": "#97999B",
        "custom-button-royal-blue": "#4876FF",
        "custom-button-mushroom": "#CBC0B7",
        "custom-button-light-green": "#D8F6E0",
        "custom-button-cream-orange": "#FFD687",
        "custom-button-light-pink": "#F1D2D6",
      },
      colors: {
        "custom-mint-green": "#D7E6D1",
      },
      lineClamp: {
        2: "2",
        3: "3",
        // ...
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "h1, h2, h3, h4, h5, h6": {
              fontFamily: "'Filson Pro', sans-serif",
            },
          },
        },
      }),
      fontFamily: {
        "filson-pro": ["Filson Pro", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography", "@tailwindcss/forms")],
};
