import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Lock, Check, Flame, BookOpen, Search, TrendingUp, Star } from 'lucide-react'
import { useAchievementStore, ACHIEVEMENTS } from '@/stores/achievementStore'
import { Card, Badge } from '@/components/ui'
import { TopBar, BottomNav } from '@/components/layout'

const CATEGORY_CONFIG = {
  streak: { label: 'Streak', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100' },
  learning: { label: 'Learning', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-100' },
  discovery: { label: 'Discovery', icon: Search, color: 'text-green-500', bg: 'bg-green-100' },
  progress: { label: 'Progress', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-100' },
  special: { label: 'Special', icon: Star, color: 'text-amber-500', bg: 'bg-amber-100' },
}

export default function AchievementsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const unlockedAchievements = useAchievementStore((state) => state.unlockedAchievements)
  const getUnlockedCount = useAchievementStore((state) => state.getUnlockedCount)
  const getTotalCount = useAchievementStore((state) => state.getTotalCount)

  const isUnlocked = (achievementId) =>
    unlockedAchievements.some((a) => a.achievementId === achievementId)

  const getUnlockedDate = (achievementId) => {
    const unlock = unlockedAchievements.find((a) => a.achievementId === achievementId)
    return unlock ? new Date(unlock.unlockedAt).toLocaleDateString() : null
  }

  const categories = ['all', ...Object.keys(CATEGORY_CONFIG)]

  const filteredAchievements = Object.values(ACHIEVEMENTS).filter(
    (a) => selectedCategory === 'all' || a.category === selectedCategory
  )

  const unlockedCount = getUnlockedCount()
  const totalCount = getTotalCount()
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100)

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar
        centerContent={
          <h1 className="text-lg font-bold text-gray-800">Achievements</h1>
        }
      />

      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Progress Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="text-center bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-amber-100 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-amber-500" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800">
              {unlockedCount} / {totalCount}
            </h2>
            <p className="text-gray-500">Achievements Unlocked</p>

            {/* Progress bar */}
            <div className="mt-4 h-3 bg-white/50 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {completionPercentage}% complete
            </p>
          </Card>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        >
          {categories.map((cat) => {
            const config = CATEGORY_CONFIG[cat]
            const isSelected = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                  isSelected
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat === 'all' ? 'All' : config?.label}
              </button>
            )
          })}
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredAchievements.map((achievement, index) => {
              const unlocked = isUnlocked(achievement.id)
              const unlockedDate = getUnlockedDate(achievement.id)
              const categoryConfig = CATEGORY_CONFIG[achievement.category]

              return (
                <motion.div
                  key={achievement.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <AchievementCard
                    achievement={achievement}
                    unlocked={unlocked}
                    unlockedDate={unlockedDate}
                    categoryConfig={categoryConfig}
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  )
}

function AchievementCard({ achievement, unlocked, unlockedDate, categoryConfig }) {
  return (
    <Card
      className={`flex items-center gap-4 transition-all ${
        !unlocked ? 'bg-gray-50' : ''
      }`}
    >
      {/* Icon */}
      <div
        className={`relative w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
          unlocked
            ? categoryConfig?.bg || 'bg-gray-100'
            : 'bg-gray-200 grayscale'
        }`}
      >
        {unlocked ? (
          achievement.icon
        ) : (
          <Lock className="w-6 h-6 text-gray-400" />
        )}
        {unlocked && (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3
            className={`font-bold truncate ${
              unlocked ? 'text-gray-800' : 'text-gray-500'
            }`}
          >
            {achievement.title}
          </h3>
        </div>
        <p
          className={`text-sm ${
            unlocked ? 'text-gray-500' : 'text-gray-400'
          }`}
        >
          {achievement.description}
        </p>
        {unlockedDate && (
          <p className="text-xs text-primary-500 mt-1">
            Unlocked {unlockedDate}
          </p>
        )}
      </div>

      {/* Category badge */}
      {categoryConfig && (
        <Badge
          variant={unlocked ? 'primary' : 'gray'}
          size="xs"
          className={!unlocked ? 'opacity-50' : ''}
        >
          {categoryConfig.label}
        </Badge>
      )}
    </Card>
  )
}
