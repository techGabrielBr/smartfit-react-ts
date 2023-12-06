/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'dark-grey': '#333333',
      'light-grey': '#808080',
      'yellow': '#FFB612',
      'red': '#dc0a17',
      'green': '#2FC022',
      'white': '#fff',
      'black': '#000'
    },
    extend: {
      fontFamily: {
        gothamBlack: ["gotham-black", "sans-serif"],
        gothamBold: ["gotham-bold", "sans-serif"],
        gothamBook: ["gotham-book", "sans-serif"],
        gothamLight: ["gotham-light", "sans-serif"]
      }
    },
  },
  plugins: [],
}

