/* eslint-disable no-undef */
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
        'dark-gray': 'var(--dark-gray)',
        'light-ray': 'var(--light-gray)',
      },
      backgroundColor: {
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        dark: 'var(--dark)',
      },
      fontSize: {
        'fluid-btn': 'clamp(.6rem, calc(.6rem + 0.5vw), 1.2rem)',
        'fluid-base': 'clamp(.8rem, calc(.8rem + 0.5vw), 1.2rem)',
        'fluid-title': 'clamp(1.2rem, calc(1.2rem + 4vw), 4.5rem)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar'), require('tailwind-scrollbar-hide')],
}
