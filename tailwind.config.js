/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textColor: {
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        accentHover: 'var(--accent-hover)',
        dark: 'var(--dark)',
        darkGray: 'var(--dark-gray)',
        lightGray: 'var(--light-gray)',
      },
      backgroundColor: {
        dark: 'var(--dark)',
      },
    },
  },
  plugins: [],
}
