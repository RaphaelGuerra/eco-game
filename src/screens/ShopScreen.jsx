import { useState } from 'react'
import { motion } from 'framer-motion'
import { Snowflake, Heart, Zap, Sparkles } from 'lucide-react'
import { useUserStore } from '@/stores'
import { Card, Button } from '@/components/ui'
import { GemCounter, GemPrice } from '@/components/gamification'
import { TopBar, BottomNav } from '@/components/layout'
import { AlertModal } from '@/components/ui/Modal'
import { soundManager } from '@/lib/soundManager'

const SHOP_ITEMS = [
  {
    id: 'streak-freeze',
    name: 'Streak Freeze',
    description: 'Protect your streak for one day if you miss practice',
    icon: Snowflake,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-100',
    price: 10,
    category: 'power-ups',
  },
  {
    id: 'heart-refill',
    name: 'Heart Refill',
    description: 'Instantly refill all your hearts',
    icon: Heart,
    iconColor: 'text-red-500',
    bgColor: 'bg-red-100',
    price: 15,
    category: 'power-ups',
  },
  {
    id: 'xp-boost',
    name: 'XP Boost',
    description: 'Earn 2x XP for the next hour',
    icon: Zap,
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-100',
    price: 20,
    category: 'power-ups',
  },
  {
    id: 'streak-freeze-3',
    name: 'Streak Freeze (3 Pack)',
    description: 'Three streak freezes at a discount',
    icon: Snowflake,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-100',
    price: 25,
    category: 'bundles',
    quantity: 3,
  },
]

export default function ShopScreen() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  const gems = useUserStore((state) => state.gems)
  const spendGems = useUserStore((state) => state.spendGems)
  const addStreakFreeze = useUserStore((state) => state.addStreakFreeze)
  const refillHearts = useUserStore((state) => state.refillHearts)

  const handlePurchase = (item) => {
    setSelectedItem(item)
    setShowConfirm(true)
  }

  const confirmPurchase = () => {
    if (!selectedItem) return

    const success = spendGems(selectedItem.price)
    if (!success) {
      // Not enough gems
      return
    }

    // Apply item effect
    switch (selectedItem.id) {
      case 'streak-freeze':
        addStreakFreeze()
        break
      case 'streak-freeze-3':
        addStreakFreeze()
        addStreakFreeze()
        addStreakFreeze()
        break
      case 'heart-refill':
        refillHearts()
        break
      case 'xp-boost':
        // TODO: Implement XP boost
        break
    }

    soundManager.play('achievement')
    setShowConfirm(false)
    setSelectedItem(null)
  }

  const canAfford = (price) => gems >= price

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar
        centerContent={
          <h1 className="text-lg font-bold text-gray-800">Shop</h1>
        }
      />

      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Gem Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="flex items-center justify-between bg-gradient-to-r from-amber-50 to-yellow-50">
            <div>
              <p className="text-sm text-gray-500">Your Balance</p>
              <p className="text-3xl font-extrabold text-amber-600">
                {gems.toLocaleString()}
              </p>
            </div>
            <div className="text-5xl">💎</div>
          </Card>
        </motion.div>

        {/* Power-ups */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-bold text-gray-800 mb-3">Power-ups</h2>
          <div className="space-y-3">
            {SHOP_ITEMS.filter((item) => item.category === 'power-ups').map(
              (item) => (
                <ShopItem
                  key={item.id}
                  item={item}
                  canAfford={canAfford(item.price)}
                  onPurchase={() => handlePurchase(item)}
                />
              )
            )}
          </div>
        </motion.div>

        {/* Bundles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-bold text-gray-800 mb-3">Bundles</h2>
          <div className="space-y-3">
            {SHOP_ITEMS.filter((item) => item.category === 'bundles').map(
              (item) => (
                <ShopItem
                  key={item.id}
                  item={item}
                  canAfford={canAfford(item.price)}
                  onPurchase={() => handlePurchase(item)}
                />
              )
            )}
          </div>
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="text-center py-8 bg-gray-100">
            <Sparkles className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 font-medium">More items coming soon!</p>
            <p className="text-sm text-gray-400">
              Cosmetics, themes, and more
            </p>
          </Card>
        </motion.div>
      </main>

      <BottomNav />

      {/* Confirm Modal */}
      <AlertModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmPurchase}
        title="Confirm Purchase"
        message={
          selectedItem
            ? `Buy ${selectedItem.name} for ${selectedItem.price} gems?`
            : ''
        }
        confirmText="Buy"
        variant={canAfford(selectedItem?.price || 0) ? 'primary' : 'danger'}
      />
    </div>
  )
}

function ShopItem({ item, canAfford, onPurchase }) {
  const Icon = item.icon

  return (
    <Card
      className={`flex items-center gap-4 ${!canAfford ? 'opacity-60' : ''}`}
    >
      <div
        className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center`}
      >
        <Icon className={`w-6 h-6 ${item.iconColor}`} />
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.description}</p>
      </div>

      <Button
        variant={canAfford ? 'amber' : 'ghost'}
        size="sm"
        disabled={!canAfford}
        onClick={onPurchase}
      >
        <GemPrice amount={item.price} affordable={canAfford} size="sm" />
      </Button>
    </Card>
  )
}
