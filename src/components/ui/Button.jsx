import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/cn'
import { soundManager } from '@/lib/soundManager'
import { useSettingsStore } from '@/stores'

const variants = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500',
  secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white focus:ring-secondary-500',
  outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
  ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
  danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
  success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500',
  amber: 'bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-500',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2 text-base rounded-xl',
  lg: 'px-6 py-3 text-lg rounded-xl',
  xl: 'px-8 py-4 text-xl rounded-2xl',
  icon: 'p-2 rounded-xl',
}

/**
 * Button component with Framer Motion animations
 * 
 * @param {object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'|'danger'|'success'|'amber'} props.variant
 * @param {'sm'|'md'|'lg'|'xl'|'icon'} props.size
 * @param {boolean} props.disabled
 * @param {boolean} props.loading
 * @param {boolean} props.fullWidth
 * @param {boolean} props.playSound - Whether to play click sound (default: true)
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
    leftIcon,
    rightIcon,
    className,
    onClick,
    ...props
  },
  ref
) {
  const soundEnabled = useSettingsStore((state) => state.soundEnabled)

  const handleClick = (e) => {
    if (disabled || loading) return
    
    if (playSound && soundEnabled) {
      soundManager.play('buttonPress')
    }
    
    onClick?.(e)
  }

  const isDisabled = disabled || loading

  return (
    <motion.button
      ref={ref}
      whileTap={isDisabled ? {} : { scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={cn(
        'font-bold transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none',
        'inline-flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        !isDisabled && 'hover:shadow-sm active:shadow-none',
        className
      )}
      disabled={isDisabled}
      onClick={handleClick}
      {...props}
    >
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
    </motion.button>
  )
})

export default Button
