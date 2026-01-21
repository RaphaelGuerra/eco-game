import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/cn'

/**
 * Mascot states - Tuki the Toucan
 * Each state has a corresponding SVG/image and animation
 */
const MASCOT_STATES = {
  neutral: {
    emoji: '🦜',
    color: 'from-primary-400 to-primary-600',
  },
  happy: {
    emoji: '🦜',
    color: 'from-green-400 to-green-600',
  },
  cheering: {
    emoji: '🎉',
    color: 'from-amber-400 to-amber-600',
  },
  disappointed: {
    emoji: '😔',
    color: 'from-gray-400 to-gray-600',
  },
  thinking: {
    emoji: '🤔',
    color: 'from-blue-400 to-blue-600',
  },
  warning: {
    emoji: '⚠️',
    color: 'from-amber-400 to-red-500',
  },
  sleeping: {
    emoji: '😴',
    color: 'from-indigo-400 to-indigo-600',
  },
  excited: {
    emoji: '🤩',
    color: 'from-pink-400 to-purple-600',
  },
}

/**
 * Animation variants for different mascot states
 */
const animations = {
  neutral: {
    animate: {
      y: [0, -8, 0],
    },
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: 'easeInOut',
    },
  },
  happy: {
    animate: {
      y: [0, -12, 0],
      rotate: [-3, 3, -3],
    },
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
  cheering: {
    animate: {
      y: [0, -20, 0],
      rotate: [-5, 5, -5, 0],
      scale: [1, 1.1, 1],
    },
    transition: {
      repeat: 3,
      duration: 0.5,
    },
  },
  disappointed: {
    animate: {
      y: [0, 5, 0],
    },
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: 'easeInOut',
    },
  },
  thinking: {
    animate: {
      rotate: [-5, 5, -5],
    },
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: 'easeInOut',
    },
  },
  warning: {
    animate: {
      rotate: [-10, 10, -10, 10, 0],
      scale: [1, 1.1, 1, 1.1, 1],
    },
    transition: {
      repeat: Infinity,
      duration: 1,
    },
  },
  sleeping: {
    animate: {
      y: [0, 3, 0],
      scale: [1, 1.02, 1],
    },
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: 'easeInOut',
    },
  },
  excited: {
    animate: {
      y: [0, -15, 0, -10, 0],
      rotate: [0, -10, 10, -5, 0],
      scale: [1, 1.15, 1, 1.1, 1],
    },
    transition: {
      repeat: Infinity,
      duration: 1,
    },
  },
}

/**
 * Mascot component - Tuki the Toucan
 * 
 * @param {object} props
 * @param {'neutral'|'happy'|'cheering'|'disappointed'|'thinking'|'warning'|'sleeping'|'excited'} props.state
 * @param {'sm'|'md'|'lg'|'xl'} props.size
 * @param {boolean} props.animate - Enable animations
 * @param {string} props.message - Speech bubble message
 */
export default function Mascot({
  state = 'neutral',
  size = 'md',
  animate = true,
  message = null,
  className,
}) {
  const mascotConfig = MASCOT_STATES[state] || MASCOT_STATES.neutral
  const animation = animate ? animations[state] || animations.neutral : {}

  const sizeClasses = {
    sm: 'w-16 h-16 text-3xl',
    md: 'w-24 h-24 text-5xl',
    lg: 'w-32 h-32 text-6xl',
    xl: 'w-48 h-48 text-8xl',
  }

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {/* Mascot body */}
      <motion.div
        className={cn(
          'rounded-full flex items-center justify-center',
          'bg-gradient-to-br shadow-lg',
          mascotConfig.color,
          sizeClasses[size]
        )}
        {...animation}
      >
        <span role="img" aria-label="Tuki the Toucan">
          {mascotConfig.emoji}
        </span>
      </motion.div>

      {/* Speech bubble */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20 }}
            className="mt-3 relative"
          >
            {/* Speech bubble arrow */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 shadow-sm" />
            
            {/* Speech bubble content */}
            <div className="relative px-4 py-2 bg-white rounded-xl shadow-lg max-w-xs">
              <p className="text-gray-700 font-medium text-center">{message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * MascotWithDialog - Mascot with a dialog box below
 */
export function MascotWithDialog({
  state = 'neutral',
  size = 'md',
  title,
  message,
  animate = true,
  className,
}) {
  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <Mascot state={state} size={size} animate={animate} />
      
      {(title || message) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-sm"
        >
          {title && (
            <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
          )}
          {message && (
            <p className="text-gray-600">{message}</p>
          )}
        </motion.div>
      )}
    </div>
  )
}

/**
 * MascotReaction - Quick reaction animation overlay
 */
export function MascotReaction({ type, show, onComplete }) {
  const reactions = {
    correct: { emoji: '✨', color: 'text-green-500' },
    wrong: { emoji: '💔', color: 'text-red-500' },
    levelUp: { emoji: '🎉', color: 'text-amber-500' },
    discovery: { emoji: '🔍', color: 'text-blue-500' },
    streak: { emoji: '🔥', color: 'text-orange-500' },
  }

  const reaction = reactions[type] || reactions.correct

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={onComplete}
          className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        >
          <span className={cn('text-8xl', reaction.color)}>
            {reaction.emoji}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
