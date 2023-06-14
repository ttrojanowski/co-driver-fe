import "@porsche-design-system/components-js/styles";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundImage: {
      heroImage: "url('src/assets/hero.jpg')",
    },
    extend: {
      colors: {
        hero: '#0c0e14',
      },
    },
  },
  plugins: [],
}

