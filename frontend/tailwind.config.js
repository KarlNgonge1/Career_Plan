/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0b0b",        // main background (deep black)
        surface: "#141414",   // slightly lighter panels
        accent: "#e50914",    // Netflix-red accent
        text: "#f5f5f5",      // default text
        subtle: "#aaaaaa",    // secondary text
      },
    },
  },
  plugins: [],
}

