import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, BookOpen, User, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/cn'

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/learn', icon: BookOpen, label: 'Learn' },
  { path: '/profile', icon: User, label: 'Profile' },
  { path: '/shop', icon: ShoppingBag, label: 'Shop' },
]

/**
 * BottomNav - Mobile-style bottom navigation
 */
export default function BottomNav({ className }) {
  const location = useLocation()

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40',
        'bg-white border-t border-gray-200',
        'safe-bottom',
        className
      )}
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center flex-1 h-full"
            >
              <motion.div
                className="flex flex-col items-center gap-1"
                whileTap={{ scale: 0.9 }}
              >
                <div
                  className={cn(
                    'p-1.5 rounded-xl transition-colors',
                    isActive ? 'bg-primary-100' : 'bg-transparent'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-6 h-6 transition-colors',
                      isActive ? 'text-primary-600' : 'text-gray-400'
                    )}
                  />
                </div>
                <span
                  className={cn(
                    'text-xs font-medium transition-colors',
                    isActive ? 'text-primary-600' : 'text-gray-400'
                  )}
                >
                  {item.label}
                </span>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 w-12 h-1 bg-primary-500 rounded-t-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
