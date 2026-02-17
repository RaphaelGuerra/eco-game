/**
 * Rarity-based visual effect classes
 * Use these classes to add rarity-specific glow and styling
 */

// Glow classes for collection cards and discovery reveals
export const rarityGlowClasses = {
  common: '',
  uncommon: 'shadow-[0_0_15px_rgba(16,185,129,0.3)] ring-1 ring-primary-200 dark:ring-primary-700',
  rare: 'shadow-[0_0_20px_rgba(59,130,246,0.4)] ring-2 ring-secondary-200 dark:ring-secondary-700',
  legendary: 'shadow-[0_0_30px_rgba(167,139,250,0.5)] ring-2 ring-purple-300 dark:ring-purple-600 animate-pulse',
}

// Background gradients for encounter cards
export const rarityBackgrounds = {
  common: 'bg-white dark:bg-gray-800',
  uncommon: 'bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/30 dark:to-gray-800 border-primary-100 dark:border-primary-800',
  rare: 'bg-gradient-to-br from-secondary-50 to-white dark:from-secondary-900/30 dark:to-gray-800 border-secondary-100 dark:border-secondary-800',
  legendary: 'bg-gradient-to-br from-purple-50 to-amber-50 dark:from-purple-900/30 dark:to-amber-900/30 border-purple-200 dark:border-purple-700',
}

// Text colors for rarity labels
export const rarityTextColors = {
  common: 'text-gray-600 dark:text-gray-400',
  uncommon: 'text-primary-600 dark:text-primary-400',
  rare: 'text-secondary-600 dark:text-secondary-400',
  legendary: 'text-purple-600 dark:text-purple-400',
}

// Animation classes for discovery reveals
export const rarityRevealAnimations = {
  common: '',
  uncommon: 'animate-pop',
  rare: 'animate-pop',
  legendary: 'animate-wiggle',
}

// XP rewards by rarity
export const rarityXP = {
  common: 20,
  uncommon: 30,
  rare: 50,
  legendary: 100,
}

export default {
  rarityGlowClasses,
  rarityBackgrounds,
  rarityTextColors,
  rarityRevealAnimations,
  rarityXP,
}
