import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useUserStore } from '@/stores'

/**
 * HeartDisplay - Shows current hearts with animations
 * 
 * @param {object} props
 * @param {'sm'|'md'|'lg'} props.size
 * @param {boolean} props.showTimer - Show time until next heart
 * @param {boolean} props.compact - Compact display mode
 */
export default function HeartDisplay({
  size = 'md',
  showTimer = false,
  compact = false,
  className,
}) {
  const hearts = useUserStore((state) => state.hearts)
  const maxHearts = useUserStore((state) => state.maxHearts)
  const getTimeUntilNextHeart = useUserStore((state) => state.getTimeUntilNextHeart)
  const regenerateHearts = useUserStore((state) => state.regenerateHearts)

  const [timeUntilNext, setTimeUntilNext] = useState(null)
  const [shakingIndex, setShakingIndex] = useState(null)

  // Check for heart regeneration on mount and periodically
  useEffect(() => {
    regenerateHearts()
    
    const interval = setInterval(() => {
      regenerateHearts()
      setTimeUntilNext(getTimeUntilNextHeart())
    }, 1000)

    return () => clearInterval(interval)
  }, [regenerateHearts, getTimeUntilNextHeart])

  // Format time remaining
  const formatTime = (ms) => {
    if (!ms) return null
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const heartSize = sizeClasses[size]

  if (compact) {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        <Heart
          className={cn(heartSize, 'text-accent-coral fill-accent-coral')}
        />
        <span className="font-bold text-gray-700">
          {hearts}/{maxHearts}
        </span>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      {/* Hearts row */}
      <div className="flex items-center gap-1">
        {Array.from({ length: maxHearts }).map((_, index) => {
          const isFilled = index < hearts
          const isShaking = shakingIndex === index

          return (
            <motion.div
              key={index}
              animate={
                isShaking
                  ? {
                      scale: [1, 1.2, 0.8, 1],
                      rotate: [0, -10, 10, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={cn(
                  heartSize,
                  'transition-colors duration-300',
                  isFilled
                    ? 'text-accent-coral fill-accent-coral'
                    : 'text-gray-300 fill-gray-200'
                )}
              />
            </motion.div>
          )
        })}
      </div>

      {/* Timer */}
      {showTimer && hearts < maxHearts && timeUntilNext && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-gray-500"
        >
          Next in {formatTime(timeUntilNext)}
        </motion.div>
      )}
    </div>
  )
}

/**
 * HeartLossAnimation - Overlay animation when losing a heart
 */
export function HeartLossAnimation({ show, onComplete }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 2, y: 0 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [2, 1.5, 1, 0.5], y: [0, -50, -100, -150] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          onAnimationComplete={onComplete}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        >
          <Heart className="w-16 h-16 text-accent-coral fill-accent-coral" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * HeartGainAnimation - Overlay animation when gaining a heart
 */
export function HeartGainAnimation({ show, onComplete }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.5, 1.2, 1], y: [50, 0, -20, -50] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          onAnimationComplete={onComplete}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        >
          <Heart className="w-16 h-16 text-accent-coral fill-accent-coral" />
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 2, 2.5], opacity: [0.5, 0.3, 0] }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 rounded-full bg-accent-coral"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
