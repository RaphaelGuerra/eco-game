// Framer Motion animation variants for consistent animations across the app

// =============================================================================
// SPRING PHYSICS CONSTANTS
// =============================================================================
// Use these presets for consistent spring animations throughout the app
// Higher stiffness = snappier, higher damping = less bounce

export const springPresets = {
  // Snappy interactions (buttons, small UI elements)
  snappy: { type: 'spring', stiffness: 400, damping: 17 },
  // Gentle transitions (cards, modals)
  gentle: { type: 'spring', stiffness: 300, damping: 20 },
  // Bouncy celebrations (achievements, discoveries)
  bouncy: { type: 'spring', stiffness: 200, damping: 10 },
  // Smooth page transitions
  smooth: { type: 'spring', stiffness: 150, damping: 25 },
}

// =============================================================================
// TIMING CONSTANTS
// =============================================================================
// Standard durations for consistent animation timing

export const timing = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  pageTransition: 0.25,
}

// =============================================================================
// BUTTON ANIMATIONS
// =============================================================================

export const buttonPress = {
  whileTap: { scale: 0.95 },
  transition: springPresets.snappy,
}

// =============================================================================
// FEEDBACK ANIMATIONS
// =============================================================================

export const correctAnswer = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    backgroundColor: ['#ffffff', '#d1fae5', '#ffffff'],
  },
  transition: { duration: timing.slow },
}

export const wrongAnswer = {
  animate: {
    x: [0, -10, 10, -10, 10, 0],
  },
  transition: { duration: timing.slow },
}

// =============================================================================
// CELEBRATION ANIMATIONS
// =============================================================================

export const levelUp = {
  initial: { scale: 0, opacity: 0, rotate: -180 },
  animate: { scale: 1, opacity: 1, rotate: 0 },
  exit: { scale: 0, opacity: 0 },
  transition: springPresets.bouncy,
}

export const discoveryReveal = {
  initial: { scale: 0, rotate: -180 },
  animate: { scale: 1, rotate: 0 },
  transition: { ...springPresets.bouncy, delay: 0.2 },
}

// =============================================================================
// MASCOT ANIMATIONS
// =============================================================================

export const mascotBounce = {
  animate: {
    y: [0, -15, 0],
  },
  transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
}

export const mascotCheer = {
  animate: {
    y: [0, -20, 0],
    rotate: [-5, 5, -5, 0],
  },
  transition: { repeat: 2, duration: 0.5 },
}

export const mascotWarning = {
  animate: {
    rotate: [-5, 5, -5, 5, 0],
  },
  transition: { duration: 0.5 },
}

// =============================================================================
// CARD ANIMATIONS
// =============================================================================

export const cardFlip = {
  initial: { rotateY: 180, opacity: 0 },
  animate: { rotateY: 0, opacity: 1 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export const cardEntrance = {
  initial: { scale: 0.8, opacity: 0, y: 20 },
  animate: { scale: 1, opacity: 1, y: 0 },
  transition: springPresets.gentle,
}

// =============================================================================
// PROGRESS ANIMATIONS
// =============================================================================

export const progressFill = {
  initial: { width: 0 },
  animate: (width) => ({ width: `${width}%` }),
  transition: { duration: timing.slow, ease: 'easeOut' },
}

// =============================================================================
// PAGE TRANSITIONS
// =============================================================================

export const pageEnterRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: timing.pageTransition },
}

export const pageEnterBottom = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: timing.pageTransition },
}

// =============================================================================
// GENERIC TRANSITIONS
// =============================================================================

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: timing.fast },
}

export const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
  transition: springPresets.gentle,
}

// =============================================================================
// HEART/LIFE ANIMATIONS
// =============================================================================

export const heartShake = {
  animate: {
    scale: [1, 1.2, 0.8, 1],
    rotate: [0, -10, 10, 0],
  },
  transition: { duration: timing.normal },
}

export const heartPulse = {
  animate: {
    scale: [1, 1.1, 1],
  },
  transition: { duration: timing.normal },
}

// =============================================================================
// XP/REWARD ANIMATIONS
// =============================================================================

export const xpPop = {
  initial: { scale: 0, y: 20, opacity: 0 },
  animate: { scale: 1, y: 0, opacity: 1 },
  exit: { scale: 0, y: -20, opacity: 0 },
  transition: { type: 'spring', stiffness: 300 },
}

export const streakFlicker = {
  animate: {
    scale: [1, 1.1, 1, 1.05, 1],
    rotate: [-2, 2, -2, 0],
  },
  transition: { repeat: Infinity, duration: 1.5 },
}

// =============================================================================
// MODAL ANIMATIONS
// =============================================================================

export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: timing.fast },
}

export const modalContent = {
  initial: { scale: 0.95, opacity: 0, y: 10 },
  animate: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 0.95, opacity: 0, y: 10 },
  transition: springPresets.gentle,
}

// =============================================================================
// LIST ANIMATIONS
// =============================================================================

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
  transition: { duration: timing.fast },
}

// =============================================================================
// SPECIAL EFFECTS
// =============================================================================

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

export const shimmer = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
  },
  transition: { repeat: Infinity, duration: 1.5, ease: 'linear' },
}

// =============================================================================
// CONFETTI CONFIGURATIONS
// =============================================================================

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

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

export default {
  // Spring presets
  springPresets,
  timing,
  // Button
  buttonPress,
  // Feedback
  correctAnswer,
  wrongAnswer,
  // Celebration
  levelUp,
  discoveryReveal,
  // Mascot
  mascotBounce,
  mascotCheer,
  mascotWarning,
  // Card
  cardFlip,
  cardEntrance,
  // Progress
  progressFill,
  // Page
  pageEnterRight,
  pageEnterBottom,
  // Generic
  fadeIn,
  scaleIn,
  // Heart
  heartShake,
  heartPulse,
  // XP
  xpPop,
  streakFlicker,
  // Modal
  modalBackdrop,
  modalContent,
  // List
  listContainer,
  listItem,
  // Effects
  explorePulse,
  shimmer,
  // Confetti
  confettiConfig,
}
