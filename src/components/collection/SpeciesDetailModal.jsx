import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Sparkles, Calendar, Cloud, Sun, Moon, Info } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useDiscoveryStore } from '@/stores'
import { Button } from '@/components/ui'
import { RarityBadge } from '@/components/ui/Badge'

// Rarity-based glow effects
const rarityGlow = {
  common: '',
  uncommon: 'shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-2 ring-primary-200 dark:ring-primary-700',
  rare: 'shadow-[0_0_25px_rgba(59,130,246,0.4)] ring-2 ring-secondary-200 dark:ring-secondary-700',
  legendary: 'shadow-[0_0_35px_rgba(167,139,250,0.5)] ring-2 ring-purple-300 dark:ring-purple-600 animate-pulse',
}

// Time of day icons
const timeIcons = {
  morning: Sun,
  day: Sun,
  evening: Moon,
  night: Moon,
}

/**
 * Species Detail Modal
 * Shows full species info with rarity-based glow and favorite toggle
 */
export default function SpeciesDetailModal({ species, isOpen, onClose }) {
  const toggleFavorite = useDiscoveryStore((state) => state.toggleFavorite)
  const isFavorite = useDiscoveryStore((state) => state.isFavorite)
  const getDiscovery = useDiscoveryStore((state) => state.getDiscovery)

  if (!species) return null

  const discovery = getDiscovery(species.id)
  const isFav = isFavorite(species.id)
  const TimeIcon = timeIcons[discovery?.encounterConditions?.timeOfDay] || Sun

  const handleFavoriteClick = () => {
    toggleFavorite(species.id)
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown'
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[10%] bottom-[10%] z-50 mx-auto max-w-md overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-2xl flex flex-col"
          >
            {/* Header with close button */}
            <div className="relative flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
              <RarityBadge rarity={species.rarity} />
              <button
                onClick={handleFavoriteClick}
                className={cn(
                  'p-2 rounded-full transition-colors',
                  isFav
                    ? 'bg-red-50 dark:bg-red-900/30'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
              >
                <Heart
                  className={cn(
                    'w-5 h-5 transition-colors',
                    isFav ? 'text-red-500 fill-red-500' : 'text-gray-400 dark:text-gray-500'
                  )}
                />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Species emoji with rarity glow */}
              <div className="flex justify-center mb-6">
                <div
                  className={cn(
                    'w-32 h-32 rounded-3xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center transition-all',
                    rarityGlow[species.rarity]
                  )}
                >
                  <span className="text-7xl">{species.emoji}</span>
                </div>
              </div>

              {/* Name and scientific name */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100">
                  {species.name}
                </h2>
                {species.scientificName && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-1">
                    {species.scientificName}
                  </p>
                )}
              </div>

              {/* Description */}
              {species.description && (
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                    {species.description}
                  </p>
                </div>
              )}

              {/* Fun Facts */}
              {species.facts && species.facts.length > 0 && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="w-4 h-4 text-secondary-500" />
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Fun Facts</span>
                  </div>
                  <div className="space-y-2">
                    {species.facts.map((fact, i) => (
                      <div key={i} className="flex gap-2 text-sm">
                        <Sparkles className="w-3 h-3 text-amber-400 flex-shrink-0 mt-1" />
                        <span className="text-gray-600 dark:text-gray-300">{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Discovery info */}
              {discovery && (
                <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-2xl">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">
                    Discovery Details
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>Discovered</span>
                      </div>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {formatDate(discovery.discoveredAt)}
                      </span>
                    </div>
                    {discovery.encounterConditions && (
                      <>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <TimeIcon className="w-4 h-4" />
                            <span>Time of Day</span>
                          </div>
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 capitalize">
                            {discovery.encounterConditions.timeOfDay}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Cloud className="w-4 h-4" />
                            <span>Weather</span>
                          </div>
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 capitalize">
                            {discovery.encounterConditions.weather}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-700">
              <Button fullWidth onClick={onClose}>
                Close
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
