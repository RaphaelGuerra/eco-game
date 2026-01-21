import { forwardRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/cn'

const colorVariants = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  purple: 'bg-purple-500',
  gradient: 'bg-gradient-to-r from-primary-400 to-secondary-500',
}

const bgVariants = {
  primary: 'bg-primary-100',
  secondary: 'bg-secondary-100',
  success: 'bg-green-100',
  warning: 'bg-amber-100',
  danger: 'bg-red-100',
  purple: 'bg-purple-100',
  gradient: 'bg-gray-200',
}

const sizeVariants = {
  xs: 'h-1',
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
  xl: 'h-6',
}

/**
 * ProgressBar component with animations
 * 
 * @param {object} props
 * @param {number} props.value - Current value (0-100 or custom max)
 * @param {number} props.max - Maximum value (default: 100)
 * @param {'primary'|'secondary'|'success'|'warning'|'danger'|'purple'|'gradient'} props.color
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} props.size
 * @param {boolean} props.showLabel - Show percentage label
 * @param {boolean} props.animated - Animate on value change
 * @param {boolean} props.shimmer - Add shimmer effect
 * @param {string} props.label - Custom label text
 */
const ProgressBar = forwardRef(function ProgressBar(
  {
    value = 0,
    max = 100,
    color = 'primary',
    size = 'md',
    showLabel = false,
    animated = true,
    shimmer = false,
    label,
    className,
    ...props
  },
  ref
) {
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value)
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  useEffect(() => {
    if (animated) {
      // Small delay for entrance animation
      const timer = setTimeout(() => {
        setDisplayValue(percentage)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setDisplayValue(percentage)
    }
  }, [percentage, animated])

  return (
    <div ref={ref} className={cn('w-full', className)} {...props}>
      {/* Label */}
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className="text-sm font-medium text-gray-700">{label}</span>
          )}
          {showLabel && (
            <span className="text-sm font-medium text-gray-500">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      {/* Progress track */}
      <div
        className={cn(
          'w-full rounded-full overflow-hidden',
          bgVariants[color],
          sizeVariants[size]
        )}
      >
        {/* Progress fill */}
        <motion.div
          className={cn(
            'h-full rounded-full relative',
            colorVariants[color]
          )}
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${displayValue}%` }}
          transition={{
            duration: animated ? 0.5 : 0,
            ease: 'easeOut',
          }}
        >
          {/* Shimmer effect */}
          {shimmer && displayValue > 0 && (
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'linear',
                }}
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
})

/**
 * Circular progress indicator
 */
export const CircularProgress = forwardRef(function CircularProgress(
  {
    value = 0,
    max = 100,
    size = 64,
    strokeWidth = 6,
    color = 'primary',
    showLabel = true,
    animated = true,
    className,
    children,
    ...props
  },
  ref
) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  const strokeColors = {
    primary: '#10b981',
    secondary: '#3b82f6',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    purple: '#a855f7',
  }

  return (
    <div
      ref={ref}
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColors[color]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={animated ? { strokeDashoffset: circumference } : { strokeDashoffset: offset }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: animated ? 0.5 : 0, ease: 'easeOut' }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children || (showLabel && (
          <span className="text-sm font-bold text-gray-700">
            {Math.round(percentage)}%
          </span>
        ))}
      </div>
    </div>
  )
})

/**
 * Segmented progress bar (like Duolingo lesson progress)
 */
export const SegmentedProgress = forwardRef(function SegmentedProgress(
  {
    current = 0,
    total = 5,
    color = 'primary',
    size = 'md',
    animated = true,
    className,
    ...props
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('flex gap-1 w-full', className)}
      {...props}
    >
      {Array.from({ length: total }).map((_, index) => (
        <motion.div
          key={index}
          className={cn(
            'flex-1 rounded-full',
            sizeVariants[size],
            index < current ? colorVariants[color] : bgVariants[color]
          )}
          initial={animated && index < current ? { scale: 0.8, opacity: 0 } : {}}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: animated ? index * 0.1 : 0,
            type: 'spring',
            stiffness: 300,
          }}
        />
      ))}
    </div>
  )
})

export default ProgressBar
