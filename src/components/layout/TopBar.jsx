import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import HeartDisplay from '@/components/gamification/HeartDisplay'
import StreakDisplay from '@/components/gamification/StreakDisplay'
import GemCounter from '@/components/gamification/GemCounter'

/**
 * TopBar - Header with game stats
 * 
 * @param {object} props
 * @param {boolean} props.showHearts
 * @param {boolean} props.showStreak
 * @param {boolean} props.showGems
 * @param {React.ReactNode} props.leftContent - Custom left content
 * @param {React.ReactNode} props.rightContent - Custom right content
 * @param {React.ReactNode} props.centerContent - Custom center content
 */
export default function TopBar({
  showHearts = true,
  showStreak = true,
  showGems = true,
  leftContent,
  rightContent,
  centerContent,
  className,
}) {
  return (
    <header
      className={cn(
        'sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100',
        'safe-top',
        className
      )}
    >
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        {/* Left section */}
        <div className="flex items-center gap-3">
          {leftContent || (
            <>
              {showStreak && <StreakDisplay size="sm" />}
            </>
          )}
        </div>

        {/* Center section */}
        <div className="flex-1 flex justify-center">
          {centerContent}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {rightContent || (
            <>
              {showGems && <GemCounter size="sm" />}
              {showHearts && <HeartDisplay size="sm" compact />}
            </>
          )}
        </div>
      </div>
    </header>
  )
}

/**
 * LessonTopBar - Simplified top bar for lesson screens
 */
export function LessonTopBar({
  progress,
  total,
  onClose,
  className,
}) {
  const percentage = (progress / total) * 100

  return (
    <header
      className={cn(
        'sticky top-0 z-30 bg-white border-b border-gray-100',
        'safe-top',
        className
      )}
    >
      <div className="flex items-center gap-4 h-14 px-4 max-w-lg mx-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Exit lesson"
        >
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Hearts */}
        <HeartDisplay size="sm" compact />
      </div>
    </header>
  )
}
