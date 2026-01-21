import confetti from 'canvas-confetti'

/**
 * Confetti utility for celebrations
 * Wraps canvas-confetti with preset configurations
 */

// Default colors matching our theme
const DEFAULT_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#fb7185', '#a78bfa']

/**
 * Fire a basic confetti burst
 * @param {object} options - canvas-confetti options
 */
export function fireConfetti(options = {}) {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: DEFAULT_COLORS,
    ...options,
  })
}

/**
 * Lesson complete celebration - moderate burst
 */
export function celebrateLessonComplete() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: DEFAULT_COLORS,
  })
}

/**
 * Level up celebration - big burst with multiple shots
 */
export function celebrateLevelUp() {
  const duration = 2000
  const end = Date.now() + duration

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: DEFAULT_COLORS,
    })
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: DEFAULT_COLORS,
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }

  frame()
}

/**
 * Achievement unlocked celebration
 */
export function celebrateAchievement() {
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#a78bfa', '#f59e0b', '#10b981'],
  })
}

/**
 * Rare discovery celebration - special purple/blue theme
 */
export function celebrateRareDiscovery() {
  // First burst
  confetti({
    particleCount: 60,
    spread: 50,
    origin: { y: 0.5 },
    colors: ['#a78bfa', '#3b82f6', '#818cf8'],
  })

  // Delayed second burst
  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#a78bfa', '#3b82f6', '#818cf8'],
    })
  }, 200)
}

/**
 * Streak milestone celebration
 * @param {number} streakCount - Current streak number
 */
export function celebrateStreak(streakCount) {
  const intensity = Math.min(streakCount / 7, 1) // Max intensity at 7-day streak
  
  confetti({
    particleCount: Math.floor(50 + intensity * 100),
    spread: 60 + intensity * 30,
    origin: { y: 0.6 },
    colors: ['#fb7185', '#f59e0b', '#fbbf24'],
  })
}

/**
 * Perfect lesson celebration (no mistakes)
 */
export function celebratePerfectLesson() {
  // Star-shaped burst
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    colors: ['#10b981', '#34d399', '#6ee7b7'],
  }

  confetti({
    ...defaults,
    particleCount: 50,
    scalar: 1.2,
    shapes: ['star'],
  })

  confetti({
    ...defaults,
    particleCount: 30,
    scalar: 0.75,
    shapes: ['circle'],
  })
}

/**
 * Unit complete celebration - grand finale
 */
export function celebrateUnitComplete() {
  const duration = 3000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  const randomInRange = (min, max) => Math.random() * (max - min) + min

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 50 * (timeLeft / duration)

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: DEFAULT_COLORS,
    })
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: DEFAULT_COLORS,
    })
  }, 250)
}

/**
 * Simple sparkle effect for smaller wins
 */
export function sparkle(origin = { x: 0.5, y: 0.5 }) {
  confetti({
    particleCount: 30,
    spread: 50,
    origin,
    colors: ['#fbbf24', '#f59e0b'],
    scalar: 0.8,
    gravity: 0.8,
  })
}

export default {
  fireConfetti,
  celebrateLessonComplete,
  celebrateLevelUp,
  celebrateAchievement,
  celebrateRareDiscovery,
  celebrateStreak,
  celebratePerfectLesson,
  celebrateUnitComplete,
  sparkle,
}
