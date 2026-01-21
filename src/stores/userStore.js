import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * XP required for each level (exponential curve)
 * Level 1: 100 XP, Level 2: 150 XP, Level 3: 225 XP, etc.
 */
function xpForLevel(level) {
  return Math.floor(100 * Math.pow(1.5, level - 1))
}

/**
 * Calculate level from total XP
 */
function calculateLevel(totalXP) {
  let level = 1
  let xpNeeded = xpForLevel(level)
  let xpAccumulated = 0

  while (xpAccumulated + xpNeeded <= totalXP) {
    xpAccumulated += xpNeeded
    level++
    xpNeeded = xpForLevel(level)
  }

  return level
}

/**
 * Calculate XP progress within current level
 */
function calculateLevelProgress(totalXP) {
  const level = calculateLevel(totalXP)
  let xpForPreviousLevels = 0

  for (let i = 1; i < level; i++) {
    xpForPreviousLevels += xpForLevel(i)
  }

  const xpInCurrentLevel = totalXP - xpForPreviousLevels
  const xpNeededForNextLevel = xpForLevel(level)

  return {
    current: xpInCurrentLevel,
    needed: xpNeededForNextLevel,
    percentage: (xpInCurrentLevel / xpNeededForNextLevel) * 100,
  }
}

// Heart regeneration constants
const HEART_REGEN_TIME_MS = 30 * 60 * 1000 // 30 minutes
const MAX_HEARTS = 5
const HEART_REFILL_COST = 10 // gems

// XP rewards
export const XP_REWARDS = {
  CORRECT_ANSWER: 10,
  PERFECT_LESSON: 25,
  LESSON_COMPLETE: 15,
  UNIT_COMPLETE: 100,
  DISCOVERY: 20,
  RARE_DISCOVERY: 50,
  STREAK_BONUS: 5,
  DAILY_GOAL: 30,
}

