// Framer Motion animation variants for consistent animations across the app

// Button press effect
export const buttonPress = {
  whileTap: { scale: 0.95 },
  transition: { type: 'spring', stiffness: 400, damping: 17 },
}

// Correct answer celebration
export const correctAnswer = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    backgroundColor: ['#ffffff', '#d1fae5', '#ffffff'],
  },
  transition: { duration: 0.4 },
}

// Wrong answer shake
export const wrongAnswer = {
  animate: {
    x: [0, -10, 10, -10, 10, 0],
  },
  transition: { duration: 0.4 },
}

// Level up celebration
export const levelUp = {
  initial: { scale: 0, opacity: 0, rotate: -180 },
  animate: { scale: 1, opacity: 1, rotate: 0 },
  exit: { scale: 0, opacity: 0 },
  transition: { type: 'spring', damping: 10, stiffness: 100 },
}

// Mascot idle bounce
export const mascotBounce = {
  animate: {
    y: [0, -15, 0],
  },
  transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
}

// Mascot cheer animation
export const mascotCheer = {
  animate: {
    y: [0, -20, 0],
    rotate: [-5, 5, -5, 0],
  },
  transition: { repeat: 2, duration: 0.5 },
}

// Mascot warning shake
export const mascotWarning = {
  animate: {
    rotate: [-5, 5, -5, 5, 0],
  },
  transition: { duration: 0.5 },
}

// Card flip reveal
export const cardFlip = {
  initial: { rotateY: 180, opacity: 0 },
  animate: { rotateY: 0, opacity: 1 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

// Card entrance
export const cardEntrance = {
  initial: { scale: 0.8, opacity: 0, y: 20 },
  animate: { scale: 1, opacity: 1, y: 0 },
  transition: { type: 'spring', damping: 15, stiffness: 200 },
}

// Progress bar fill
export const progressFill = {
  initial: { width: 0 },
  animate: (width) => ({ width: `${width}%` }),
  transition: { duration: 0.5, ease: 'easeOut' },
}

// Page enter from right
export const pageEnterRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.2 },
}

// Page enter from bottom
export const pageEnterBottom = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 },
}

// Fade in
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
}

// Scale in
export const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
  transition: { type: 'spring', damping: 20, stiffness: 300 },
}

// Heart shake on loss
export const heartShake = {
  animate: {
    scale: [1, 1.2, 0.8, 1],
    rotate: [0, -10, 10, 0],
  },
  transition: { duration: 0.3 },
}

// Heart pulse
export const heartPulse = {
  animate: {
    scale: [1, 1.1, 1],
  },
  transition: { duration: 0.3 },
}

// XP gain pop
export const xpPop = {
  initial: { scale: 0, y: 20, opacity: 0 },
  animate: { scale: 1, y: 0, opacity: 1 },
  exit: { scale: 0, y: -20, opacity: 0 },
  transition: { type: 'spring', stiffness: 300 },
}

// Streak flame flicker
export const streakFlicker = {
  animate: {
    scale: [1, 1.1, 1, 1.05, 1],
    rotate: [-2, 2, -2, 0],
  },
  transition: { repeat: Infinity, duration: 1.5 },
}

// Modal backdrop
export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
}

// Modal content
export const modalContent = {
  initial: { scale: 0.95, opacity: 0, y: 10 },
  animate: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 0.95, opacity: 0, y: 10 },
  transition: { type: 'spring', damping: 25, stiffness: 300 },
}

// List item stagger
export const listContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

export const listItem = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2 },
}

// Explore button pulse
export const explorePulse = {
  animate: {
    scale: [1, 1.05, 1],
    boxShadow: [
      '0 0 0 0 rgba(16, 185, 129, 0.4)',
      '0 0 0 20px rgba(16, 185, 129, 0)',
      '0 0 0 0 rgba(16, 185, 129, 0)',
    ],
  },
  transition: { repeat: Infinity, duration: 2 },
}

// Discovery reveal
export const discoveryReveal = {
  initial: { scale: 0, rotate: -180 },
  animate: { scale: 1, rotate: 0 },
  transition: { type: 'spring', damping: 10, stiffness: 100, delay: 0.2 },
}

// Shimmer effect for loading
export const shimmer = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
  },
  transition: { repeat: Infinity, duration: 1.5, ease: 'linear' },
}

// Confetti burst trigger points
export const confettiConfig = {
  lessonComplete: {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  },
  levelUp: {
    particleCount: 200,
    spread: 100,
    origin: { y: 0.5 },
    colors: ['#10b981', '#3b82f6', '#f59e0b', '#fb7185'],
  },
  achievement: {
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#a78bfa', '#f59e0b', '#10b981'],
  },
  rareDiscovery: {
    particleCount: 120,
    spread: 90,
    origin: { y: 0.5 },
    colors: ['#a78bfa', '#3b82f6'],
  },
}

export default {
  buttonPress,
  correctAnswer,
  wrongAnswer,
  levelUp,
  mascotBounce,
  mascotCheer,
  mascotWarning,
  cardFlip,
  cardEntrance,
  progressFill,
  pageEnterRight,
  pageEnterBottom,
  fadeIn,
  scaleIn,
  heartShake,
  heartPulse,
  xpPop,
  streakFlicker,
  modalBackdrop,
  modalContent,
  listContainer,
  listItem,
  explorePulse,
  discoveryReveal,
  shimmer,
  confettiConfig,
}
