/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [

    './src/**/*.{,js,jsx,ts,tsx}',  // Include any files in the src folder - means that tailwind will only look at the files in the src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}

