import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, Sun, Cloud, CloudRain, Moon, Clock, Sparkles, Info } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useUserStore, useDiscoveryStore } from '@/stores'
import { Button, Card } from '@/components/ui'
import { RarityBadge } from '@/components/ui/Badge'
import { TopBar, BottomNav } from '@/components/layout'
import { Mascot } from '@/components/mascot'
import { soundManager } from '@/lib/soundManager'
import { celebrateRareDiscovery, sparkle } from '@/lib/confetti'

// Rarity-based background colors for encounter cards
const RARITY_BACKGROUNDS = {
  common: 'bg-white dark:bg-gray-800',
  uncommon: 'bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/30 dark:to-gray-800 border-primary-100 dark:border-primary-800',
  rare: 'bg-gradient-to-br from-secondary-50 to-white dark:from-secondary-900/30 dark:to-gray-800 border-secondary-100 dark:border-secondary-800',
  legendary: 'bg-gradient-to-br from-purple-50 to-amber-50 dark:from-purple-900/30 dark:to-amber-900/30 border-purple-200 dark:border-purple-700',
}

// Rarity-based glow effects for reveal animations
const RARITY_GLOW = {
  common: '',
  uncommon: 'shadow-[0_0_20px_rgba(16,185,129,0.4)]',
  rare: 'shadow-[0_0_25px_rgba(59,130,246,0.5)]',
  legendary: 'shadow-[0_0_40px_rgba(167,139,250,0.6)] animate-pulse',
}

// Demo species data - expanded with more species
const SPECIES = [
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
    xp: 30,
    activeTime: ['morning', 'day', 'evening'],
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
    xp: 50,
    activeTime: ['morning', 'day'],
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
    xp: 20,
    activeTime: ['day', 'evening'],
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
    xp: 30,
    activeTime: ['morning', 'day'],
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
    xp: 20,
    activeTime: ['evening', 'night'],
  },
  // New species
  {
    id: 'sloth',
    name: 'Three-toed Sloth',
    scientificName: 'Bradypus variegatus',
    description: 'The world\'s slowest mammal, spending most of its life hanging in trees.',
    facts: [
      'They sleep up to 20 hours a day',
      'Their slow movement helps them avoid detection by predators',
    ],
    emoji: '🦥',
    rarity: 'rare',
    xp: 50,
    activeTime: ['day', 'evening'],
  },
  {
    id: 'jaguar',
    name: 'Jaguar',
    scientificName: 'Panthera onca',
    description: 'The largest cat in the Americas and a powerful apex predator.',
    facts: [
      'They have the strongest bite of any big cat',
      'Unlike most cats, jaguars love water and are excellent swimmers',
    ],
    emoji: '🐆',
    rarity: 'legendary',
    xp: 100,
    activeTime: ['night', 'evening'],
  },
  {
    id: 'poison-frog',
    name: 'Poison Dart Frog',
    scientificName: 'Dendrobates auratus',
    description: 'A tiny but deadly frog with vibrant warning colors.',
    facts: [
      'Their poison can cause paralysis or death in predators',
      'Indigenous peoples used their toxins on blow darts',
    ],
    emoji: '🐸',
    rarity: 'uncommon',
    xp: 30,
    activeTime: ['morning', 'day'],
  },
  {
    id: 'howler-monkey',
    name: 'Howler Monkey',
    scientificName: 'Alouatta palliata',
    description: 'Known for their incredibly loud calls that can be heard miles away.',
    facts: [
      'Their howls can reach 140 decibels - louder than a jet engine',
      'They are among the largest New World monkeys',
    ],
    emoji: '🐒',
    rarity: 'uncommon',
    xp: 30,
    activeTime: ['morning', 'evening'],
  },
  {
    id: 'harpy-eagle',
    name: 'Harpy Eagle',
    scientificName: 'Harpia harpyja',
    description: 'One of the world\'s largest and most powerful eagles.',
    facts: [
      'Their talons are as large as grizzly bear claws',
      'They can carry prey weighing up to half their body weight',
    ],
    emoji: '🦅',
    rarity: 'rare',
    xp: 50,
    activeTime: ['day'],
  },
]

const WEATHER_ICONS = {
  clear: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
}

const TIME_ICONS = {
  morning: Sun,
  day: Sun,
  evening: Moon,
  night: Moon,
}

