import type { Variants, Transition } from 'motion/react';

/* ── Easing ─────────────────────────────────────────────── */
export const EASE_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_OUT:  [number, number, number, number] = [0, 0, 0.2, 1];

/* ── Transitions ────────────────────────────────────────── */
export const tFast:    Transition = { duration: 0.35, ease: EASE_EXPO };
export const tBase:    Transition = { duration: 0.55, ease: EASE_EXPO };
export const tSlow:    Transition = { duration: 0.8,  ease: EASE_EXPO };

/* ── Reusable variants ──────────────────────────────────── */
export const fadeUp = (delay = 0): Variants => ({
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { ...tBase, delay } },
});

export const fadeIn = (delay = 0): Variants => ({
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { ...tBase, delay } },
});

export const scaleIn = (delay = 0): Variants => ({
  hidden:  { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { ...tBase, delay } },
});

export const slideInLeft = (delay = 0): Variants => ({
  hidden:  { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { ...tBase, delay } },
});

export const slideInRight = (delay = 0): Variants => ({
  hidden:  { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { ...tBase, delay } },
});

/* ── Stagger container ──────────────────────────────────── */
export const staggerContainer = (stagger = 0.1, delay = 0): Variants => ({
  hidden:  {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { ...tBase } },
};

/* ── Shared viewport trigger ────────────────────────────── */
export const VIEWPORT = { once: true, margin: '-60px' } as const;
