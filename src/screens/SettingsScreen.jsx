import { motion } from 'framer-motion'
import {
  Volume2, VolumeX, Music, Bell, BellOff,
  Sun, Moon, Monitor, Globe, ChevronRight,
  Eye, Accessibility, RotateCcw, LogOut
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSettingsStore, useUserStore } from '@/stores'
import { Card, Button } from '@/components/ui'
import { TopBar, BottomNav } from '@/components/layout'
import { soundManager } from '@/lib/soundManager'

export default function SettingsScreen() {
  const navigate = useNavigate()

  // Settings state
  const soundEnabled = useSettingsStore((state) => state.soundEnabled)
  const musicEnabled = useSettingsStore((state) => state.musicEnabled)
  const notificationsEnabled = useSettingsStore((state) => state.notificationsEnabled)
  const reducedMotion = useSettingsStore((state) => state.reducedMotion)
  const highContrast = useSettingsStore((state) => state.highContrast)
  const language = useSettingsStore((state) => state.language)
  const theme = useSettingsStore((state) => state.theme)

  // Settings actions
  const toggleSound = useSettingsStore((state) => state.toggleSound)
  const toggleMusic = useSettingsStore((state) => state.toggleMusic)
  const toggleNotifications = useSettingsStore((state) => state.toggleNotifications)
  const toggleReducedMotion = useSettingsStore((state) => state.toggleReducedMotion)
  const toggleHighContrast = useSettingsStore((state) => state.toggleHighContrast)
  const setLanguage = useSettingsStore((state) => state.setLanguage)
  const setTheme = useSettingsStore((state) => state.setTheme)
  const resetToDefaults = useSettingsStore((state) => state.resetToDefaults)

  // User actions for reset
  const resetProgress = useUserStore((state) => state.resetProgress)

  const handleSoundToggle = () => {
    toggleSound()
    // Update sound manager
    if (soundEnabled) {
      soundManager.setMuted(true)
    } else {
      soundManager.setMuted(false)
      soundManager.play('buttonPress')
    }
  }

  const handleMusicToggle = () => {
    toggleMusic()
    // TODO: Actually stop/start background music when implemented
  }

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'pt-BR', label: 'Português (BR)' },
  ]

  const themes = [
    { code: 'light', label: 'Light', icon: Sun },
    { code: 'dark', label: 'Dark', icon: Moon },
    { code: 'system', label: 'System', icon: Monitor },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar
        centerContent={
          <h1 className="text-lg font-bold text-gray-800">Settings</h1>
        }
      />

      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Sound & Music */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
            Sound & Music
          </h2>
          <Card>
            <SettingToggle
              icon={soundEnabled ? Volume2 : VolumeX}
              label="Sound Effects"
              description="Play sounds for actions and feedback"
              enabled={soundEnabled}
              onToggle={handleSoundToggle}
            />
            <div className="border-t border-gray-100" />
            <SettingToggle
              icon={Music}
              label="Background Music"
              description="Play ambient music while using the app"
              enabled={musicEnabled}
              onToggle={handleMusicToggle}
            />
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
            Notifications
          </h2>
          <Card>
            <SettingToggle
              icon={notificationsEnabled ? Bell : BellOff}
              label="Push Notifications"
              description="Get reminders for streaks and daily goals"
              enabled={notificationsEnabled}
              onToggle={toggleNotifications}
            />
          </Card>
        </motion.div>

        {/* Language */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
            Language
          </h2>
          <Card className="p-0 overflow-hidden">
            {languages.map((lang, index) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                  index !== languages.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-700">{lang.label}</span>
                </div>
                {language === lang.code && (
                  <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                )}
              </button>
            ))}
          </Card>
        </motion.div>

        {/* Theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
            Theme
          </h2>
          <Card className="p-0 overflow-hidden">
            {themes.map((t, index) => (
              <button
                key={t.code}
                onClick={() => setTheme(t.code)}
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                  index !== themes.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <t.icon className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-700">{t.label}</span>
                </div>
                {theme === t.code && (
                  <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                )}
              </button>
            ))}
          </Card>
        </motion.div>

        {/* Accessibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
            Accessibility
          </h2>
          <Card>
            <SettingToggle
              icon={Eye}
              label="High Contrast"
              description="Increase contrast for better visibility"
              enabled={highContrast}
              onToggle={toggleHighContrast}
            />
            <div className="border-t border-gray-100" />
            <SettingToggle
              icon={Accessibility}
              label="Reduced Motion"
              description="Minimize animations throughout the app"
              enabled={reducedMotion}
              onToggle={toggleReducedMotion}
            />
          </Card>
        </motion.div>

        {/* Reset Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
            Reset
          </h2>
          <Card className="space-y-3">
            <Button
              variant="ghost"
              fullWidth
              leftIcon={<RotateCcw className="w-5 h-5" />}
              onClick={resetToDefaults}
              className="justify-start text-gray-600"
            >
              Reset Settings to Defaults
            </Button>
            <div className="border-t border-gray-100" />
            <Button
              variant="ghost"
              fullWidth
              leftIcon={<LogOut className="w-5 h-5 text-red-500" />}
              onClick={() => {
                if (confirm('Are you sure? This will reset ALL your progress!')) {
                  resetProgress()
                  navigate('/')
                }
              }}
              className="justify-start text-red-500 hover:bg-red-50"
            >
              Reset All Progress
            </Button>
          </Card>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-center text-sm text-gray-400 pt-4"
        >
          <p>Eco-Game v0.1.0</p>
          <p>Made with care for our planet</p>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  )
}

function SettingToggle({ icon: Icon, label, description, enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-lg"
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${enabled ? 'text-primary-500' : 'text-gray-400'}`} />
        <div className="text-left">
          <p className="font-medium text-gray-700">{label}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div
        className={`w-12 h-7 rounded-full p-1 transition-colors ${
          enabled ? 'bg-primary-500' : 'bg-gray-200'
        }`}
      >
        <motion.div
          className="w-5 h-5 rounded-full bg-white shadow-sm"
          animate={{ x: enabled ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
    </button>
  )
}
