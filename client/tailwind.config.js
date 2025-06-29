/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Inter', 'sans-serif'],
      },
    },
  },
   plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
