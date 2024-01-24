/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        headShake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": {
            transform: "translateX(-12px) rotateY(-9deg)",
          },
          "20%, 40%, 60%, 80%": { transform: "translateX(8px) rotateY(7deg)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        headShake: "headShake 0.7s ease-in-out",
      },
    },

    fontFamily: {
      Archivo: ["Archivo", "sans-serif"],
      Inter: ["Inter", "sans-serif"],
      Noto: ["Noto Sans", "sans-serif"],
      Nunito: ["Nunito Sans", "sans-serif"],
    },
  },
  plugins: [],
};
