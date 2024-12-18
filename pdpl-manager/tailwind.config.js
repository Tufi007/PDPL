/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    
    extend: {colors: {
      primary: {
        DEFAULT: "var(--color-button-primary)",
        light: "var(--color-button-light)",
      },
      gray: {
        background: "var(--color-background)",
        sidebar: "var(--color-sidebar)",
        text: "var(--color-text-primary)",
      }},
  }},
  plugins: [],
}

