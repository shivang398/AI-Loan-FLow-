/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#EEF2FF',
          100: '#C7D2F8',
          200: '#96ADEF',
          300: '#6488E6',
          400: '#4A6FD4',
          500: '#0B2DA4',
          600: '#0A1E6E',
          700: '#071550',
          800: '#050F3D',
          900: '#030A2A',
        },
        'rm-blue':       '#0B2DA4',
        'rm-red':        '#CC1A1A',
        'rm-navy':       '#0A1E6E',
        'brand-navy':    '#0A1E6E',
        'brand-red':     '#CC1A1A',
        'brand-success': '#1A7A4A',
        'brand-bg':      '#F5F7FC',
        'brand-dark':    '#0A1E6E',
        'brand-muted':   '#7A8FB0',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
