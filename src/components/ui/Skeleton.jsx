import { cn } from '@/lib/cn'

/**
 * Skeleton loading placeholder with shimmer effect
 * Use for content that's loading to improve perceived performance
 */
export default function Skeleton({
  className,
  variant = 'default',
  width,
  height,
  rounded = 'md',
  ...props
}) {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  }

  const variantClasses = {
    default: 'bg-gray-200 dark:bg-gray-700',
    light: 'bg-gray-100 dark:bg-gray-800',
    dark: 'bg-gray-300 dark:bg-gray-600',
  }

  return (
    <div
      className={cn(
        'animate-pulse relative overflow-hidden',
        variantClasses[variant],
        roundedClasses[rounded],
        className
      )}
      style={{ width, height }}
      {...props}
    >
      {/* Shimmer overlay */}
      <div
        className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{
          animation: 'shimmer 2s infinite',
        }}
      />
    </div>
  )
}

/**
 * Skeleton for text content
 */
export function SkeletonText({ lines = 3, className }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={16}
          className={i === lines - 1 ? 'w-3/4' : 'w-full'}
        />
      ))}
    </div>
  )
}

/**
 * Skeleton for avatar/image
 */
export function SkeletonAvatar({ size = 'md', className }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  }

  return (
    <Skeleton
      rounded="full"
      className={cn(sizeClasses[size], className)}
    />
  )
}

/**
 * Skeleton for cards (like collection items)
 */
export function SkeletonCard({ className }) {
  return (
    <div
      className={cn(
        'p-4 bg-white dark:bg-gray-800 rounded-xl space-y-3',
        className
      )}
    >
      <SkeletonAvatar size="lg" className="mx-auto" />
      <Skeleton height={20} className="w-3/4 mx-auto" />
      <Skeleton height={16} className="w-1/2 mx-auto" />
    </div>
  )
}

/**
 * Skeleton grid for collection loading
 */
export function SkeletonGrid({ count = 6, columns = 2, className }) {
  return (
    <div
      className={cn(
        'grid gap-3',
        columns === 2 && 'grid-cols-2',
        columns === 3 && 'grid-cols-3',
        columns === 4 && 'grid-cols-4',
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
