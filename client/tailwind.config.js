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
          blue: '#000000', // Changed to black for monochrome theme
          gray: '#F5F5F7',
          dark: '#000000', // Deep black
          lightBlue: '#333333', // Dark gray for hover states
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.07)',
        'glow': '0 0 20px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      }
    }
  },
  plugins: [],
}
