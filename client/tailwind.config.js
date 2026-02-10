/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Manual toggle
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Closest to San Francisco
      },
      colors: {
        apple: {
          blue: '#007AFF',
          lightBlue: '#0A84FF',
          gray: '#F5F5F7',
          dark: '#1C1C1E',
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glow': '0 0 20px rgba(0, 122, 255, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      }
    }
  },
  plugins: [],
}
