import { motion } from 'framer-motion'
import { Library, HelpCircle } from 'lucide-react'
import { useDiscoveryStore } from '@/stores'
import { Card } from '@/components/ui'
import { RarityBadge } from '@/components/ui/Badge'
import { TopBar, BottomNav } from '@/components/layout'

// Demo species for collection display
const ALL_SPECIES = [
  { id: 'toucan', name: 'Keel-billed Toucan', emoji: '🦜', rarity: 'uncommon' },
  { id: 'butterfly', name: 'Blue Morpho Butterfly', emoji: '🦋', rarity: 'rare' },
  { id: 'iguana', name: 'Green Iguana', emoji: '🦎', rarity: 'common' },
  { id: 'hummingbird', name: 'Ruby-throated Hummingbird', emoji: '🐦', rarity: 'uncommon' },
  { id: 'crab', name: 'Hermit Crab', emoji: '🦀', rarity: 'common' },
  { id: 'parrot', name: 'Scarlet Macaw', emoji: '🦜', rarity: 'rare' },
  { id: 'turtle', name: 'Sea Turtle', emoji: '🐢', rarity: 'rare' },
  { id: 'monkey', name: 'Capuchin Monkey', emoji: '🐒', rarity: 'uncommon' },
  { id: 'frog', name: 'Red-eyed Tree Frog', emoji: '🐸', rarity: 'uncommon' },
  { id: 'dolphin', name: 'Bottlenose Dolphin', emoji: '🐬', rarity: 'legendary' },
]

export default function CollectionScreen() {
  const discoveries = useDiscoveryStore((state) => state.discoveries)
  const hasDiscovered = useDiscoveryStore((state) => state.hasDiscovered)
  const getUniqueDiscoveryCount = useDiscoveryStore((state) => state.getUniqueDiscoveryCount)

  const discoveredCount = getUniqueDiscoveryCount()
  const totalCount = ALL_SPECIES.length
  const completionPercentage = Math.round((discoveredCount / totalCount) * 100)

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar
        centerContent={
          <h1 className="text-lg font-bold text-gray-800">Collection</h1>
        }
      />

      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Progress Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/60 flex items-center justify-center shadow-sm">
              <Library className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800">
              {discoveredCount} / {totalCount}
            </h2>
            <p className="text-gray-500">Species Discovered</p>

            {/* Progress bar */}
            <div className="mt-4 h-3 bg-white/50 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-400 to-secondary-500 rounded-full relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="absolute inset-0 progress-shimmer" />
              </motion.div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {completionPercentage}% complete
            </p>
          </Card>
        </motion.div>

        {/* Species Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-bold text-gray-800 mb-3">All Species</h2>
          <div className="grid grid-cols-2 gap-3">
            {ALL_SPECIES.map((species, index) => {
              const isDiscovered = hasDiscovered(species.id)

              return (
                <motion.div
                  key={species.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <SpeciesCard species={species} discovered={isDiscovered} />
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Rarity Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h3 className="font-bold text-gray-800 mb-3">Rarity Guide</h3>
            <div className="space-y-2">
              {[
                { rarity: 'common', count: ALL_SPECIES.filter(s => s.rarity === 'common').length },
                { rarity: 'uncommon', count: ALL_SPECIES.filter(s => s.rarity === 'uncommon').length },
                { rarity: 'rare', count: ALL_SPECIES.filter(s => s.rarity === 'rare').length },
                { rarity: 'legendary', count: ALL_SPECIES.filter(s => s.rarity === 'legendary').length },
              ].map(({ rarity, count }) => (
                <div key={rarity} className="flex items-center justify-between">
                  <RarityBadge rarity={rarity} />
                  <span className="text-sm text-gray-500">{count} species</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  )
}

function SpeciesCard({ species, discovered }) {
  return (
    <Card
      className={`text-center ${!discovered ? 'bg-gray-50 grayscale' : ''}`}
    >
      <div className={`text-4xl mb-2 ${!discovered ? 'opacity-40' : ''}`}>
        {discovered ? species.emoji : (
          <div className="w-10 h-10 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-gray-400" />
          </div>
        )}
      </div>
      <h3 className="font-bold text-gray-800 text-sm line-clamp-2 min-h-[2.5rem]">
        {discovered ? species.name : '???'}
      </h3>
      <div className="mt-2">
        <RarityBadge rarity={species.rarity} size="xs" />
      </div>
    </Card>
  )
}
