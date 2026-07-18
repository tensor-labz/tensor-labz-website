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
        /* ── semantic theme tokens — dark palette (self-contained hex) ── */
        fg: '#f8fafc', // slate-50
        muted: '#94a3b8', // slate-400
        accent: '#38bdf8', // sky-400
        'accent-soft': '#0c4a6e', // sky-900
        canvas: '#020617', // slate-950
        surface: '#0f172a', // slate-900
        raised: '#1e293b', // slate-800
        rim: 'rgba(148, 163, 184, 0.12)',
        'glass-bg': 'rgba(255, 255, 255, 0.04)',
        'glass-subtle': 'rgba(255, 255, 255, 0.03)',
        'glass-rim': 'rgba(255, 255, 255, 0.08)',
        'glass-rim-strong': 'rgba(255, 255, 255, 0.12)',
        'glass-rim-subtle': 'rgba(255, 255, 255, 0.07)',
        'glass-raised': 'rgba(255, 255, 255, 0.06)',
        'glass-hover': 'rgba(255, 255, 255, 0.06)',
        'footer-bg': '#020617',
        'header-bg': 'rgba(2, 6, 23, 0.88)',
        'input-bg': 'rgba(255, 255, 255, 0.06)',
        'input-border': 'rgba(255, 255, 255, 0.12)',
        'grid-dot': 'rgba(56, 189, 248, 0.05)',
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
