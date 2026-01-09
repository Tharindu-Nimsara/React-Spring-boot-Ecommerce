/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e293b', // Deep Slate Blue
          dark: '#0f172a',
        },
        accent: {
          DEFAULT: '#f97316', // Signal Orange
          blue: '#3b82f6', // Metallic Blue
        },
        background: '#f9fafb',
      },
    },
  },
  plugins: [],
}

