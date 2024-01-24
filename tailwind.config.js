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

    /*
    extend: {
      keyframes: {
        headShake: {
          "0%": { transform: "translateX(0)" },
          "6%": { transform: "translateX(-12px) rotateY(-9deg)" },
          "18%": { transform: "translateX(8px) rotateY(7deg)" },
          "24%": { transform: "translateX(-5px) rotateY(-7deg)" },
          "30%": { transform: "translateX(4px) rotateY(5deg)" },
          "38%": { transform: "translateX(-1px) rotateY(-5deg)" },
          "44%": { transform: "translateX(2px) rotateY(3deg)" },
          "50%": { transform: "translateX(0)" },
        },
      },
      animation: {
        headShake: "headShake 0.8s infinite",
      },
    
    },*/

    fontFamily: {
      Archivo: ["Archivo", "sans-serif"],
      Inter: ["Inter", "sans-serif"],
      Noto: ["Noto Sans", "sans-serif"],
      Nunito: ["Nunito Sans", "sans-serif"],
    },
  },
  plugins: [],
};
