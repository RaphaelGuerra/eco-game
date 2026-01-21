import { motion } from 'framer-motion'
import { Compass, ChevronRight, Trophy, BookOpen, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { useUserStore } from '@/stores'
import { Button, Card } from '@/components/ui'
import { XPBar, DailyGoalRing, StreakWarning } from '@/components/gamification'
import { Mascot } from '@/components/mascot'
import { TopBar, BottomNav } from '@/components/layout'

/**
 * Dashboard - Main home screen
 */
export default function Dashboard() {
  const navigate = useNavigate()
  const hasCompletedOnboarding = useUserStore((state) => state.hasCompletedOnboarding)
  const currentStreak = useUserStore((state) => state.currentStreak)
  const isStreakAtRisk = useUserStore((state) => state.isStreakAtRisk)

  // Redirect to onboarding if not completed
  // useEffect(() => {
  //   if (!hasCompletedOnboarding) {
  //     navigate('/onboarding')
  //   }
  // }, [hasCompletedOnboarding, navigate])

  const getMascotState = () => {
    if (isStreakAtRisk()) return 'warning'
    if (currentStreak >= 7) return 'excited'
    if (currentStreak >= 3) return 'happy'
    return 'neutral'
  }

  const getMascotMessage = () => {
    if (isStreakAtRisk()) return "Don't lose your streak! 🔥"
    if (currentStreak >= 7) return "Amazing streak! Keep going! 🎉"
    if (currentStreak >= 3) return "You're doing great! 💪"
    return "Ready to explore? 🌿"
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar />

      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Streak Warning */}
        <StreakWarning />

        {/* Welcome & Mascot Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center py-4"
        >
          <Mascot
            state={getMascotState()}
            size="lg"
            message={getMascotMessage()}
          />
        </motion.div>

        {/* XP Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <XPBar size="md" showLevel showXP animated shimmer />
          </Card>
        </motion.div>

        {/* Daily Goal & Explore */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          {/* Daily Goal */}
          <Card className="flex flex-col items-center justify-center py-6 min-h-[140px]">
            <DailyGoalRing size="md" showLabel />
          </Card>

          {/* Explore Button */}
          <Card
            interactive
            className="flex flex-col items-center justify-center py-6 min-h-[140px] bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-100"
            onClick={() => navigate('/explore')}
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 0 0 rgba(16, 185, 129, 0.4)',
                  '0 0 0 15px rgba(16, 185, 129, 0)',
                  '0 0 0 0 rgba(16, 185, 129, 0)',
                ],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-14 h-14 rounded-full bg-primary-500 flex items-center justify-center mb-3 shadow-primary"
            >
              <Compass className="w-7 h-7 text-white" />
            </motion.div>
            <span className="font-bold text-gray-700">Explore</span>
            <span className="text-xs text-gray-500">Discover wildlife</span>
          </Card>
        </motion.div>

        {/* Section Divider */}
        <div className="border-t border-gray-100" />

        {/* Continue Learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card
            interactive
            onClick={() => navigate('/learn')}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-secondary-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Continue Learning</h3>
                <p className="text-sm text-gray-500">
                  Welcome to Paradise • Lesson 1
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Card>
        </motion.div>

        {/* Section Divider */}
        <div className="border-t border-gray-100" />

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-3"
        >
          <QuickActionCard
            icon={Trophy}
            iconColor="text-amber-500"
            iconBg="bg-amber-50"
            label="Leaderboard"
            onClick={() => navigate('/leaderboard')}
          />
          <QuickActionCard
            icon={BookOpen}
            iconColor="text-primary-500"
            iconBg="bg-primary-50"
            label="Collection"
            onClick={() => navigate('/collection')}
          />
          <QuickActionCard
            icon={Settings}
            iconColor="text-gray-500"
            iconBg="bg-gray-100"
            label="Settings"
            onClick={() => navigate('/settings')}
          />
        </motion.div>
      </main>

      <BottomNav />
    </div>
  )
}

function QuickActionCard({ icon: Icon, iconColor, iconBg, label, onClick }) {
  return (
    <Card
      interactive
      className="flex flex-col items-center p-4"
      onClick={onClick}
    >
      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-2', iconBg)}>
        <Icon className={cn('w-5 h-5', iconColor)} />
      </div>
      <span className="text-xs font-medium text-gray-600">{label}</span>
    </Card>
  )
}
