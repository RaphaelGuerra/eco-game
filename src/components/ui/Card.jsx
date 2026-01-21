import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

const variants = {
  default: 'bg-white shadow-game',
  elevated: 'bg-white shadow-game-lg',
  outlined: 'bg-white border-2 border-gray-200',
  ghost: 'bg-transparent',
  gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50',
  subtle: 'bg-gray-50 border border-gray-100',
}

/**
 * Card component with optional animation
 * 
 * @param {object} props
 * @param {'default'|'elevated'|'outlined'|'ghost'|'gradient'} props.variant
 * @param {boolean} props.interactive - Adds hover effects
 * @param {boolean} props.animate - Enables entrance animation
 * @param {'sm'|'md'|'lg'|'xl'|'2xl'} props.rounded
 * @param {'none'|'sm'|'md'|'lg'} props.padding
 */
const Card = forwardRef(function Card(
  {
    children,
    variant = 'default',
    interactive = false,
    animate = false,
    rounded = 'xl',
    padding = 'md',
    className,
    onClick,
    ...props
  },
  ref
) {
  const roundedClasses = {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
    '2xl': 'rounded-[2rem]',
  }

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }

  const animationProps = animate
    ? {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { type: 'spring', damping: 20, stiffness: 300 },
      }
    : {}

  const interactiveProps = interactive
    ? {
        whileHover: { scale: 1.01, y: -2 },
        whileTap: { scale: 0.98 },
        transition: { type: 'spring', stiffness: 400, damping: 17 },
      }
    : {}

  return (
    <motion.div
      ref={ref}
      className={cn(
        variants[variant],
        roundedClasses[rounded],
        paddingClasses[padding],
        interactive && 'cursor-pointer transition-all duration-200 hover:shadow-game-md active:shadow-game',
        className
      )}
      onClick={onClick}
      {...animationProps}
      {...interactiveProps}
      {...props}
    >
      {children}
    </motion.div>
  )
})

// Card subcomponents for structured content
const CardHeader = forwardRef(function CardHeader(
  { children, className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('mb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
})

const CardTitle = forwardRef(function CardTitle(
  { children, className, ...props },
  ref
) {
  return (
    <h3
      ref={ref}
      className={cn('text-lg font-bold text-gray-900', className)}
      {...props}
    >
      {children}
    </h3>
  )
})

const CardDescription = forwardRef(function CardDescription(
  { children, className, ...props },
  ref
) {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-gray-500 mt-1', className)}
      {...props}
    >
      {children}
    </p>
  )
})

const CardContent = forwardRef(function CardContent(
  { children, className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('', className)}
      {...props}
    >
      {children}
    </div>
  )
})

const CardFooter = forwardRef(function CardFooter(
  { children, className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('mt-4 flex items-center gap-2', className)}
      {...props}
    >
      {children}
    </div>
  )
})

const CardDivider = forwardRef(function CardDivider(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('border-t border-gray-100 my-4', className)}
      {...props}
    />
  )
})

// Attach subcomponents
Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent
Card.Footer = CardFooter
Card.Divider = CardDivider

export default Card
