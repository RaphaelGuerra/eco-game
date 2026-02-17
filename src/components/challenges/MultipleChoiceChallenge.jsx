import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * Multiple Choice Challenge Component
 * Extracted from LessonScreen for reusability
 */
export default function MultipleChoiceChallenge({
  challenge,
  selectedAnswer,
  showFeedback,
  isCorrect,
  onSelectAnswer,
}) {
  return (
    <div className="space-y-3">
      {challenge.options.map((option) => {
        const isSelected = selectedAnswer === option.id
        const showResult = showFeedback && isSelected
        const showCorrectHint = showFeedback && option.correct && !isSelected

        return (
          <motion.button
            key={option.id}
            onClick={() => onSelectAnswer(option.id)}
            disabled={showFeedback}
            className={cn(
              'w-full p-4 rounded-xl text-left transition-all duration-200',
              // Result states
              showResult && option.correct && 'border-2 border-green-500 bg-green-50 dark:bg-green-900/30 shadow-md',
              showResult && !option.correct && 'border-2 border-red-400 bg-red-50 dark:bg-red-900/30',
              showCorrectHint && 'border-2 border-green-300 bg-green-50/50 dark:bg-green-900/20',
              // Selected state
              isSelected && !showFeedback && 'border-[3px] border-primary-500 bg-primary-50 dark:bg-primary-900/30 shadow-md',
              // Default state
              !isSelected && !showFeedback && 'border-2 border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500',
              // Disabled non-selected during feedback
              showFeedback && !isSelected && !showCorrectHint && 'opacity-50'
            )}
            whileTap={!showFeedback ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium dark:text-gray-100">{option.text}</span>
              {showResult && option.correct && (
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              {showResult && !option.correct && (
                <div className="w-6 h-6 rounded-full bg-red-400 flex items-center justify-center">
                  <X className="w-4 h-4 text-white" />
                </div>
              )}
              {showCorrectHint && (
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
