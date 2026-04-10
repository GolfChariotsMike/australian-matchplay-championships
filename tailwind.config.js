/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        bowls: {
          green: '#1a4731',
          'green-dark': '#0f2d1e',
          'green-mid': '#1e5c3a',
          'green-light': '#2d7a52',
          gold: '#c9a227',
          'gold-light': '#e8c244',
          'gold-dark': '#9e7d1a',
          cream: '#faf8f2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Georgia', 'serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/bowls-bg.jpg')",
      }
    },
  },
  plugins: [],
}
