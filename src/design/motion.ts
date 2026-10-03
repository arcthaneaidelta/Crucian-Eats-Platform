// Motion constants — §19
export const durations = {
  fast: 0.15,
  medium: 0.25,
  slow: 0.45,
  hero: 0.6,
} as const;

export const easings = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
  loader: [0.76, 0, 0.24, 1] as const,
};

// Shared animation variants
export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.slow, ease: easings.out },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.medium },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export const slideInRight = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.28, ease: easings.out },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.2, ease: easings.exit },
  },
};

export const slideInUp = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: { duration: 0.28, ease: easings.out },
  },
  exit: {
    y: '100%',
    transition: { duration: 0.2, ease: easings.exit },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: easings.out },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.15, ease: easings.exit },
  },
};
