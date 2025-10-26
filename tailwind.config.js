/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-black': '#000000',
        'secondary-gray': '#86868B',
        'border-gray': '#AEAEB2',
        'accent-red': '#DC143C',
        'dark-bg': '#1D1D1F',
        'theme': 'var(--bg-fill-invert)',
        'theme-light': 'var(--bg-light-override)',
        'theme-border': 'var(--card-border-color)',
      },
      fontFamily: {
        'primary': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      screens: {
        'md': '768px',
        'lg': '1024px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }
    },
  },
  plugins: [],
}
