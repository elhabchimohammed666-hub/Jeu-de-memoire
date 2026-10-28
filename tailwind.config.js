/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#101412",
        panel: "#191f1c",
        mint: "#b9f4d0",
      },
      boxShadow: {
        glow: "0 0 32px rgba(185, 244, 208, 0.1)",
      },
    },
  },
  plugins: [],
};
