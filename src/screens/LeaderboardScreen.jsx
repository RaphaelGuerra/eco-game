import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Medal, Crown, Flame, TrendingUp, Users } from 'lucide-react'
import { useUserStore } from '@/stores'
import { Card, Badge } from '@/components/ui'
import { TopBar, BottomNav } from '@/components/layout'

// Demo leaderboard data
const DEMO_LEADERBOARD = [
  { id: 1, name: 'EcoChampion', xp: 15420, streak: 45, level: 23, avatar: '1' },
  { id: 2, name: 'NatureLover', xp: 12850, streak: 30, level: 19, avatar: '2' },
  { id: 3, name: 'WildlifePro', xp: 11200, streak: 28, level: 17, avatar: '3' },
  { id: 4, name: 'GreenExplorer', xp: 9800, streak: 21, level: 15, avatar: '4' },
  { id: 5, name: 'BioMaster', xp: 8500, streak: 18, level: 14, avatar: '5' },
  { id: 6, name: 'EcoWarrior', xp: 7200, streak: 14, level: 12, avatar: '6' },
  { id: 7, name: 'NatureNinja', xp: 6100, streak: 12, level: 11, avatar: '7' },
  { id: 8, name: 'ForestFriend', xp: 5400, streak: 10, level: 10, avatar: '8' },
  { id: 9, name: 'WildWatcher', xp: 4800, streak: 8, level: 9, avatar: '9' },
  { id: 10, name: 'EcoRookie', xp: 3500, streak: 5, level: 7, avatar: '10' },
]

const TABS = [
  { id: 'weekly', label: 'This Week' },
  { id: 'monthly', label: 'This Month' },
  { id: 'alltime', label: 'All Time' },
]

export default function LeaderboardScreen() {
  const [activeTab, setActiveTab] = useState('weekly')

  const userXp = useUserStore((state) => state.xp)
  const userLevel = useUserStore((state) => state.level)
  const userStreak = useUserStore((state) => state.currentStreak)

  // Find user's rank in leaderboard
  const userRank = DEMO_LEADERBOARD.findIndex((p) => p.xp < userXp) + 1 || DEMO_LEADERBOARD.length + 1

  // Insert user into leaderboard for display
  const leaderboardWithUser = [...DEMO_LEADERBOARD]
  const userEntry = {
    id: 'user',
    name: 'You',
    xp: userXp,
    streak: userStreak,
    level: userLevel,
    avatar: 'user',
    isCurrentUser: true,
  }

  // Insert user at correct position
  if (userRank <= DEMO_LEADERBOARD.length) {
    leaderboardWithUser.splice(userRank - 1, 0, userEntry)
    leaderboardWithUser.pop() // Keep only top 10 + user
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar
        centerContent={
          <h1 className="text-lg font-bold text-gray-800">Leaderboard</h1>
        }
      />

      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* User Rank Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Your Rank</p>
                <p className="text-4xl font-extrabold text-primary-600">
                  #{userRank}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total XP</p>
                <p className="text-2xl font-bold text-gray-800">
                  {userXp.toLocaleString()}
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-primary-500 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex bg-white rounded-xl p-1 shadow-sm"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-end justify-center gap-2 py-4"
        >
          {/* 2nd Place */}
          <PodiumSpot
            rank={2}
            player={leaderboardWithUser[1]}
            height="h-24"
            delay={0.2}
          />
          {/* 1st Place */}
          <PodiumSpot
            rank={1}
            player={leaderboardWithUser[0]}
            height="h-32"
            delay={0.1}
          />
          {/* 3rd Place */}
          <PodiumSpot
            rank={3}
            player={leaderboardWithUser[2]}
            height="h-20"
            delay={0.3}
          />
        </motion.div>

        {/* Leaderboard List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-0 overflow-hidden">
            {leaderboardWithUser.slice(3).map((player, index) => (
              <LeaderboardRow
                key={player.id}
                rank={index + 4}
                player={player}
                isLast={index === leaderboardWithUser.slice(3).length - 1}
              />
            ))}
          </Card>
        </motion.div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2 text-sm text-gray-400"
        >
          <Users className="w-4 h-4" />
          <span>Leaderboard updates every hour</span>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  )
}

function PodiumSpot({ rank, player, height, delay }) {
  const colors = {
    1: { bg: 'bg-amber-400', text: 'text-amber-400', icon: Crown },
    2: { bg: 'bg-gray-300', text: 'text-gray-400', icon: Medal },
    3: { bg: 'bg-amber-600', text: 'text-amber-600', icon: Medal },
  }

  const config = colors[rank]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="flex flex-col items-center"
    >
      {/* Avatar */}
      <div
        className={`relative w-14 h-14 rounded-full ${
          player?.isCurrentUser ? 'bg-primary-500' : 'bg-gray-200'
        } flex items-center justify-center mb-2`}
      >
        <span className="text-xl font-bold text-white">
          {player?.name?.charAt(0) || '?'}
        </span>
        <Icon
          className={`absolute -top-1 -right-1 w-5 h-5 ${config.text}`}
          fill={rank === 1 ? '#fbbf24' : 'none'}
        />
      </div>

      {/* Name */}
      <p
        className={`text-xs font-semibold text-center truncate max-w-[70px] ${
          player?.isCurrentUser ? 'text-primary-600' : 'text-gray-700'
        }`}
      >
        {player?.name || '---'}
      </p>

      {/* XP */}
      <p className="text-xs text-gray-500">
        {player?.xp?.toLocaleString() || 0} XP
      </p>

      {/* Podium */}
      <div
        className={`${height} w-20 ${config.bg} rounded-t-xl mt-2 flex items-center justify-center`}
      >
        <span className="text-2xl font-extrabold text-white">{rank}</span>
      </div>
    </motion.div>
  )
}

function LeaderboardRow({ rank, player, isLast }) {
  return (
    <div
      className={`flex items-center gap-4 p-4 ${
        !isLast ? 'border-b border-gray-100' : ''
      } ${player?.isCurrentUser ? 'bg-primary-50' : ''}`}
    >
      {/* Rank */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
          player?.isCurrentUser
            ? 'bg-primary-500 text-white'
            : 'bg-gray-100 text-gray-600'
        }`}
      >
        {rank}
      </div>

      {/* Avatar */}
      <div
        className={`w-10 h-10 rounded-full ${
          player?.isCurrentUser ? 'bg-primary-500' : 'bg-gray-200'
        } flex items-center justify-center`}
      >
        <span
          className={`font-bold ${
            player?.isCurrentUser ? 'text-white' : 'text-gray-500'
          }`}
        >
          {player?.name?.charAt(0) || '?'}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p
          className={`font-semibold truncate ${
            player?.isCurrentUser ? 'text-primary-700' : 'text-gray-800'
          }`}
        >
          {player?.name || '---'}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Level {player?.level || 1}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Flame className="w-3 h-3 text-orange-500" />
            {player?.streak || 0}
          </span>
        </div>
      </div>

      {/* XP */}
      <div className="text-right">
        <p className="font-bold text-gray-800">
          {player?.xp?.toLocaleString() || 0}
        </p>
        <p className="text-xs text-gray-500">XP</p>
      </div>
    </div>
  )
}
