import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Settings Store - Manages user preferences
 */
export const useSettingsStore = create(
  persist(
    (set, get) => ({
      // Sound settings
      soundEnabled: true,
      musicEnabled: true,
      soundVolume: 1.0,
      musicVolume: 0.5,

      // Language
      language: 'en', // 'en', 'es', 'pt-BR'

      // Notifications
      notificationsEnabled: true,
      streakReminderTime: '20:00', // 8 PM
      dailyGoalReminderEnabled: true,

      // Display preferences
      reducedMotion: false,
      highContrast: false,

      // Theme (for future use)
      theme: 'light', // 'light', 'dark', 'system'

      // Actions
      toggleSound: () => {
        set((state) => ({ soundEnabled: !state.soundEnabled }))
      },

      toggleMusic: () => {
        set((state) => ({ musicEnabled: !state.musicEnabled }))
      },

      setSoundVolume: (volume) => {
        set({ soundVolume: Math.max(0, Math.min(1, volume)) })
      },

      setMusicVolume: (volume) => {
        set({ musicVolume: Math.max(0, Math.min(1, volume)) })
      },

      setLanguage: (language) => {
        set({ language })
      },

      toggleNotifications: () => {
        set((state) => ({ notificationsEnabled: !state.notificationsEnabled }))
      },

      setStreakReminderTime: (time) => {
        set({ streakReminderTime: time })
      },

      toggleDailyGoalReminder: () => {
        set((state) => ({
          dailyGoalReminderEnabled: !state.dailyGoalReminderEnabled,
        }))
      },

      toggleReducedMotion: () => {
        set((state) => ({ reducedMotion: !state.reducedMotion }))
      },

      toggleHighContrast: () => {
        set((state) => ({ highContrast: !state.highContrast }))
      },

      setTheme: (theme) => {
        set({ theme })
      },

      // Get all settings as object (for settings screen)
      getAllSettings: () => {
        const state = get()
        return {
          soundEnabled: state.soundEnabled,
          musicEnabled: state.musicEnabled,
          soundVolume: state.soundVolume,
          musicVolume: state.musicVolume,
          language: state.language,
          notificationsEnabled: state.notificationsEnabled,
          streakReminderTime: state.streakReminderTime,
          dailyGoalReminderEnabled: state.dailyGoalReminderEnabled,
          reducedMotion: state.reducedMotion,
          highContrast: state.highContrast,
          theme: state.theme,
        }
      },

      // Reset to defaults
      resetToDefaults: () => {
        set({
          soundEnabled: true,
          musicEnabled: true,
          soundVolume: 1.0,
          musicVolume: 0.5,
          language: 'en',
          notificationsEnabled: true,
          streakReminderTime: '20:00',
          dailyGoalReminderEnabled: true,
          reducedMotion: false,
          highContrast: false,
          theme: 'light',
        })
      },
    }),
    {
      name: 'eco-game-settings',
      version: 1,
    }
  )
)

export default useSettingsStore
