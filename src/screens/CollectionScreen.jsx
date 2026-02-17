import { useState } from 'react'
import { motion } from 'framer-motion'
import { Library, HelpCircle, Heart, Filter, SortAsc } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useDiscoveryStore } from '@/stores'
import { Card } from '@/components/ui'
import { RarityBadge } from '@/components/ui/Badge'
import { TopBar, BottomNav } from '@/components/layout'
import SpeciesDetailModal from '@/components/collection/SpeciesDetailModal'

// Full species data for collection display
const ALL_SPECIES = [
  {
    id: 'toucan',
    name: 'Keel-billed Toucan',
    scientificName: 'Ramphastos sulfuratus',
    description: 'Known for its colorful bill, this iconic bird is our resort mascot!',
    facts: [
      'Their bills can be up to one-third of their body length',
      'They sleep in groups of up to 6 birds in tree holes',
    ],
    emoji: '🦜',
    rarity: 'uncommon',
  },
  {
    id: 'butterfly',
    name: 'Blue Morpho Butterfly',
    scientificName: 'Morpho peleides',
    description: 'One of the largest butterflies with stunning iridescent blue wings.',
    facts: [
      'Their wingspan can reach up to 8 inches',
      'The blue color comes from microscopic scales on their wings',
    ],
    emoji: '🦋',
    rarity: 'rare',
  },
  {
    id: 'iguana',
    name: 'Green Iguana',
    scientificName: 'Iguana iguana',
    description: 'A large, docile lizard often seen basking in the sun.',
    facts: [
      'They can grow up to 6 feet long including their tail',
      'They are excellent swimmers and can hold their breath for 30 minutes',
    ],
    emoji: '🦎',
    rarity: 'common',
  },
  {
    id: 'hummingbird',
    name: 'Ruby-throated Hummingbird',
    scientificName: 'Archilochus colubris',
    description: 'A tiny bird that can hover in mid-air by rapidly flapping its wings.',
    facts: [
      'Their wings beat about 53 times per second',
      'They can fly backwards and upside down',
    ],
    emoji: '🐦',
    rarity: 'uncommon',
  },
  {
    id: 'crab',
    name: 'Hermit Crab',
    scientificName: 'Coenobita clypeatus',
    description: 'A small crustacean that lives in abandoned shells.',
    facts: [
      'They change shells as they grow',
      'They can live for over 30 years in the wild',
    ],
    emoji: '🦀',
    rarity: 'common',
  },
  {
    id: 'parrot',
    name: 'Scarlet Macaw',
    scientificName: 'Ara macao',
    description: 'A stunning red, yellow, and blue parrot known for its intelligence.',
    facts: [
      'They can live up to 80 years in captivity',
      'They mate for life and are very social birds',
    ],
    emoji: '🦜',
    rarity: 'rare',
  },
  {
    id: 'turtle',
    name: 'Sea Turtle',
    scientificName: 'Chelonia mydas',
    description: 'An ancient marine reptile that returns to the same beach to nest.',
    facts: [
      'They can hold their breath for 4-7 hours while resting',
      'They navigate using Earth\'s magnetic field',
    ],
    emoji: '🐢',
    rarity: 'rare',
  },
  {
    id: 'monkey',
    name: 'Capuchin Monkey',
    scientificName: 'Cebus capucinus',
    description: 'A highly intelligent primate known for using tools.',
    facts: [
      'They use rocks to crack open nuts and shellfish',
      'They live in groups of 10-35 individuals',
    ],
    emoji: '🐒',
    rarity: 'uncommon',
  },
  {
    id: 'frog',
    name: 'Red-eyed Tree Frog',
    scientificName: 'Agalychnis callidryas',
    description: 'A vibrant frog with striking red eyes used to startle predators.',
    facts: [
      'Their bright colors warn predators they may be poisonous',
      'They spend most of their lives in trees',
    ],
    emoji: '🐸',
    rarity: 'uncommon',
  },
  {
    id: 'dolphin',
    name: 'Bottlenose Dolphin',
    scientificName: 'Tursiops truncatus',
    description: 'A highly intelligent marine mammal known for its playful nature.',
    facts: [
      'They use echolocation to find food and navigate',
      'They sleep with one eye open and half their brain awake',
    ],
    emoji: '🐬',
    rarity: 'legendary',
  },
]

// Rarity order for sorting
const RARITY_ORDER = { common: 0, uncommon: 1, rare: 2, legendary: 3 }

// Rarity-based glow classes for discovered species
const rarityGlowClasses = {
  common: '',
  uncommon: 'ring-2 ring-primary-200 dark:ring-primary-700',
  rare: 'ring-2 ring-secondary-200 dark:ring-secondary-700',
  legendary: 'ring-2 ring-purple-300 dark:ring-purple-600 animate-pulse',
}

// Filter options
const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'common', label: 'Common' },
  { id: 'uncommon', label: 'Uncommon' },
  { id: 'rare', label: 'Rare' },
  { id: 'legendary', label: 'Legendary' },
]

