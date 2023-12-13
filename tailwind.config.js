/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      Archivo: ["Archivo", "sans-serif"],
      Inter: ["Inter", "sans-serif"],
      Noto: ["Noto Sans", "sans-serif"],
      Nunito: ["Nunito Sans", "sans-serif"],
    },
  },
  plugins: [],
};
