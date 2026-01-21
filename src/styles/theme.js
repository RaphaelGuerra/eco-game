// Design tokens for the Eco Game app
// These match the Tailwind config and can be used in JS/Framer Motion

export const colors = {
  // Primary - Growth, Success, Nature
  primary: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },

  // Secondary - Exploration, Discovery, Water
  secondary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Accent colors
  accent: {
    amber: '#f59e0b',
    coral: '#fb7185',
    purple: '#a78bfa',
  },

  // Semantic colors
  success: '#4ade80',
  error: '#f87171',
  warning: '#fbbf24',

  // Neutrals
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Special
  white: '#ffffff',
  black: '#000000',
}

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
}

export const borderRadius = {
  none: '0',
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  full: '9999px',
}

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  game: '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
  'game-lg': '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
}

export const typography = {
  fontFamily: {
    sans: ['Nunito', 'Quicksand', 'system-ui', 'sans-serif'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    normal: 400,
    medium: 600,
    bold: 700,
    extrabold: 800,
  },
}

// Rarity colors for species/items
export const rarityColors = {
  common: colors.gray[400],
  uncommon: colors.primary[500],
  rare: colors.secondary[500],
  legendary: colors.accent.purple,
}

// XP level colors (gradient as you level up)
export const levelColors = [
  colors.primary[400],
  colors.primary[500],
  colors.primary[600],
  colors.secondary[400],
  colors.secondary[500],
  colors.secondary[600],
  colors.accent.purple,
]

export default {
  colors,
  spacing,
  borderRadius,
  shadows,
  typography,
  rarityColors,
  levelColors,
}
