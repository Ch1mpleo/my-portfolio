/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#000000',
          text: '#00ff00',
          prompt: '#3b82f6',
          secondary: '#00cc00',
        },
      },
    },
  },
}

