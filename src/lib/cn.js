import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes with tailwind-merge for deduplication
 * 
 * @param {...(string|object|array)} inputs - Class names, objects, or arrays
 * @returns {string} Merged class string
 * 
 * @example
 * cn('px-4 py-2', isActive && 'bg-primary-500', { 'opacity-50': disabled })
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export default cn
