/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'space-black': '#03060f',
        'deep-navy': '#050d2e',
        electric: '#1a6cf6',
        launch: '#ff5c1a',
        'mars-red': '#c1440e',
        rust: '#8b2500',
        dust: '#d4956a',
        glow: '#00d4ff',
        'star-white': '#e8eaf0',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        flicker: 'flicker 0.15s ease-in-out infinite alternate',
        waveflag: 'waveflag 2s ease-in-out infinite alternate',
        'scan-line': 'scanLine 2s linear infinite',
        'dust-drift': 'dustDrift 6s linear infinite',
        pulse_glow: 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%': { opacity: '0.8', transform: 'scaleY(1) scaleX(1)' },
          '100%': { opacity: '1', transform: 'scaleY(1.15) scaleX(0.92)' },
        },
        waveflag: {
          '0%': { transform: 'skewX(0deg) scaleX(1)' },
          '50%': { transform: 'skewX(-4deg) scaleX(1.02)' },
          '100%': { transform: 'skewX(3deg) scaleX(0.98)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        dustDrift: {
          '0%': { transform: 'translateX(-10%) translateY(0)', opacity: '0' },
          '20%': { opacity: '0.6' },
          '80%': { opacity: '0.4' },
          '100%': { transform: 'translateX(110%) translateY(-20%)', opacity: '0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(0, 212, 255, 0.4)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.8)' },
        },
      },
    },
  },
  plugins: [],
};
