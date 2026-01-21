import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Calculate time of day based on current hour
 */
function calculateTimeOfDay() {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 9) return 'morning'
  if (hour >= 9 && hour < 17) return 'day'
  if (hour >= 17 && hour < 20) return 'evening'
  return 'night'
}

/**
 * Generate random weather (simplified - could be enhanced with real weather API)
 */
function generateWeather() {
  const weathers = ['clear', 'cloudy', 'rainy']
  const weights = [0.6, 0.3, 0.1] // 60% clear, 30% cloudy, 10% rainy
  
  const random = Math.random()
  let cumulative = 0
  
  for (let i = 0; i < weathers.length; i++) {
    cumulative += weights[i]
    if (random < cumulative) return weathers[i]
  }
  
  return 'clear'
}

/**
 * Discovery Store - Manages species discoveries and exploration
 */
export const useDiscoveryStore = create(
  persist(
    (set, get) => ({
      // Discovered species/items
      discoveries: [], // { speciesId, discoveredAt, rarity, encounterConditions }

      // Current environmental conditions
      timeOfDay: calculateTimeOfDay(),
      weather: 'clear',

      // Exploration state
      lastExploreTime: null,
      exploreCooldown: 5000, // 5 seconds
      isExploring: false,

      // Current encounter (during exploration)
      currentEncounter: null,

      // Stats
      totalExplorations: 0,
      
      // Rarity counts
      rarityCounts: {
        common: 0,
        uncommon: 0,
        rare: 0,
        legendary: 0,
      },

      // Actions
      updateConditions: () => {
        set({
          timeOfDay: calculateTimeOfDay(),
          weather: generateWeather(),
        })
      },

      startExploration: () => {
        const state = get()
        if (!state.canExplore()) return false

        set({
          isExploring: true,
          lastExploreTime: Date.now(),
          totalExplorations: state.totalExplorations + 1,
        })
        return true
      },

      setCurrentEncounter: (encounter) => {
        set({ currentEncounter: encounter })
      },

      completeExploration: () => {
        set({
          isExploring: false,
        })
      },

      addDiscovery: (species) => {
        const state = get()
        
        // Check if already discovered
        const alreadyDiscovered = state.discoveries.some(
          (d) => d.speciesId === species.id
        )

        const discovery = {
          speciesId: species.id,
          discoveredAt: Date.now(),
          rarity: species.rarity,
          encounterConditions: {
            timeOfDay: state.timeOfDay,
            weather: state.weather,
          },
          isNew: !alreadyDiscovered,
        }

        // Update rarity counts
        const newRarityCounts = { ...state.rarityCounts }
        if (!alreadyDiscovered) {
          newRarityCounts[species.rarity] = (newRarityCounts[species.rarity] || 0) + 1
        }

        set({
          discoveries: [...state.discoveries, discovery],
          currentEncounter: null,
          isExploring: false,
          rarityCounts: newRarityCounts,
        })

        return discovery
      },

      canExplore: () => {
        const state = get()
        if (state.isExploring) return false
        if (!state.lastExploreTime) return true
        return Date.now() - state.lastExploreTime >= state.exploreCooldown
      },

      getTimeUntilNextExplore: () => {
        const state = get()
        if (state.canExplore()) return 0
        if (!state.lastExploreTime) return 0
        
        const timeSinceExplore = Date.now() - state.lastExploreTime
        return Math.max(0, state.exploreCooldown - timeSinceExplore)
      },

      // Get unique discovered species count
      getUniqueDiscoveryCount: () => {
        const state = get()
        const uniqueIds = new Set(state.discoveries.map((d) => d.speciesId))
        return uniqueIds.size
      },

      // Check if a species has been discovered
      hasDiscovered: (speciesId) => {
        return get().discoveries.some((d) => d.speciesId === speciesId)
      },

      // Get discovery by species ID
      getDiscovery: (speciesId) => {
        return get().discoveries.find((d) => d.speciesId === speciesId)
      },

      // Get all unique discoveries
      getUniqueDiscoveries: () => {
        const state = get()
        const uniqueMap = new Map()
        
        state.discoveries.forEach((d) => {
          if (!uniqueMap.has(d.speciesId)) {
            uniqueMap.set(d.speciesId, d)
          }
        })
        
        return Array.from(uniqueMap.values())
      },

      // Get discoveries by rarity
      getDiscoveriesByRarity: (rarity) => {
        return get().getUniqueDiscoveries().filter((d) => d.rarity === rarity)
      },

      // Cancel current exploration
      cancelExploration: () => {
        set({
          isExploring: false,
          currentEncounter: null,
        })
      },

      // Reset for testing
      resetProgress: () => {
        set({
          discoveries: [],
          timeOfDay: calculateTimeOfDay(),
          weather: 'clear',
          lastExploreTime: null,
          isExploring: false,
          currentEncounter: null,
          totalExplorations: 0,
          rarityCounts: {
            common: 0,
            uncommon: 0,
            rare: 0,
            legendary: 0,
          },
        })
      },
    }),
    {
      name: 'eco-game-discovery',
      version: 1,
      partialize: (state) => ({
        // Only persist these fields
        discoveries: state.discoveries,
        lastExploreTime: state.lastExploreTime,
        totalExplorations: state.totalExplorations,
        rarityCounts: state.rarityCounts,
      }),
    }
  )
)

export default useDiscoveryStore
