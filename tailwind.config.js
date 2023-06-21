import "@porsche-design-system/components-js/styles";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        heroImage: "url('src/assets/hero.jpg')",
      },
      colors: {
        hero: '#0c0e14',
        prompt: '#595959',
        bgcol: 'rgb(229, 231, 235)'
      },
    },
  },
  plugins: [],
}

