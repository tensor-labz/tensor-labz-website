import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

// @tailwindcss/forms ships no type declarations.
declare module '@tailwindcss/forms';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* ── semantic theme tokens — follow CSS vars, auto light/dark ── */
        fg: 'var(--text-primary)',
        muted: 'var(--text-muted)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        canvas: 'var(--bg-base)',
        surface: 'var(--bg-surface)',
        raised: 'var(--bg-raised)',
        rim: 'var(--border)',
        'glass-bg': 'var(--glass-bg)',
        'glass-subtle': 'var(--glass-bg-subtle)',
        'glass-rim': 'var(--glass-border)',
        'glass-rim-strong': 'var(--glass-border-strong)',
        'glass-rim-subtle': 'var(--glass-border-subtle)',
        'glass-raised': 'var(--glass-bg-raised)',
        'glass-hover': 'var(--glass-bg-hover)',
        'footer-bg': 'var(--footer-bg)',
        'header-bg': 'var(--header-bg)',
        'input-bg': 'var(--input-bg)',
        'input-border': 'var(--input-border)',
        'grid-dot': 'var(--grid-dot)',
        /* ── legacy palette (backwards compat) ── */
        primary: {
          100: '#F0F0E4',
          200: '#C2C2A3',
          300: '#A3A380',
          400: '#858566',
          500: '#66664D',
          600: '#4D4D33',
          700: '#3F3F2E',
          800: '#333326',
          900: '#26261A',
          950: '#030836',
        },
        secondary: { 100: '#E2E2D5', 200: '#888883' },
      },
      fontFamily: {
        sans: ['Exo', 'sans-serif'],
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
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fadeIn 0.5s ease both',
        'marquee-left': 'marqueeLeft 35s linear infinite',
        'marquee-right': 'marqueeRight 45s linear infinite',
      },
      keyframes: {
        shine: {
          '0%': { borderColor: 'transparent' },
          '50%': { borderColor: '#3b82f6' },
          '100%': { borderColor: 'transparent' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        marqueeLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRight: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      spacing: {
        perspective: '1000px',
      },
    },
  },
  plugins: [
    typography,
    // 'class' strategy: opt-in via form-input/form-select classes — no global
    // reset, so existing custom-styled admin inputs are untouched.
    forms({ strategy: 'class' }),
  ],
} satisfies Config;
