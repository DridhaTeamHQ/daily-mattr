/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed',
        secondary: '#a855f7',
        accent: '#c084fc',
        purple: {
          300: '#c084fc',
          400: '#a855f7',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6b21a8',
          800: '#581c87',
          900: '#4c1d95',
        },
        dark: '#0a0118',
        'dark-secondary': '#1a0f2e',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'liquid': 'liquid 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        liquid: {
          '0%, 100%': { 
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' 
          },
          '50%': { 
            borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' 
          },
        }
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
    },
  },
  plugins: [],
}

