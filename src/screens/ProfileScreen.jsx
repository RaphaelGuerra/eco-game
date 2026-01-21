import { motion } from 'framer-motion'
import { Settings, Trophy, Target, Flame, Zap, Calendar, Search, Bird, Gem } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useUserStore, useLearningStore, useDiscoveryStore, useAchievementStore } from '@/stores'
import { Card, Button, Badge } from '@/components/ui'
import { XPBar } from '@/components/gamification'
import { TopBar, BottomNav } from '@/components/layout'
import { Mascot } from '@/components/mascot'

export default function ProfileScreen() {
  const navigate = useNavigate()
  
  const level = useUserStore((state) => state.level)
  const xp = useUserStore((state) => state.xp)
  const currentStreak = useUserStore((state) => state.currentStreak)
  const longestStreak = useUserStore((state) => state.longestStreak)
  const gems = useUserStore((state) => state.gems)
  
  const completedLessons = useLearningStore((state) => state.completedLessons)
  const completedUnits = useLearningStore((state) => state.completedUnits)
  
  const getUniqueDiscoveryCount = useDiscoveryStore((state) => state.getUniqueDiscoveryCount)
  const totalExplorations = useDiscoveryStore((state) => state.totalExplorations)
  
  const getUnlockedCount = useAchievementStore((state) => state.getUnlockedCount)
  const getTotalCount = useAchievementStore((state) => state.getTotalCount)

  const stats = [
    { icon: Zap, label: 'Total XP', value: xp.toLocaleString(), color: 'text-primary-500' },
    { icon: Flame, label: 'Current Streak', value: `${currentStreak} days`, color: 'text-orange-500' },
    { icon: Calendar, label: 'Longest Streak', value: `${longestStreak} days`, color: 'text-amber-500' },
    { icon: Target, label: 'Lessons Done', value: completedLessons.length, color: 'text-blue-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar
        rightContent={
          <button
            onClick={() => navigate('/settings')}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Settings className="w-5 h-5 text-gray-500" />
          </button>
        }
      />

      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Mascot state="happy" size="lg" />
          <h1 className="text-2xl font-extrabold text-gray-800 mt-4">
            Eco Explorer
          </h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            <Badge variant="primary" solid>
              <Zap className="w-3 h-3 mr-1" />
              Level {level}
            </Badge>
          </div>
        </motion.div>

        {/* XP Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <XPBar size="lg" showLevel showXP animated shimmer />
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3"
        >
          {stats.map((stat, index) => (
            <Card key={stat.label} className="text-center py-5">
              <div className={`w-10 h-10 mx-auto mb-3 rounded-xl bg-gray-50 flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </Card>
          ))}
        </motion.div>

        {/* Section Divider */}
        <div className="border-t border-gray-100" />

        {/* Achievements Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card
            interactive
            onClick={() => navigate('/achievements')}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Achievements</h3>
                <p className="text-sm text-gray-500">
                  {getUnlockedCount()} / {getTotalCount()} unlocked
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
          </Card>
        </motion.div>

        {/* Discoveries Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card
            interactive
            onClick={() => navigate('/collection')}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <Search className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Discoveries</h3>
                <p className="text-sm text-gray-500">
                  {getUniqueDiscoveryCount()} species found
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
              <Bird className="w-5 h-5 text-primary-400" />
            </div>
          </Card>
        </motion.div>

        {/* Section Divider */}
        <div className="border-t border-gray-100" />

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <h3 className="font-bold text-gray-800 mb-4">Journey Stats</h3>
            <div className="space-y-3">
              <StatRow label="Units Completed" value={completedUnits.length} />
              <StatRow label="Total Explorations" value={totalExplorations} />
              <StatRow label="Gems Earned" value={gems} icon={Gem} iconColor="text-cyan-500" />
            </div>
          </Card>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  )
}

function StatRow({ label, value, icon: Icon, iconColor }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-gray-600">{label}</span>
      <span className="font-bold text-gray-800 flex items-center gap-1">
        {Icon && <Icon className={`w-4 h-4 ${iconColor || 'text-gray-500'}`} />}
        {value}
      </span>
    </div>
  )
}
