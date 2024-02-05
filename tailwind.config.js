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
      screens: {
        xxs: { max: "359px" },
        // => @media (max-width: 359px) { ... }

        xs: { min: "360px", max: "474px" },
        // => @media (min-width: 360px) and (max-width: 474px) { ... }

        sm: { min: "475px", max: "639px" },
        // => @media (min-width: 475px) and (max-width: 639px) { ... }

        md: { min: "640px", max: "767px" },
        // => @media (min-width: 640px) and (max-width: 767px) { ... }

        lg: { min: "768px", max: "1023px" },
        // => @media (min-width: 768px) and (max-width: 1023px) { ... }

        xl: { min: "1024px", max: "1279px" },
        // => @media (min-width: 1024px) and (max-width: 1279px) { ... }

        "2xl": { min: "1280px", max: "1535px" },
        // => @media (min-width: 1280px) and (max-width: 1535px) { ... }
      },
    },

    fontFamily: {
      Archivo: ["Archivo", "sans-serif"],
      Inter: ["Inter", "sans-serif"],
      Noto: ["Noto Sans", "sans-serif"],
      Nunito: ["Nunito Sans", "sans-serif"],
      Libre: ["Libre Baskerville", "serif"],
      Lora: ["Lora", "serif"],
      Playfair: ["Playfair", "serif"],
    },
  },
  plugins: [],
};
