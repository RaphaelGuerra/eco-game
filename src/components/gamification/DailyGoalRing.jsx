import { motion } from 'framer-motion'
import { Target, Check } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useUserStore } from '@/stores'
import { CircularProgress } from '@/components/ui/ProgressBar'

/**
 * DailyGoalRing - Circular progress for daily XP goal
 * 
 * @param {object} props
 * @param {'sm'|'md'|'lg'} props.size
 * @param {boolean} props.showLabel
 * @param {boolean} props.animated
 */
export default function DailyGoalRing({
  size = 'md',
  showLabel = true,
  animated = true,
  className,
}) {
  const dailyXPGoal = useUserStore((state) => state.dailyXPGoal)
  const dailyXPEarned = useUserStore((state) => state.dailyXPEarned)
  const isDailyGoalComplete = useUserStore((state) => state.isDailyGoalComplete)

  const isComplete = isDailyGoalComplete()
  const percentage = Math.min(100, (dailyXPEarned / dailyXPGoal) * 100)

  const sizeConfig = {
    sm: { ring: 48, stroke: 4, icon: 'w-4 h-4', text: 'text-xs' },
    md: { ring: 64, stroke: 5, icon: 'w-5 h-5', text: 'text-sm' },
    lg: { ring: 80, stroke: 6, icon: 'w-6 h-6', text: 'text-base' },
  }

  const config = sizeConfig[size]

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <CircularProgress
        value={dailyXPEarned}
        max={dailyXPGoal}
        size={config.ring}
        strokeWidth={config.stroke}
        color={isComplete ? 'success' : 'primary'}
        showLabel={false}
        animated={animated}
      >
        {isComplete ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Check className={cn(config.icon, 'text-green-500')} />
          </motion.div>
        ) : (
          <Target className={cn(config.icon, 'text-primary-500')} />
        )}
      </CircularProgress>

      {showLabel && (
        <div className="text-center">
          <p className={cn(config.text, 'font-bold text-gray-700')}>
            {dailyXPEarned} / {dailyXPGoal} XP
          </p>
          <p className="text-xs text-gray-500">
            {isComplete ? 'Goal complete!' : 'Daily goal'}
          </p>
        </div>
      )}
    </div>
  )
}

/**
 * DailyGoalBanner - Horizontal banner showing daily goal progress
 */
export function DailyGoalBanner({ className }) {
  const dailyXPGoal = useUserStore((state) => state.dailyXPGoal)
  const dailyXPEarned = useUserStore((state) => state.dailyXPEarned)
  const isDailyGoalComplete = useUserStore((state) => state.isDailyGoalComplete)

  const isComplete = isDailyGoalComplete()
  const percentage = Math.min(100, (dailyXPEarned / dailyXPGoal) * 100)
  const remaining = Math.max(0, dailyXPGoal - dailyXPEarned)

  return (
    <div
      className={cn(
        'p-4 rounded-xl',
        isComplete
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200'
          : 'bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200',
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {isComplete ? (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
            >
              <Check className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
          )}
          <div>
            <p className="font-bold text-gray-800">
              {isComplete ? 'Daily Goal Complete!' : 'Daily Goal'}
            </p>
            <p className="text-sm text-gray-500">
              {isComplete
                ? `You earned ${dailyXPEarned} XP today!`
                : `${remaining} XP to go`}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-extrabold text-gray-800">
            {dailyXPEarned}
          </p>
          <p className="text-sm text-gray-500">/ {dailyXPGoal} XP</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-white/50 rounded-full overflow-hidden">
        <motion.div
          className={cn(
            'h-full rounded-full',
            isComplete ? 'bg-green-500' : 'bg-primary-500'
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

/**
 * DailyGoalComplete - Celebration overlay when goal is reached
 */
export function DailyGoalComplete({ show, onClose }) {
  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 15 }}
        className="bg-white rounded-3xl p-8 mx-4 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center"
        >
          <Check className="w-10 h-10 text-green-500" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-extrabold text-gray-800 mb-2"
        >
          Daily Goal Complete!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 mb-6"
        >
          Great job! Keep up the momentum tomorrow.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onClose}
          className="px-8 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors"
        >
          Continue
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
