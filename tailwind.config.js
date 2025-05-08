/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#eef2ff',
            100: '#e0e7ff',
            200: '#c7d2fe',
            300: '#a5b4fc',
            400: '#818cf8',
            500: '#6366f1',
            600: '#4f46e5',
            700: '#4338ca',
            800: '#3730a3',
            900: '#312e81',
          },
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in-out',
          'slide-up': 'slideUp 0.5s ease-out',
          'slide-down': 'slideDown 0.5s ease-out',
          'slide-in-right': 'slideInRight 0.5s ease-out',
          'slide-in-left': 'slideInLeft 0.5s ease-out',
          'bounce-slow': 'bounce 3s infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: 0 },
            '100%': { transform: 'translateY(0)', opacity: 1 },
          },
          slideDown: {
            '0%': { transform: 'translateY(-20px)', opacity: 0 },
            '100%': { transform: 'translateY(0)', opacity: 1 },
          },
          slideInRight: {
            '0%': { transform: 'translateX(20px)', opacity: 0 },
            '100%': { transform: 'translateX(0)', opacity: 1 },
          },
          slideInLeft: {
            '0%': { transform: 'translateX(-20px)', opacity: 0 },
            '100%': { transform: 'translateX(0)', opacity: 1 },
          },
        },
      },
    },
    plugins: [],
    darkMode: 'class', // Changed to 'class' to support manual toggling
  }