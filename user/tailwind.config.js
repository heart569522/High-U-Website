/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // using ./src/ dir
    "./src/**/*.{js,ts,jsx,tsx}",
    // using ./ dir
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // add more paths here
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}