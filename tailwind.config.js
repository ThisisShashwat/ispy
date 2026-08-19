export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    borderRadius: {
      none: '0px',
      sm: '0px',
      DEFAULT: '0px',
      md: '0px',
      lg: '0px',
      xl: '0px',
      '2xl': '0px',
      '3xl': '0px',
      full: '9999px',
    },
    extend: {
      colors: {
        ground: '#F0F0EE',
        plate: '#FFFFFF',
        ink: '#111111',
        signal: 'var(--accent, #E5231B)',
        hair: '#D7D7D2',
        error: '#B3261D',
      },
      fontFamily: {
        display: ['var(--font-display-active)', 'system-ui', 'sans-serif'],
        data: ['var(--font-martian)', '"Courier New"', 'monospace'],
        mono: ['var(--font-martian)', '"Courier New"', 'monospace'],
      },
      keyframes: {
        lockOn: {
          '0%': { opacity: '0', transform: 'scale(1.08)' },
          '18%': { opacity: '1', transform: 'scale(1)' },
          '82%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(1)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        lock: 'lockOn 2.6s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}
