import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Achievement definitions
 */
export const ACHIEVEMENTS = {
  // Streak achievements
  'streak-3': {
    id: 'streak-3',
    title: 'Getting Started',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    category: 'streak',
    requirement: { type: 'streak', value: 3 },
  },
  'streak-7': {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    category: 'streak',
    requirement: { type: 'streak', value: 7 },
  },
  'streak-30': {
    id: 'streak-30',
    title: 'Dedicated Explorer',
    description: 'Maintain a 30-day streak',
    icon: '🏆',
    category: 'streak',
    requirement: { type: 'streak', value: 30 },
  },

  // Lesson achievements
  'first-lesson': {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '📚',
    category: 'learning',
    requirement: { type: 'lessons', value: 1 },
  },
  'lessons-10': {
    id: 'lessons-10',
    title: 'Quick Learner',
    description: 'Complete 10 lessons',
    icon: '📖',
    category: 'learning',
    requirement: { type: 'lessons', value: 10 },
  },
  'lessons-50': {
    id: 'lessons-50',
    title: 'Knowledge Seeker',
    description: 'Complete 50 lessons',
    icon: '🎓',
    category: 'learning',
    requirement: { type: 'lessons', value: 50 },
  },
  'perfect-lesson': {
    id: 'perfect-lesson',
    title: 'Perfectionist',
    description: 'Complete a lesson with no mistakes',
    icon: '⭐',
    category: 'learning',
    requirement: { type: 'perfect', value: 1 },
  },

  // Discovery achievements
  'first-discovery': {
    id: 'first-discovery',
    title: 'Nature Observer',
    description: 'Make your first discovery',
    icon: '🔍',
    category: 'discovery',
    requirement: { type: 'discoveries', value: 1 },
  },
  'discoveries-10': {
    id: 'discoveries-10',
    title: 'Wildlife Watcher',
    description: 'Discover 10 unique species',
    icon: '🦜',
    category: 'discovery',
    requirement: { type: 'discoveries', value: 10 },
  },
  'discoveries-25': {
    id: 'discoveries-25',
    title: 'Eco Expert',
    description: 'Discover 25 unique species',
    icon: '🌿',
    category: 'discovery',
    requirement: { type: 'discoveries', value: 25 },
  },
  'rare-discovery': {
    id: 'rare-discovery',
    title: 'Rare Find',
    description: 'Discover a rare species',
    icon: '💎',
    category: 'discovery',
    requirement: { type: 'rarity', value: 'rare' },
  },
  'legendary-discovery': {
    id: 'legendary-discovery',
    title: 'Legendary Encounter',
    description: 'Discover a legendary species',
    icon: '👑',
    category: 'discovery',
    requirement: { type: 'rarity', value: 'legendary' },
  },

  // Level achievements
  'level-5': {
    id: 'level-5',
    title: 'Rising Star',
    description: 'Reach level 5',
    icon: '⬆️',
    category: 'progress',
    requirement: { type: 'level', value: 5 },
  },
  'level-10': {
    id: 'level-10',
    title: 'Experienced Explorer',
    description: 'Reach level 10',
    icon: '🌟',
    category: 'progress',
    requirement: { type: 'level', value: 10 },
  },
  'level-25': {
    id: 'level-25',
    title: 'Master Naturalist',
    description: 'Reach level 25',
    icon: '🏅',
    category: 'progress',
    requirement: { type: 'level', value: 25 },
  },

  // Time-based achievements
  'early-bird': {
    id: 'early-bird',
    title: 'Early Bird',
    description: 'Complete a lesson before 8am',
    icon: '🌅',
    category: 'special',
    requirement: { type: 'time', value: 'morning' },
  },
  'night-owl': {
    id: 'night-owl',
    title: 'Night Owl',
    description: 'Complete a lesson after 10pm',
    icon: '🦉',
    category: 'special',
    requirement: { type: 'time', value: 'night' },
  },

  // Unit achievements
  'first-unit': {
    id: 'first-unit',
    title: 'Unit Complete',
    description: 'Complete your first unit',
    icon: '🎯',
    category: 'learning',
    requirement: { type: 'units', value: 1 },
  },
}

/**
 * Achievement Store - Manages badges and milestones
 */
