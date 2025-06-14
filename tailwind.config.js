/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-primary-text": "var(--color-primary-text)",
        "color-highlight": "var(--color-highlight)",
        "color-bg": "var(--color-bg)",
        "color-primary-bg": "var(--color-primary-bg)",
        "color-secondary-bg": "var(--color-secondary-bg)",
      },
      fontSize: {
        "xxs": '10px',
      }
    },
  },
  plugins: [],
}