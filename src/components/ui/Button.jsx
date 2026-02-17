import { forwardRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/cn'
import { soundManager } from '@/lib/soundManager'
import { useSettingsStore } from '@/stores'

const variants = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500 dark:bg-primary-600 dark:hover:bg-primary-500',
  secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white focus:ring-secondary-500 dark:bg-secondary-600 dark:hover:bg-secondary-500',
  outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/30',
  ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-700',
  danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-500',
  success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-500',
  amber: 'bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-500 dark:bg-amber-600 dark:hover:bg-amber-500',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2 text-base rounded-xl',
  lg: 'px-6 py-3 text-lg rounded-xl',
  xl: 'px-8 py-4 text-xl rounded-2xl',
  icon: 'p-2 rounded-xl',
}

/**
 * Button component with Framer Motion animations and ripple effect
 *
 * @param {object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'|'danger'|'success'|'amber'} props.variant
 * @param {'sm'|'md'|'lg'|'xl'|'icon'} props.size
 * @param {boolean} props.disabled
 * @param {boolean} props.loading
 * @param {boolean} props.fullWidth
 * @param {boolean} props.playSound - Whether to play click sound (default: true)
 * @param {boolean} props.ripple - Whether to show ripple effect (default: true)
 * @param {React.ReactNode} props.leftIcon
 * @param {React.ReactNode} props.rightIcon
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    playSound = true,
    ripple = true,
    leftIcon,
    rightIcon,
    className,
    onClick,
    ...props
  },
  ref
) {
  const soundEnabled = useSettingsStore((state) => state.soundEnabled)
  const reducedMotion = useSettingsStore((state) => state.reducedMotion)
  const [ripples, setRipples] = useState([])

  const addRipple = useCallback((e) => {
    if (!ripple || reducedMotion) return

    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    }

    setRipples((prev) => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 600)
  }, [ripple, reducedMotion])

  const handleClick = (e) => {
    if (disabled || loading) return

    addRipple(e)

    if (playSound && soundEnabled) {
      soundManager.play('buttonPress')
    }

    onClick?.(e)
  }

  const isDisabled = disabled || loading

  return (
    <motion.button
      ref={ref}
      whileTap={isDisabled || reducedMotion ? {} : { scale: 0.96 }}
      whileHover={isDisabled || reducedMotion ? {} : { scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={cn(
        'font-bold transition-all duration-200 relative overflow-hidden',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none',
        'inline-flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        !isDisabled && 'hover:shadow-md active:shadow-sm',
        className
      )}
      disabled={isDisabled}
      onClick={handleClick}
      {...props}
    >
      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              width: r.size,
              height: r.size,
              left: r.x,
              top: r.y,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Button content */}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </span>
    </motion.button>
  )
})

export default Button
