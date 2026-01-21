import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { soundManager } from '@/lib/soundManager'
import { useUserStore, useDiscoveryStore, useSettingsStore } from '@/stores'

// Eager load Dashboard for fast initial render
import Dashboard from '@/screens/Dashboard'

// Lazy load other screens
const Onboarding = lazy(() => import('@/screens/Onboarding'))
const LearningPath = lazy(() => import('@/screens/LearningPath'))
const LessonScreen = lazy(() => import('@/screens/LessonScreen'))
const ExploreScreen = lazy(() => import('@/screens/ExploreScreen'))
const ProfileScreen = lazy(() => import('@/screens/ProfileScreen'))
const ShopScreen = lazy(() => import('@/screens/ShopScreen'))
const CollectionScreen = lazy(() => import('@/screens/CollectionScreen'))
const SettingsScreen = lazy(() => import('@/screens/SettingsScreen'))
const AchievementsScreen = lazy(() => import('@/screens/AchievementsScreen'))
const LeaderboardScreen = lazy(() => import('@/screens/LeaderboardScreen'))

// Loading fallback
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
        <p className="text-gray-500 font-medium">Loading...</p>
      </div>
    </div>
  )
}

// Protected route wrapper
function ProtectedRoute({ children }) {
  const hasCompletedOnboarding = useUserStore((state) => state.hasCompletedOnboarding)
  
  if (!hasCompletedOnboarding) {
    return <Navigate to="/onboarding" replace />
  }
  
  return children
}

export default function App() {
  const checkDailyReset = useUserStore((state) => state.checkDailyReset)
  const checkAndUpdateStreak = useUserStore((state) => state.checkAndUpdateStreak)
  const regenerateHearts = useUserStore((state) => state.regenerateHearts)
  const updateConditions = useDiscoveryStore((state) => state.updateConditions)

  // Settings
  const soundEnabled = useSettingsStore((state) => state.soundEnabled)
  const soundVolume = useSettingsStore((state) => state.soundVolume)
  const reducedMotion = useSettingsStore((state) => state.reducedMotion)

  // Initialize app on mount
  useEffect(() => {
    // Initialize sound manager
    soundManager.init()

    // Check daily reset
    checkDailyReset()

    // Check streak status
    checkAndUpdateStreak()

    // Regenerate hearts
    regenerateHearts()

    // Update environmental conditions
    updateConditions()

    // Set up periodic checks
    const interval = setInterval(() => {
      regenerateHearts()
      updateConditions()
    }, 60000) // Every minute

    return () => clearInterval(interval)
  }, [checkDailyReset, checkAndUpdateStreak, regenerateHearts, updateConditions])

  // Sync sound settings with sound manager
  useEffect(() => {
    soundManager.setMuted(!soundEnabled)
    soundManager.setVolume(soundVolume)
  }, [soundEnabled, soundVolume])

  // Apply reduced motion preference to document
  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add('reduce-motion')
    } else {
      document.documentElement.classList.remove('reduce-motion')
    }
  }, [reducedMotion])

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Onboarding - always accessible */}
            <Route path="/onboarding" element={<Onboarding />} />

            {/* Main app routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/learn" element={<LearningPath />} />
            <Route path="/lesson/:lessonId" element={<LessonScreen />} />
            <Route path="/explore" element={<ExploreScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shop" element={<ShopScreen />} />
            <Route path="/collection" element={<CollectionScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/achievements" element={<AchievementsScreen />} />
            <Route path="/leaderboard" element={<LeaderboardScreen />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </BrowserRouter>
  )
}
