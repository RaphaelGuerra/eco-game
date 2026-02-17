import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * True/False Challenge Component
 * Two large buttons for True or False answers
 */
export default function TrueFalseChallenge({
  challenge,
  selectedAnswer,
  showFeedback,
  isCorrect,
  onSelectAnswer,
}) {
  const options = [
    { id: 'true', text: 'True', icon: Check },
    { id: 'false', text: 'False', icon: X },
  ]

  return (
    <div className="flex gap-4">
      {options.map((option) => {
        const isSelected = selectedAnswer === option.id
        const isOptionCorrect = challenge.isTrue === (option.id === 'true')
        const showResult = showFeedback && isSelected
        const showCorrectHint = showFeedback && isOptionCorrect && !isSelected
        const Icon = option.icon

        return (
          <motion.button
            key={option.id}
            onClick={() => onSelectAnswer(option.id)}
            disabled={showFeedback}
            className={cn(
              'flex-1 p-6 rounded-2xl text-center transition-all duration-200 flex flex-col items-center gap-3',
              // Result states
              showResult && isOptionCorrect && 'border-2 border-green-500 bg-green-50 dark:bg-green-900/30 shadow-lg',
              showResult && !isOptionCorrect && 'border-2 border-red-400 bg-red-50 dark:bg-red-900/30',
              showCorrectHint && 'border-2 border-green-300 bg-green-50/50 dark:bg-green-900/20',
              // Selected state
              isSelected && !showFeedback && 'border-[3px] border-primary-500 bg-primary-50 dark:bg-primary-900/30 shadow-lg',
              // Default state
              !isSelected && !showFeedback && 'border-2 border-gray-200 bg-white hover:border-gray-300 hover:shadow-md dark:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500',
              // Disabled during feedback
              showFeedback && !isSelected && !showCorrectHint && 'opacity-50'
            )}
            whileTap={!showFeedback ? { scale: 0.95 } : {}}
            whileHover={!showFeedback ? { scale: 1.02 } : {}}
          >
            <div
              className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center',
                option.id === 'true'
                  ? 'bg-green-100 dark:bg-green-900/50'
                  : 'bg-red-100 dark:bg-red-900/50'
              )}
            >
              <Icon
                className={cn(
                  'w-8 h-8',
                  option.id === 'true' ? 'text-green-600' : 'text-red-500'
                )}
              />
            </div>
            <span className="font-bold text-xl dark:text-gray-100">{option.text}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
