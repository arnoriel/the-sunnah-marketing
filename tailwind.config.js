/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        syne: ['"Plus Jakarta Sans"', 'sans-serif'],
        dm: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        dark: {
          900: '#050507',
          800: '#0a0a0f',
          700: '#0f0f18',
          600: '#13131f',
          500: '#1a1a2e',
        },
        accent: {
          blue: '#1a6bff',
          cyan: '#00c6ff',
          light: '#4d8bff',
        },
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}