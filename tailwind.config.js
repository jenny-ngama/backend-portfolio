/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.pug" 
  ],
  theme: {
    extend: {
      colors: {
        'redColor': '#051433',
        'secondary-blue': '#00194C',
        'sky-blue': '#0055ff',
        "btn-color": '#003366',
      },
      screens : {
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1386px"
      },
      backgroundImage: {
        'bg_gray': "url('/images/bg-icon-gray.jpg')",
      },
    },
  },
  plugins: [],
}

