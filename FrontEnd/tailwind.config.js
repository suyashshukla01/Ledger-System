/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: '#0D0F14',
        surface: '#161920',
        surface2: '#1E2229',
        border: '#252830',
        teal: {
          DEFAULT: '#00C9A7',
          dim: 'rgba(0,201,167,0.12)',
        },
        ledger: {
          red: '#FF4D6A',
          'red-dim': 'rgba(255,77,106,0.12)',
          amber: '#F59E0B',
          'amber-dim': 'rgba(245,158,11,0.12)',
          muted: '#6B7280',
          text: '#E8EAF0',
        },
      },
      animation: {
        tick: 'tick 0.25s ease',
        spin: 'spin 0.7s linear infinite',
      },
      keyframes: {
        tick: {
          from: { opacity: 0, transform: 'translateY(5px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
