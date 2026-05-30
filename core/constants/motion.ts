/** Luxe motion tokens — refined easing, no bounce. */
export const luxeEase = [0.22, 1, 0.36, 1] as const;
export const luxeEaseOut = [0.16, 1, 0.3, 1] as const;

export const duration = {
  fast: 0.22,
  base: 0.42,
  slow: 0.58,
} as const;

export const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
} as const;

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

export const scaleIn = {
  initial: { opacity: 0, scale: 0.96, y: 6 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 4 },
} as const;

export const slideFromRight = {
  initial: { x: "100%", opacity: 0.85 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0.85 },
} as const;

export const stagger = {
  container: {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.07, delayChildren: 0.04 },
    },
  },
  item: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
  },
} as const;

export const cardHover = {
  rest: { y: 0, boxShadow: "0 0 0 rgba(5, 17, 42, 0)" },
  hover: {
    y: -3,
    boxShadow: "0 12px 40px -12px rgba(5, 17, 42, 0.14)",
  },
} as const;

export const transition = {
  luxe: { duration: duration.base, ease: luxeEase },
  fast: { duration: duration.fast, ease: luxeEaseOut },
  slow: { duration: duration.slow, ease: luxeEase },
} as const;