export const useAchievementStore = create(
  persist(
    (set, get) => ({
      // Unlocked achievements
      unlockedAchievements: [], // { achievementId, unlockedAt }

      // Progress trackers for incremental achievements
      progressTrackers: {
        perfectLessons: 0,
        earlyBirdCount: 0,
        nightOwlCount: 0,
      },

      // Recently unlocked (for showing notifications)
      recentlyUnlocked: [], // Achievement IDs to show

      // Actions
      checkAndUnlockAchievement: (achievementId) => {
        const state = get()
        
        // Already unlocked
        if (state.unlockedAchievements.some((a) => a.achievementId === achievementId)) {
          return false
        }

        const achievement = ACHIEVEMENTS[achievementId]
        if (!achievement) return false

        set({
          unlockedAchievements: [
            ...state.unlockedAchievements,
            { achievementId, unlockedAt: Date.now() },
          ],
          recentlyUnlocked: [...state.recentlyUnlocked, achievementId],
        })

        return true
      },

      // Check multiple achievements based on current stats
      checkAchievements: (stats) => {
        const state = get()
        const newlyUnlocked = []

        Object.values(ACHIEVEMENTS).forEach((achievement) => {
          // Skip if already unlocked
          if (state.unlockedAchievements.some((a) => a.achievementId === achievement.id)) {
            return
          }

          const { type, value } = achievement.requirement
          let shouldUnlock = false

          switch (type) {
            case 'streak':
              shouldUnlock = stats.currentStreak >= value
              break
            case 'lessons':
              shouldUnlock = stats.completedLessons >= value
              break
            case 'discoveries':
              shouldUnlock = stats.uniqueDiscoveries >= value
              break
            case 'level':
              shouldUnlock = stats.level >= value
              break
            case 'perfect':
              shouldUnlock = stats.perfectLessons >= value
              break
            case 'units':
              shouldUnlock = stats.completedUnits >= value
              break
            case 'rarity':
              shouldUnlock = stats.discoveredRarities?.includes(value)
              break
            case 'time':
              if (value === 'morning' && stats.isEarlyBird) shouldUnlock = true
              if (value === 'night' && stats.isNightOwl) shouldUnlock = true
              break
          }

          if (shouldUnlock) {
            newlyUnlocked.push(achievement.id)
          }
        })

        if (newlyUnlocked.length > 0) {
          set({
            unlockedAchievements: [
              ...state.unlockedAchievements,
              ...newlyUnlocked.map((id) => ({ achievementId: id, unlockedAt: Date.now() })),
            ],
            recentlyUnlocked: [...state.recentlyUnlocked, ...newlyUnlocked],
          })
        }

        return newlyUnlocked
      },

      // Update progress tracker
      incrementProgress: (tracker, amount = 1) => {
        set((state) => ({
          progressTrackers: {
            ...state.progressTrackers,
            [tracker]: (state.progressTrackers[tracker] || 0) + amount,
          },
        }))
      },

      // Clear recently unlocked (after showing notifications)
      clearRecentlyUnlocked: () => {
        set({ recentlyUnlocked: [] })
      },

      // Dismiss a single recent unlock
      dismissRecentUnlock: (achievementId) => {
        set((state) => ({
          recentlyUnlocked: state.recentlyUnlocked.filter((id) => id !== achievementId),
        }))
      },

      // Check if achievement is unlocked
      isUnlocked: (achievementId) => {
        return get().unlockedAchievements.some((a) => a.achievementId === achievementId)
      },

      // Get all unlocked achievements with details
      getUnlockedAchievements: () => {
        return get().unlockedAchievements.map((unlock) => ({
          ...ACHIEVEMENTS[unlock.achievementId],
          unlockedAt: unlock.unlockedAt,
        }))
      },

      // Get achievements by category
      getAchievementsByCategory: (category) => {
        const state = get()
        return Object.values(ACHIEVEMENTS)
          .filter((a) => a.category === category)
          .map((a) => ({
            ...a,
            isUnlocked: state.unlockedAchievements.some(
              (u) => u.achievementId === a.id
            ),
            unlockedAt: state.unlockedAchievements.find(
              (u) => u.achievementId === a.id
            )?.unlockedAt,
          }))
      },

      // Get total achievement count
      getTotalCount: () => Object.keys(ACHIEVEMENTS).length,

      // Get unlocked count
      getUnlockedCount: () => get().unlockedAchievements.length,

      // Reset for testing
      resetProgress: () => {
        set({
          unlockedAchievements: [],
          progressTrackers: {
            perfectLessons: 0,
            earlyBirdCount: 0,
            nightOwlCount: 0,
          },
          recentlyUnlocked: [],
        })
      },
    }),
    {
      name: 'eco-game-achievements',
      version: 1,
    }
  )
)

export default useAchievementStore