export default function ExploreScreen() {
  const navigate = useNavigate()
  const [isExploring, setIsExploring] = useState(false)
  const [encounter, setEncounter] = useState(null)
  const [cooldownRemaining, setCooldownRemaining] = useState(0)

  const addXP = useUserStore((state) => state.addXP)
  
  const timeOfDay = useDiscoveryStore((state) => state.timeOfDay)
  const weather = useDiscoveryStore((state) => state.weather)
  const canExplore = useDiscoveryStore((state) => state.canExplore)
  const getTimeUntilNextExplore = useDiscoveryStore((state) => state.getTimeUntilNextExplore)
  const startExploration = useDiscoveryStore((state) => state.startExploration)
  const addDiscovery = useDiscoveryStore((state) => state.addDiscovery)
  const hasDiscovered = useDiscoveryStore((state) => state.hasDiscovered)
  const updateConditions = useDiscoveryStore((state) => state.updateConditions)

  // Update cooldown timer
  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getTimeUntilNextExplore()
      setCooldownRemaining(remaining)
    }, 1000)

    return () => clearInterval(interval)
  }, [getTimeUntilNextExplore])

  // Update conditions periodically
  useEffect(() => {
    updateConditions()
    const interval = setInterval(updateConditions, 60000)
    return () => clearInterval(interval)
  }, [updateConditions])

  const handleExplore = () => {
    if (!canExplore()) return

    setIsExploring(true)
    startExploration()
    soundManager.play('buttonPress')

    // Simulate exploration delay
    setTimeout(() => {
      // Generate encounter based on conditions
      const availableSpecies = SPECIES.filter((s) =>
        s.activeTime.includes(timeOfDay)
      )

      // Weighted random selection
      const weights = availableSpecies.map((s) => {
        const rarityWeight = { common: 50, uncommon: 30, rare: 15, legendary: 5 }
        return rarityWeight[s.rarity]
      })

      const totalWeight = weights.reduce((a, b) => a + b, 0)
      let random = Math.random() * totalWeight
      let selectedSpecies = availableSpecies[0]

      for (let i = 0; i < availableSpecies.length; i++) {
        random -= weights[i]
        if (random <= 0) {
          selectedSpecies = availableSpecies[i]
          break
        }
      }

      setEncounter(selectedSpecies)
      setIsExploring(false)

      // Play discovery sound
      if (selectedSpecies.rarity === 'rare' || selectedSpecies.rarity === 'legendary') {
        soundManager.play('rareDiscovery')
        celebrateRareDiscovery()
      } else {
        soundManager.play('discovery')
        sparkle()
      }
    }, 2000)
  }

  const handleClaimDiscovery = () => {
    if (!encounter) return

    const isNew = !hasDiscovered(encounter.id)
    addDiscovery(encounter)
    addXP(encounter.xp)

    soundManager.play('xpGain')
    setEncounter(null)
  }

  const formatCooldown = (ms) => {
    const seconds = Math.ceil(ms / 1000)
    return `${seconds}s`
  }

  const WeatherIcon = WEATHER_ICONS[weather] || Sun
  const TimeIcon = TIME_ICONS[timeOfDay] || Sun

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white dark:from-gray-900 dark:to-gray-900 pb-20">
      <TopBar />

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Conditions */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm">
            <TimeIcon className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 capitalize">
              {timeOfDay}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm">
            <WeatherIcon className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 capitalize">
              {weather}
            </span>
          </div>
        </div>

        {/* Mascot with styled message */}
        <div className="flex flex-col items-center mb-8">
          <Mascot
            state={isExploring ? 'thinking' : encounter ? 'excited' : 'neutral'}
            size="lg"
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'mt-3 px-4 py-2 rounded-full text-sm font-medium',
              isExploring
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                : encounter
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                : 'bg-white text-gray-600 shadow-sm dark:bg-gray-800 dark:text-gray-300'
            )}
          >
            {isExploring
              ? 'Searching...'
              : encounter
              ? 'Look what I found!'
              : 'Tap to explore!'}
          </motion.div>
        </div>

        {/* Encounter Card */}
        <AnimatePresence mode="wait">
          {encounter ? (
            <motion.div
              key="encounter"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <Card className={cn('mb-6 border', RARITY_BACKGROUNDS[encounter.rarity])}>
                {/* Species Header */}
                <div className="text-center pb-4 border-b border-gray-100 dark:border-gray-700">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="text-6xl mb-3"
                  >
                    {encounter.emoji}
                  </motion.div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    {encounter.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-2">
                    {encounter.scientificName}
                  </p>
                  <RarityBadge rarity={encounter.rarity} />
                </div>

                {/* Description */}
                <div className="py-4 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300">{encounter.description}</p>
                </div>

                {/* Facts */}
                <div className="py-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="w-4 h-4 text-secondary-500" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Fun Facts</span>
                  </div>
                  <div className="space-y-2">
                    {encounter.facts.map((fact, i) => (
                      <div key={i} className="flex gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Sparkles className="w-3 h-3 text-amber-400 flex-shrink-0 mt-1" />
                        <span>{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reward */}
                <div className="flex items-center justify-between pt-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Reward</span>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-primary-500" />
                    <span className="font-bold text-primary-600">
                      +{encounter.xp} XP
                    </span>
                  </div>
                </div>
              </Card>

              <Button size="lg" fullWidth onClick={handleClaimDiscovery}>
                Claim Discovery
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="explore"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              {/* Explore Button */}
              <motion.button
                onClick={handleExplore}
                disabled={!canExplore() || isExploring}
                className="relative w-40 h-40 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 shadow-lg disabled:opacity-50"
                whileTap={canExplore() && !isExploring ? { scale: 0.95 } : {}}
                animate={
                  canExplore() && !isExploring
                    ? {
                        boxShadow: [
                          '0 0 0 0 rgba(59, 130, 246, 0.4)',
                          '0 0 0 20px rgba(59, 130, 246, 0)',
                          '0 0 0 0 rgba(59, 130, 246, 0)',
                        ],
                      }
                    : {}
                }
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {isExploring ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                  >
                    <Compass className="w-16 h-16 text-white" />
                  </motion.div>
                ) : (
                  <Compass className="w-16 h-16 text-white" />
                )}
              </motion.button>

              {/* Cooldown or instruction */}
              {canExplore() || isExploring ? (
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  {isExploring ? 'Exploring...' : 'Tap to explore'}
                </p>
              ) : (
                <div className="mt-4 flex flex-col items-center">
                  <CooldownRing remaining={cooldownRemaining} total={10000} />
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Cooldown</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav />
    </div>
  )
}

// Circular countdown ring component
function CooldownRing({ remaining, total }) {
  const radius = 28
  const strokeWidth = 4
  const circumference = 2 * Math.PI * radius
  const progress = Math.max(0, Math.min(1, remaining / total))
  const strokeDashoffset = circumference * (1 - progress)
  const seconds = Math.ceil(remaining / 1000)

  return (
    <div className="relative w-16 h-16">
      <svg className="w-full h-full transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{seconds}s</span>
      </div>
    </div>
  )
}
