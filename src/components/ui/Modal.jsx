import { forwardRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'
import Button from './Button'

const sizeVariants = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]',
}

/**
 * Modal component with animations and portal rendering
 * 
 * @param {object} props
 * @param {boolean} props.isOpen - Whether modal is visible
 * @param {function} props.onClose - Close handler
 * @param {string} props.title - Modal title
 * @param {'sm'|'md'|'lg'|'xl'|'full'} props.size
 * @param {boolean} props.showCloseButton - Show X button
 * @param {boolean} props.closeOnBackdrop - Close when clicking backdrop
 * @param {boolean} props.closeOnEscape - Close on Escape key
 */
const Modal = forwardRef(function Modal(
  {
    isOpen,
    onClose,
    title,
    size = 'md',
    showCloseButton = true,
    closeOnBackdrop = true,
    closeOnEscape = true,
    children,
    className,
    ...props
  },
  ref
) {
  // Handle escape key
  const handleEscape = useCallback(
    (e) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose?.()
      }
    },
    [closeOnEscape, onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEscape])

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose?.()
    }
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
          />

          {/* Modal content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'relative w-full bg-white rounded-2xl shadow-xl',
              'max-h-[calc(100vh-2rem)] overflow-hidden',
              sizeVariants[size],
              className
            )}
            {...props}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                {title && (
                  <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="p-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  // Render in portal
  if (typeof window === 'undefined') return null
  return createPortal(modalContent, document.body)
})

/**
 * Alert Modal - Simple confirmation/alert dialog
 */
export function AlertModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'OK',
  cancelText = 'Cancel',
  variant = 'primary',
  showCancel = true,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
      <div className="text-center">
        {title && (
          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        )}
        {message && <p className="text-gray-600 mb-6">{message}</p>}

        <div className="flex gap-3 justify-center">
          {showCancel && (
            <Button variant="ghost" onClick={onClose}>
              {cancelText}
            </Button>
          )}
          <Button
            variant={variant}
            onClick={() => {
              onConfirm?.()
              onClose?.()
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

/**
 * Celebration Modal - For level ups, achievements, etc.
 */
export function CelebrationModal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  actionText = 'Continue',
  onAction,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
      <div className="text-center py-4">
        {/* Icon/Emoji */}
        {icon && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 10, stiffness: 100 }}
            className="text-6xl mb-4"
          >
            {icon}
          </motion.div>
        )}

        {/* Title */}
        {title && (
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-extrabold text-gray-900 mb-2"
          >
            {title}
          </motion.h3>
        )}

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 mb-4"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Custom content */}
        {children && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            {children}
          </motion.div>
        )}

        {/* Action button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => {
              onAction?.()
              onClose?.()
            }}
          >
            {actionText}
          </Button>
        </motion.div>
      </div>
    </Modal>
  )
}

export default Modal
