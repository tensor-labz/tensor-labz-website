/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* ── semantic theme tokens — follow CSS vars, auto light/dark ── */
        fg:             'var(--text-primary)',
        muted:          'var(--text-muted)',
        accent:         'var(--accent)',
        'accent-soft':  'var(--accent-soft)',
        canvas:         'var(--bg-base)',
        surface:        'var(--bg-surface)',
        raised:         'var(--bg-raised)',
        rim:            'var(--border)',
        'glass-bg':     'var(--glass-bg)',
        'glass-rim':    'var(--glass-border)',
        'glass-raised': 'var(--glass-bg-raised)',
        'glass-hover':  'var(--glass-bg-hover)',
        'footer-bg':    'var(--footer-bg)',
        /* ── legacy palette (backwards compat) ── */
        primary: {
          100: '#F0F0E4', 200: '#C2C2A3', 300: '#A3A380',
          400: '#858566', 500: '#66664D', 600: '#4D4D33',
          700: '#3F3F2E', 800: '#333326', 900: '#26261A', 950: '#030836',
        },
        secondary: { 100: '#E2E2D5', 200: '#888883' },
      },
      fontFamily: {
        sans:    ['Exo', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
      animation: {
        'border-shine': 'shine 1s ease-out',
        'fade-up':      'fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in':      'fadeIn 0.5s ease both',
      },
      keyframes: {
        shine: {
          '0%':   { borderColor: 'transparent' },
          '50%':  { borderColor: '#3b82f6' },
          '100%': { borderColor: 'transparent' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
      spacing: {
        perspective: '1000px',
      },
    },
  },
  plugins: [],
};
