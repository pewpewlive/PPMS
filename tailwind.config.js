/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      colors: {
        brand: {
          ppms: {
            gradient1: '#0d88f9',
            gradient2: '#2d55f0',
            gradient3: '#3e20e9',
          },
          pewpewsnippets: {
            gradient1: '#ff2492',
            gradient2: '#fe4569',
            gradient3: '#fb693b',
          },
        },
      },
    }

  },
  plugins: [],
}