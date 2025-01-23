/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/*.js', './src/pages/*.js'],
  theme: {
    extend: {
      colors: {
        'green-trybe': 'RGB(23, 169, 112)',
      },
    },
  },
  plugins: [],
};
