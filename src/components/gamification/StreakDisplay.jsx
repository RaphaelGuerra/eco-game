import { motion } from 'framer-motion'
import { Flame, Snowflake } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useUserStore } from '@/stores'

/**
 * StreakDisplay - Shows current streak with flame animation
 * 
 * @param {object} props
 * @param {'sm'|'md'|'lg'} props.size
 * @param {boolean} props.showLabel - Show "day streak" label
 * @param {boolean} props.showFreezes - Show streak freeze count
 * @param {boolean} props.animate - Enable flame animation
 */
export default function StreakDisplay({
  size = 'md',
  showLabel = false,
  showFreezes = false,
  animate = true,
  className,
}) {
  const currentStreak = useUserStore((state) => state.currentStreak)
  const streakFreezes = useUserStore((state) => state.streakFreezes)
  const isStreakAtRisk = useUserStore((state) => state.isStreakAtRisk)

  const atRisk = isStreakAtRisk()

  const sizeClasses = {
    sm: {
      icon: 'w-5 h-5',
      text: 'text-lg',
      label: 'text-xs',
    },
    md: {
      icon: 'w-6 h-6',
      text: 'text-xl',
      label: 'text-sm',
    },
    lg: {
      icon: 'w-8 h-8',
      text: 'text-2xl',
      label: 'text-base',
    },
  }

  const sizes = sizeClasses[size]

  // Flame animation variants
  const flameAnimation = animate
    ? {
        animate: {
          scale: [1, 1.1, 1, 1.05, 1],
          rotate: [-2, 2, -2, 0],
        },
        transition: {
          repeat: Infinity,
          duration: 1.5,
        },
      }
    : {}

  // At-risk pulse animation
  const atRiskAnimation = atRisk
    ? {
        animate: {
          opacity: [1, 0.5, 1],
        },
        transition: {
          repeat: Infinity,
          duration: 1,
        },
      }
    : {}

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Flame icon */}
      <motion.div
        className={cn(
          'relative',
          currentStreak > 0 ? 'streak-glow' : ''
        )}
        {...flameAnimation}
        {...atRiskAnimation}
      >
        <Flame
          className={cn(
            sizes.icon,
            currentStreak > 0
              ? 'text-accent-coral fill-accent-coral'
              : 'text-gray-300 fill-gray-200'
          )}
        />
        
        {/* At-risk indicator */}
        {atRisk && currentStreak > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-white"
          />
        )}
      </motion.div>

      {/* Streak count */}
      <div className="flex flex-col">
        <span
          className={cn(
            sizes.text,
            'font-extrabold leading-none',
            currentStreak > 0 ? 'text-gray-900' : 'text-gray-400'
          )}
        >
          {currentStreak}
        </span>
        
        {showLabel && (
          <span className={cn(sizes.label, 'text-gray-500')}>
            {currentStreak === 1 ? 'day' : 'days'}
          </span>
        )}
      </div>

      {/* Streak freezes */}
      {showFreezes && streakFreezes > 0 && (
        <div className="flex items-center gap-1 ml-2 px-2 py-1 bg-blue-100 rounded-full">
          <Snowflake className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-bold text-blue-600">{streakFreezes}</span>
        </div>
      )}
    </div>
  )
}

/**
 * StreakMilestone - Celebration display for streak milestones
 */
export function StreakMilestone({ streak, className }) {
  const milestones = [3, 7, 14, 30, 60, 100, 365]
  const isMilestone = milestones.includes(streak)

  if (!isMilestone) return null

  const milestoneEmojis = {
    3: '🔥',
    7: '⭐',
    14: '🌟',
    30: '🏆',
    60: '💎',
    100: '👑',
    365: '🎉',
  }

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', damping: 10 }}
      className={cn(
        'flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl',
        className
      )}
    >
      <span className="text-2xl">{milestoneEmojis[streak]}</span>
      <div>
        <p className="font-bold text-amber-800">{streak} Day Streak!</p>
        <p className="text-sm text-amber-600">Keep it going!</p>
      </div>
    </motion.div>
  )
}

/**
 * StreakWarning - Warning display when streak is at risk
 */
export function StreakWarning({ className }) {
  const currentStreak = useUserStore((state) => state.currentStreak)
  const isStreakAtRisk = useUserStore((state) => state.isStreakAtRisk)

  if (!isStreakAtRisk() || currentStreak === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl',
        className
      )}
    >
      <motion.div
        animate={{ rotate: [-5, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 0.5 }}
      >
        <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
      </motion.div>
      <div>
        <p className="font-bold text-amber-800">Your streak is at risk!</p>
        <p className="text-sm text-amber-600">
          Complete a lesson today to keep your {currentStreak}-day streak
        </p>
      </div>
    </motion.div>
  )
}
