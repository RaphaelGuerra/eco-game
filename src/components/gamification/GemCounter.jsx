import { motion, AnimatePresence } from 'framer-motion'
import { Gem } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useUserStore } from '@/stores'

/**
 * GemCounter - Shows current gem balance
 * 
 * @param {object} props
 * @param {'sm'|'md'|'lg'} props.size
 * @param {boolean} props.showLabel
 * @param {boolean} props.animated
 */
export default function GemCounter({
  size = 'md',
  showLabel = false,
  animated = true,
  className,
}) {
  const gems = useUserStore((state) => state.gems)

  const sizeClasses = {
    sm: {
      icon: 'w-4 h-4',
      text: 'text-sm',
    },
    md: {
      icon: 'w-5 h-5',
      text: 'text-base',
    },
    lg: {
      icon: 'w-6 h-6',
      text: 'text-lg',
    },
  }

  const sizes = sizeClasses[size]

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-full',
        className
      )}
    >
      <motion.div
        animate={animated ? { rotate: [0, 10, -10, 0] } : {}}
        transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
      >
        <Gem className={cn(sizes.icon, 'text-amber-500 fill-amber-400')} />
      </motion.div>
      
      <span className={cn(sizes.text, 'font-bold text-amber-700')}>
        {gems.toLocaleString()}
      </span>
      
      {showLabel && (
        <span className="text-sm text-amber-600">gems</span>
      )}
    </div>
  )
}

/**
 * GemGainAnimation - Floating gem gain indicator
 */
export function GemGainAnimation({ amount, show, onComplete }) {
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
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-full shadow-lg">
            <Gem className="w-5 h-5 fill-white" />
            <span className="font-bold text-lg">+{amount}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * GemSpendAnimation - Animation when spending gems
 */
export function GemSpendAnimation({ amount, show, onComplete }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 0, y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={onComplete}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-full shadow-lg">
            <Gem className="w-5 h-5 fill-white" />
            <span className="font-bold text-lg">-{amount}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * GemPrice - Display gem cost for items
 */
export function GemPrice({ amount, affordable = true, size = 'md', className }) {
  const sizeClasses = {
    sm: { icon: 'w-3 h-3', text: 'text-xs' },
    md: { icon: 'w-4 h-4', text: 'text-sm' },
    lg: { icon: 'w-5 h-5', text: 'text-base' },
  }

  const sizes = sizeClasses[size]

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full',
        affordable ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-400',
        className
      )}
    >
      <Gem
        className={cn(
          sizes.icon,
          affordable ? 'text-amber-500 fill-amber-400' : 'text-gray-400 fill-gray-300'
        )}
      />
      <span className={cn(sizes.text, 'font-bold')}>{amount}</span>
    </div>
  )
}
