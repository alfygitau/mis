/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        oldGod: "#B9B436",
        taupe: "#413324",
        skyBlue: "#94C9E2",
      },
      screens: { sm: { max: "840px" } },
    },
  },
  plugins: [],
};
