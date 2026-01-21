import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Zap } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useUserStore } from '@/stores'

/**
 * XPBar - Shows level progress with animations
 * 
 * @param {object} props
 * @param {'sm'|'md'|'lg'} props.size
 * @param {boolean} props.showLevel - Show level number
 * @param {boolean} props.showXP - Show XP numbers
 * @param {boolean} props.animated - Enable animations
 * @param {boolean} props.shimmer - Add shimmer effect
 */
export default function XPBar({
  size = 'md',
  showLevel = true,
  showXP = true,
  animated = true,
  shimmer = true,
  className,
}) {
  const level = useUserStore((state) => state.level)
  const getLevelProgress = useUserStore((state) => state.getLevelProgress)
  
  const progress = getLevelProgress()
  const [displayProgress, setDisplayProgress] = useState(animated ? 0 : progress.percentage)

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayProgress(progress.percentage)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setDisplayProgress(progress.percentage)
    }
  }, [progress.percentage, animated])

  const sizeClasses = {
    sm: {
      bar: 'h-2',
      level: 'w-6 h-6 text-xs',
      text: 'text-xs',
    },
    md: {
      bar: 'h-3',
      level: 'w-8 h-8 text-sm',
      text: 'text-sm',
    },
    lg: {
      bar: 'h-4',
      level: 'w-10 h-10 text-base',
      text: 'text-base',
    },
  }

  const sizes = sizeClasses[size]

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Level badge */}
      {showLevel && (
        <motion.div
          className={cn(
            'flex items-center justify-center rounded-full',
            'bg-gradient-to-br from-primary-400 to-primary-600',
            'text-white font-bold shadow-md',
            sizes.level
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {level}
        </motion.div>
      )}

      {/* Progress bar container */}
      <div className="flex-1">
        {/* XP text */}
        {showXP && (
          <div className={cn('flex justify-between mb-1', sizes.text)}>
            <span className="text-gray-500">Level {level}</span>
            <span className="text-gray-700 font-medium">
              {progress.current} / {progress.needed} XP
            </span>
          </div>
        )}

        {/* Progress bar */}
        <div
          className={cn(
            'w-full bg-gray-200 rounded-full overflow-hidden',
            sizes.bar
          )}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary-400 to-primary-500 rounded-full relative"
            initial={animated ? { width: 0 } : { width: `${progress.percentage}%` }}
            animate={{ width: `${displayProgress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Shimmer effect */}
            {shimmer && displayProgress > 0 && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/**
 * XPGainPopup - Floating XP gain indicator
 */
export function XPGainPopup({ amount, show, onComplete, position = 'center' }) {
  const positionClasses = {
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    top: 'top-20 left-1/2 -translate-x-1/2',
    bottom: 'bottom-20 left-1/2 -translate-x-1/2',
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0, y: -30, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onAnimationComplete={() => {
            setTimeout(onComplete, 500)
          }}
          className={cn(
            'fixed z-50 pointer-events-none',
            positionClasses[position]
          )}
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-full shadow-lg">
            <Zap className="w-5 h-5 fill-white" />
            <span className="font-bold text-lg">+{amount} XP</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * LevelUpCelebration - Full screen level up animation
 */
export function LevelUpCelebration({ level, show, onComplete }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onComplete}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', damping: 10, stiffness: 100 }}
            className="flex flex-col items-center gap-4 p-8 bg-white rounded-3xl shadow-2xl"
          >
            {/* Star burst */}
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative"
            >
              <Star className="w-20 h-20 text-amber-400 fill-amber-400" />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-amber-400"
              />
            </motion.div>

            {/* Level text */}
            <div className="text-center">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-500 font-medium"
              >
                Level Up!
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-5xl font-extrabold text-primary-600"
              >
                {level}
              </motion.p>
            </div>

            {/* Continue hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-gray-400"
            >
              Tap to continue
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * Compact XP display for headers
 */
export function XPCompact({ className }) {
  const xp = useUserStore((state) => state.xp)
  const level = useUserStore((state) => state.level)

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-500 text-white text-xs font-bold">
        {level}
      </div>
      <span className="text-sm font-medium text-gray-600">{xp} XP</span>
    </div>
  )
}