// Sort options
const SORTS = [
  { id: 'name', label: 'Name' },
  { id: 'rarity', label: 'Rarity' },
  { id: 'date', label: 'Discovery Date' },
]

export default function CollectionScreen() {
  const [selectedSpecies, setSelectedSpecies] = useState(null)
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('name')

  const discoveries = useDiscoveryStore((state) => state.discoveries)
  const hasDiscovered = useDiscoveryStore((state) => state.hasDiscovered)
  const getUniqueDiscoveryCount = useDiscoveryStore((state) => state.getUniqueDiscoveryCount)
  const isFavorite = useDiscoveryStore((state) => state.isFavorite)
  const getDiscovery = useDiscoveryStore((state) => state.getDiscovery)

  const discoveredCount = getUniqueDiscoveryCount()
  const totalCount = ALL_SPECIES.length
  const completionPercentage = Math.round((discoveredCount / totalCount) * 100)

  // Filter species
  const filteredSpecies = ALL_SPECIES.filter((species) => {
    if (filter === 'all') return true
    if (filter === 'favorites') return hasDiscovered(species.id) && isFavorite(species.id)
    return species.rarity === filter
  })

  // Sort species
  const sortedSpecies = [...filteredSpecies].sort((a, b) => {
    const aDiscovered = hasDiscovered(a.id)
    const bDiscovered = hasDiscovered(b.id)

    // Always show discovered first
    if (aDiscovered !== bDiscovered) return bDiscovered ? 1 : -1

    switch (sort) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'rarity':
        return RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity]
      case 'date':
        const aDate = getDiscovery(a.id)?.discoveredAt || 0
        const bDate = getDiscovery(b.id)?.discoveredAt || 0
        return bDate - aDate
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <TopBar
        centerContent={
          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">Collection</h1>
        }
      />

      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Progress Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 border border-primary-100 dark:border-primary-800">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/60 dark:bg-gray-700/60 flex items-center justify-center shadow-sm">
              <Library className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100">
              {discoveredCount} / {totalCount}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">Species Discovered</p>

            {/* Progress bar */}
            <div className="mt-4 h-3 bg-white/50 dark:bg-gray-700/50 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-400 to-secondary-500 rounded-full relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="absolute inset-0 progress-shimmer" />
              </motion.div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {completionPercentage}% complete
            </p>
          </Card>
        </motion.div>

        {/* Filter & Sort Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                  filter === f.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <SortAsc className="w-4 h-4 text-gray-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 text-gray-700 dark:text-gray-200"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  Sort by {s.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Species Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
            {filter === 'all' ? 'All Species' : filter === 'favorites' ? 'Favorites' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Species`}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
              ({sortedSpecies.length})
            </span>
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {sortedSpecies.map((species, index) => {
              const isDiscovered = hasDiscovered(species.id)
              const isFav = isDiscovered && isFavorite(species.id)

              return (
                <motion.div
                  key={species.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <SpeciesCard
                    species={species}
                    discovered={isDiscovered}
                    isFavorite={isFav}
                    onClick={() => isDiscovered && setSelectedSpecies(species)}
                  />
                </motion.div>
              )
            })}
          </div>

          {sortedSpecies.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No species found with this filter.</p>
            </div>
          )}
        </motion.div>

        {/* Rarity Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Rarity Guide</h3>
            <div className="space-y-2">
              {[
                { rarity: 'common', count: ALL_SPECIES.filter(s => s.rarity === 'common').length },
                { rarity: 'uncommon', count: ALL_SPECIES.filter(s => s.rarity === 'uncommon').length },
                { rarity: 'rare', count: ALL_SPECIES.filter(s => s.rarity === 'rare').length },
                { rarity: 'legendary', count: ALL_SPECIES.filter(s => s.rarity === 'legendary').length },
              ].map(({ rarity, count }) => (
                <div key={rarity} className="flex items-center justify-between">
                  <RarityBadge rarity={rarity} />
                  <span className="text-sm text-gray-500 dark:text-gray-400">{count} species</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </main>

      <BottomNav />

      {/* Species Detail Modal */}
      <SpeciesDetailModal
        species={selectedSpecies}
        isOpen={!!selectedSpecies}
        onClose={() => setSelectedSpecies(null)}
      />
    </div>
  )
}

function SpeciesCard({ species, discovered, isFavorite, onClick }) {
  return (
    <Card
      interactive={discovered}
      onClick={onClick}
      className={cn(
        'text-center relative',
        !discovered && 'bg-gray-50 dark:bg-gray-800/50 grayscale cursor-default',
        discovered && rarityGlowClasses[species.rarity]
      )}
    >
      {/* Favorite indicator */}
      {isFavorite && (
        <div className="absolute top-2 right-2">
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
        </div>
      )}

      <div className={cn('text-4xl mb-2', !discovered && 'opacity-40')}>
        {discovered ? species.emoji : (
          <div className="w-10 h-10 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </div>
        )}
      </div>
      <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm line-clamp-2 min-h-[2.5rem]">
        {discovered ? species.name : '???'}
      </h3>
      <div className="mt-2">
        <RarityBadge rarity={species.rarity} size="xs" />
      </div>
    </Card>
  )
}
