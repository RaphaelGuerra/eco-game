import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Target, Compass, Sparkles } from 'lucide-react'
import { useUserStore } from '@/stores'
import { Button } from '@/components/ui'
import { Mascot } from '@/components/mascot'

const STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to Itatiaia Resort!',
    description: 'Meet Tuki, your guide to discovering the amazing wildlife around you.',
    mascotState: 'happy',
    mascotMessage: "Hi there! I'm Tuki! 🦜",
  },
  {
    id: 'goal',
    title: 'Set Your Daily Goal',
    description: 'How much time do you want to spend learning each day?',
    mascotState: 'thinking',
    mascotMessage: 'Pick a goal that works for you!',
  },
  {
    id: 'explore',
    title: 'Explore & Discover',
    description: 'Tap to explore your surroundings and discover wildlife. Each discovery earns you XP!',
    mascotState: 'excited',
    mascotMessage: "Let's find some cool creatures! 🔍",
  },
  {
    id: 'ready',
    title: "You're All Set!",
    description: 'Start your first lesson and begin your journey as an Eco Explorer.',
    mascotState: 'cheering',
    mascotMessage: "Let's go! 🎉",
  },
]

const DAILY_GOALS = [
  { xp: 30, label: 'Casual', description: '5 min/day', icon: '🌱' },
  { xp: 50, label: 'Regular', description: '10 min/day', icon: '🌿' },
  { xp: 100, label: 'Serious', description: '15 min/day', icon: '🌳' },
  { xp: 150, label: 'Intense', description: '20 min/day', icon: '🏆' },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedGoal, setSelectedGoal] = useState(1) // Default to Regular
  
  const setDailyGoal = useUserStore((state) => state.setDailyGoal)
  const completeOnboarding = useUserStore((state) => state.completeOnboarding)

  const step = STEPS[currentStep]
  const isLastStep = currentStep === STEPS.length - 1

  const handleNext = () => {
    if (isLastStep) {
      // Save goal and complete onboarding
      setDailyGoal(DAILY_GOALS[selectedGoal].xp)
      completeOnboarding()
      navigate('/')
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex flex-col">
      {/* Progress dots */}
      <div className="flex justify-center gap-2 pt-8 pb-4">
        {STEPS.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentStep
                ? 'bg-primary-500'
                : index < currentStep
                ? 'bg-primary-300'
                : 'bg-gray-200'
            }`}
            animate={{ scale: index === currentStep ? 1.2 : 1 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm flex flex-col items-center text-center"
          >
            {/* Mascot */}
            <Mascot
              state={step.mascotState}
              size="xl"
              message={step.mascotMessage}
            />

            {/* Title & Description */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-extrabold text-gray-800 mt-8 mb-3"
            >
              {step.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 mb-8"
            >
              {step.description}
            </motion.p>

            {/* Goal Selection (Step 2) */}
            {step.id === 'goal' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full space-y-3"
              >
                {DAILY_GOALS.map((goal, index) => (
                  <button
                    key={goal.label}
                    onClick={() => setSelectedGoal(index)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      selectedGoal === index
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{goal.icon}</span>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-gray-800">{goal.label}</p>
                      <p className="text-sm text-gray-500">{goal.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary-600">{goal.xp} XP</p>
                      <p className="text-xs text-gray-400">daily goal</p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}

            {/* Feature highlights (Step 3) */}
            {step.id === 'explore' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full grid grid-cols-3 gap-4"
              >
                <FeatureCard icon={<Compass />} label="Explore" />
                <FeatureCard icon={<Target />} label="Learn" />
                <FeatureCard icon={<Sparkles />} label="Collect" />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="p-6 pb-8 safe-bottom">
        <div className="flex gap-3 max-w-sm mx-auto">
          {currentStep > 0 && (
            <Button variant="ghost" onClick={handleBack} className="flex-1">
              Back
            </Button>
          )}
          <Button
            variant="primary"
            size="lg"
            onClick={handleNext}
            rightIcon={<ChevronRight className="w-5 h-5" />}
            className="flex-1"
          >
            {isLastStep ? "Let's Go!" : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm">
      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  )
}
