import { Howl, Howler } from 'howler'

/**
 * Sound Manager - Singleton for managing all game audio
 * Uses Howler.js for cross-browser audio support
 */

// Sound definitions with their file paths and default volumes
const SOUND_DEFINITIONS = {
  // UI Sounds
  buttonPress: { src: '/sounds/button-press.mp3', volume: 0.5 },
  
  // Feedback Sounds
  correct: { src: '/sounds/correct.mp3', volume: 0.7 },
  wrong: { src: '/sounds/wrong.mp3', volume: 0.5 },
  
  // Reward Sounds
  xpGain: { src: '/sounds/xp-gain.mp3', volume: 0.6 },
  levelUp: { src: '/sounds/level-up.mp3', volume: 0.8 },
  achievement: { src: '/sounds/achievement.mp3', volume: 0.8 },
  
  // Heart Sounds
  heartLost: { src: '/sounds/heart-lost.mp3', volume: 0.5 },
  heartGained: { src: '/sounds/heart-gained.mp3', volume: 0.6 },
  
  // Streak Sounds
  streakWarning: { src: '/sounds/streak-warning.mp3', volume: 0.6 },
  
  // Discovery Sounds
  discovery: { src: '/sounds/discovery.mp3', volume: 0.7 },
  rareDiscovery: { src: '/sounds/rare-discovery.mp3', volume: 0.8 },
  
  // Lesson Sounds
  lessonComplete: { src: '/sounds/lesson-complete.mp3', volume: 0.7 },
}

class SoundManager {
  constructor() {
    this.sounds = {}
    this.isMuted = false
    this.masterVolume = 1.0
    this.isInitialized = false
  }

  /**
   * Initialize all sounds - call this early in app lifecycle
   * Preloads sounds for instant playback
   */
  init() {
    if (this.isInitialized) return

    // Load mute preference from localStorage
    const savedMute = localStorage.getItem('eco-game-muted')
    this.isMuted = savedMute === 'true'

    const savedVolume = localStorage.getItem('eco-game-volume')
    this.masterVolume = savedVolume ? parseFloat(savedVolume) : 1.0

    // Create Howl instances for each sound
    Object.entries(SOUND_DEFINITIONS).forEach(([key, config]) => {
      this.sounds[key] = new Howl({
        src: [config.src],
        volume: config.volume * this.masterVolume,
        preload: true,
        onloaderror: (id, error) => {
          console.warn(`Failed to load sound: ${key}`, error)
        },
      })
    })

    // Apply initial mute state
    if (this.isMuted) {
      Howler.mute(true)
    }

    this.isInitialized = true
  }

  /**
   * Play a sound by key
   * @param {string} soundKey - Key from SOUND_DEFINITIONS
   * @param {object} options - Optional overrides { volume, rate }
   * @returns {number|null} Sound ID or null if muted/not found
   */
  play(soundKey, options = {}) {
    if (this.isMuted) return null

    const sound = this.sounds[soundKey]
    if (!sound) {
      console.warn(`Sound not found: ${soundKey}`)
      return null
    }

    // Apply optional overrides
    if (options.volume !== undefined) {
      sound.volume(options.volume * this.masterVolume)
    }
    if (options.rate !== undefined) {
      sound.rate(options.rate)
    }

    return sound.play()
  }

  /**
   * Stop a specific sound
   * @param {string} soundKey - Key from SOUND_DEFINITIONS
   */
  stop(soundKey) {
    const sound = this.sounds[soundKey]
    if (sound) {
      sound.stop()
    }
  }

  /**
   * Stop all sounds
   */
  stopAll() {
    Howler.stop()
  }

  /**
   * Toggle mute state
   * @returns {boolean} New mute state
   */
  toggleMute() {
    this.isMuted = !this.isMuted
    Howler.mute(this.isMuted)
    localStorage.setItem('eco-game-muted', this.isMuted.toString())
    return this.isMuted
  }

  /**
   * Set mute state
   * @param {boolean} muted - Whether to mute
   */
  setMuted(muted) {
    this.isMuted = muted
    Howler.mute(this.isMuted)
    localStorage.setItem('eco-game-muted', this.isMuted.toString())
  }

  /**
   * Set master volume
   * @param {number} volume - Volume level 0-1
   */
  setVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume))
    Howler.volume(this.masterVolume)
    localStorage.setItem('eco-game-volume', this.masterVolume.toString())
  }

  /**
   * Get current mute state
   * @returns {boolean}
   */
  getMuted() {
    return this.isMuted
  }

  /**
   * Get current volume
   * @returns {number}
   */
  getVolume() {
    return this.masterVolume
  }

  /**
   * Play a sequence of sounds with delays
   * @param {Array<{sound: string, delay: number}>} sequence
   */
  playSequence(sequence) {
    let totalDelay = 0
    sequence.forEach(({ sound, delay = 0 }) => {
      totalDelay += delay
      setTimeout(() => this.play(sound), totalDelay)
    })
  }

  /**
   * Preload a specific sound (useful for lazy loading)
   * @param {string} soundKey
   */
  preload(soundKey) {
    const sound = this.sounds[soundKey]
    if (sound) {
      sound.load()
    }
  }
}

// Export singleton instance
export const soundManager = new SoundManager()

// Export for direct use
export default soundManager
