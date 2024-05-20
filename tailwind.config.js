/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#082567",
        secondary: "#87ceeb",
        tertiary: "#F8F8BA",
        backgroundColor: "#F0F2F5",
      },
      backgroundImage: {
        background: "url('./src/assets/login.png')",
      },
    },
  },
  plugins: [],
};