export const useUserStore = create(
  persist(
    (set, get) => ({
      // Core stats
      xp: 0,
      level: 1,
      gems: 50, // Starting gems
      hearts: MAX_HEARTS,
      maxHearts: MAX_HEARTS,

      // Streak data
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
      streakFreezes: 1, // Start with one free freeze

      // Daily goals
      dailyXPGoal: 50,
      dailyXPEarned: 0,
      lastDailyReset: null,

      // Heart regeneration
      lastHeartLossTime: null,

      // Onboarding
      hasCompletedOnboarding: false,

      // Computed getters
      getLevelProgress: () => calculateLevelProgress(get().xp),
      getXPForNextLevel: () => xpForLevel(get().level),
      
      // Check if daily goal is complete
      isDailyGoalComplete: () => get().dailyXPEarned >= get().dailyXPGoal,

      // Actions
      addXP: (amount) => {
        const state = get()
        const newXP = state.xp + amount
        const oldLevel = state.level
        const newLevel = calculateLevel(newXP)
        const leveledUp = newLevel > oldLevel

        set({
          xp: newXP,
          level: newLevel,
          dailyXPEarned: state.dailyXPEarned + amount,
          lastActivityDate: new Date().toISOString(),
        })

        return { leveledUp, newLevel }
      },

      loseHeart: () => {
        const state = get()
        if (state.hearts <= 0) return false

        set({
          hearts: state.hearts - 1,
          lastHeartLossTime: Date.now(),
        })
        return true
      },

      regenerateHearts: () => {
        const state = get()
        if (state.hearts >= state.maxHearts) return 0
        if (!state.lastHeartLossTime) return 0

        const timeSinceLoss = Date.now() - state.lastHeartLossTime
        const heartsToRegen = Math.floor(timeSinceLoss / HEART_REGEN_TIME_MS)
        const actualRegen = Math.min(heartsToRegen, state.maxHearts - state.hearts)

        if (actualRegen > 0) {
          set({
            hearts: state.hearts + actualRegen,
            lastHeartLossTime:
              state.hearts + actualRegen >= state.maxHearts
                ? null
                : state.lastHeartLossTime + actualRegen * HEART_REGEN_TIME_MS,
          })
        }

        return actualRegen
      },

      getTimeUntilNextHeart: () => {
        const state = get()
        if (state.hearts >= state.maxHearts) return null
        if (!state.lastHeartLossTime) return null

        const timeSinceLoss = Date.now() - state.lastHeartLossTime
        const timeInCurrentCycle = timeSinceLoss % HEART_REGEN_TIME_MS
        return HEART_REGEN_TIME_MS - timeInCurrentCycle
      },

      refillHearts: () => {
        const state = get()
        if (state.gems < HEART_REFILL_COST) return false
        if (state.hearts >= state.maxHearts) return false

        set({
          hearts: state.maxHearts,
          gems: state.gems - HEART_REFILL_COST,
          lastHeartLossTime: null,
        })
        return true
      },

      addGems: (amount) => {
        set((state) => ({ gems: state.gems + amount }))
      },

      spendGems: (amount) => {
        const state = get()
        if (state.gems < amount) return false
        set({ gems: state.gems - amount })
        return true
      },

      // Streak management
      checkAndUpdateStreak: () => {
        const state = get()
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        if (!state.lastActivityDate) {
          // First activity ever
          set({
            currentStreak: 1,
            longestStreak: Math.max(1, state.longestStreak),
            lastActivityDate: now.toISOString(),
          })
          return { action: 'START', newStreak: 1 }
        }

        const lastActivity = new Date(state.lastActivityDate)
        const lastDay = new Date(
          lastActivity.getFullYear(),
          lastActivity.getMonth(),
          lastActivity.getDate()
        )

        const daysDiff = Math.floor((today - lastDay) / (24 * 60 * 60 * 1000))

        if (daysDiff === 0) {
          // Same day - no change
          return { action: 'NONE', newStreak: state.currentStreak }
        }

        if (daysDiff === 1) {
          // Consecutive day - increment
          const newStreak = state.currentStreak + 1
          set({
            currentStreak: newStreak,
            longestStreak: Math.max(newStreak, state.longestStreak),
            lastActivityDate: now.toISOString(),
          })
          return { action: 'INCREMENT', newStreak }
        }

        if (daysDiff === 2 && state.streakFreezes > 0) {
          // Missed one day but has freeze
          set({
            streakFreezes: state.streakFreezes - 1,
            lastActivityDate: now.toISOString(),
          })
          return { action: 'USE_FREEZE', newStreak: state.currentStreak }
        }

        // Streak broken
        set({
          currentStreak: 1,
          lastActivityDate: now.toISOString(),
        })
        return { action: 'RESET', newStreak: 1 }
      },

      isStreakAtRisk: () => {
        const state = get()
        if (!state.lastActivityDate) return false

        const now = new Date()
        const lastActivity = new Date(state.lastActivityDate)
        const hoursSinceActivity = (now - lastActivity) / (60 * 60 * 1000)

        // At risk if more than 20 hours since last activity
        return hoursSinceActivity >= 20
      },

      addStreakFreeze: () => {
        set((state) => ({ streakFreezes: state.streakFreezes + 1 }))
      },

      // Daily reset
      checkDailyReset: () => {
        const state = get()
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        if (!state.lastDailyReset) {
          set({ lastDailyReset: today.toISOString() })
          return
        }

        const lastReset = new Date(state.lastDailyReset)
        if (today > lastReset) {
          set({
            dailyXPEarned: 0,
            lastDailyReset: today.toISOString(),
          })
        }
      },

      setDailyGoal: (goal) => {
        set({ dailyXPGoal: goal })
      },

      // Onboarding
      completeOnboarding: () => {
        set({ hasCompletedOnboarding: true })
      },

      // Reset for testing
      resetProgress: () => {
        set({
          xp: 0,
          level: 1,
          gems: 50,
          hearts: MAX_HEARTS,
          currentStreak: 0,
          longestStreak: 0,
          lastActivityDate: null,
          streakFreezes: 1,
          dailyXPEarned: 0,
          lastDailyReset: null,
          lastHeartLossTime: null,
          hasCompletedOnboarding: false,
        })
      },
    }),
    {
      name: 'eco-game-user',
      version: 1,
    }
  )
)

export default useUserStore
