import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

const variants = {
  primary: 'bg-primary-100 text-primary-700',
  secondary: 'bg-secondary-100 text-secondary-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  purple: 'bg-purple-100 text-purple-700',
  gray: 'bg-gray-100 text-gray-700',
}

const solidVariants = {
  primary: 'bg-primary-500 text-white',
  secondary: 'bg-secondary-500 text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-amber-500 text-white',
  danger: 'bg-red-500 text-white',
  purple: 'bg-purple-500 text-white',
  gray: 'bg-gray-500 text-white',
}

const sizes = {
  xs: 'px-1.5 py-0.5 text-xs',
  sm: 'px-2 py-0.5 text-sm',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
}

/**
 * Badge component for labels, tags, and status indicators
 * 
 * @param {object} props
 * @param {'primary'|'secondary'|'success'|'warning'|'danger'|'purple'|'gray'} props.variant
 * @param {'xs'|'sm'|'md'|'lg'} props.size
 * @param {boolean} props.solid - Use solid background instead of light
 * @param {boolean} props.pill - Use fully rounded corners
 * @param {boolean} props.animate - Entrance animation
 * @param {React.ReactNode} props.icon - Icon to display before text
 */
const Badge = forwardRef(function Badge(
  {
    children,
    variant = 'primary',
    size = 'sm',
    solid = false,
    pill = true,
    animate = false,
    icon,
    className,
    ...props
  },
  ref
) {
  const Component = animate ? motion.span : 'span'
  const animationProps = animate
    ? {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }
    : {}

  return (
    <Component
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 font-semibold',
        solid ? solidVariants[variant] : variants[variant],
        sizes[size],
        pill ? 'rounded-full' : 'rounded-md',
        className
      )}
      {...animationProps}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </Component>
  )
})

/**
 * Rarity badge for species/items
 */
export function RarityBadge({ rarity, size = 'sm', ...props }) {
  const rarityConfig = {
    common: { variant: 'gray', label: 'Common' },
    uncommon: { variant: 'primary', label: 'Uncommon' },
    rare: { variant: 'secondary', label: 'Rare' },
    legendary: { variant: 'purple', label: 'Legendary' },
  }

  const config = rarityConfig[rarity] || rarityConfig.common

  return (
    <Badge variant={config.variant} size={size} solid {...props}>
      {config.label}
    </Badge>
  )
}

/**
 * XP badge with icon
 */
export function XPBadge({ amount, size = 'sm', ...props }) {
  return (
    <Badge variant="success" size={size} solid {...props}>
      +{amount} XP
    </Badge>
  )
}

/**
 * Streak badge with flame
 */
export function StreakBadge({ count, size = 'sm', ...props }) {
  return (
    <Badge variant="warning" size={size} solid icon="🔥" {...props}>
      {count} day streak
    </Badge>
  )
}

/**
 * New badge for recently discovered items
 */
export function NewBadge({ size = 'xs', ...props }) {
  return (
    <Badge variant="danger" size={size} solid animate {...props}>
      NEW
    </Badge>
  )
}

export default Badge
