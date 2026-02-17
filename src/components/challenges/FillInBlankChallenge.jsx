import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * Fill in the Blank Challenge Component
 * Sentence with a blank and a word bank to choose from
 */
export default function FillInBlankChallenge({
  challenge,
  selectedAnswer,
  showFeedback,
  isCorrect,
  onSelectAnswer,
}) {
  // Split sentence by the blank marker (usually ___ or {blank})
  const parts = challenge.sentence.split(/___|\{blank\}/)

  // Generate word bank (correct answer + distractors)
  const [wordBank] = useState(() => {
    const words = [
      challenge.answer,
      ...(challenge.distractors || []),
    ]
    return words.sort(() => Math.random() - 0.5)
  })

  const handleWordSelect = (word) => {
    if (showFeedback) return
    onSelectAnswer(word)
  }

  const isWordCorrect = (word) => {
    const acceptableAnswers = [
      challenge.answer.toLowerCase(),
      ...(challenge.acceptableAnswers || []).map((a) => a.toLowerCase()),
    ]
    return acceptableAnswers.includes(word.toLowerCase())
  }

  return (
    <div className="space-y-6">
      {/* Sentence with blank */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
        <p className="text-lg leading-relaxed dark:text-gray-100">
          {parts.map((part, index) => (
            <span key={index}>
              {part}
              {index < parts.length - 1 && (
                <span
                  className={cn(
                    'inline-block min-w-[100px] mx-1 px-3 py-1 rounded-lg text-center font-bold transition-all',
                    // With selected answer
                    selectedAnswer && showFeedback && isWordCorrect(selectedAnswer) &&
                      'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-2 border-green-500',
                    selectedAnswer && showFeedback && !isWordCorrect(selectedAnswer) &&
                      'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border-2 border-red-400',
                    selectedAnswer && !showFeedback &&
                      'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 border-2 border-primary-500',
                    // Empty state
                    !selectedAnswer && 'bg-gray-200 dark:bg-gray-700 text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600'
                  )}
                >
                  {selectedAnswer || '?'}
                </span>
              )}
            </span>
          ))}
        </p>
      </div>

      {/* Word Bank */}
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Choose a word:</p>
        <div className="flex flex-wrap gap-2">
          {wordBank.map((word, index) => {
            const isSelected = selectedAnswer === word
            const showCorrectWord = showFeedback && isWordCorrect(word) && !isSelected

            return (
              <motion.button
                key={index}
                onClick={() => handleWordSelect(word)}
                disabled={showFeedback}
                className={cn(
                  'px-4 py-2 rounded-xl font-medium transition-all duration-200',
                  // Result states
                  isSelected && showFeedback && isWordCorrect(word) &&
                    'bg-green-500 text-white shadow-md',
                  isSelected && showFeedback && !isWordCorrect(word) &&
                    'bg-red-400 text-white',
                  showCorrectWord &&
                    'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-2 border-green-400',
                  // Selected state (before check)
                  isSelected && !showFeedback &&
                    'bg-primary-500 text-white shadow-md',
                  // Default state
                  !isSelected && !showCorrectWord &&
                    'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-sm',
                  // Disabled non-selected during feedback
                  showFeedback && !isSelected && !showCorrectWord && 'opacity-50'
                )}
                whileTap={!showFeedback ? { scale: 0.95 } : {}}
                whileHover={!showFeedback ? { scale: 1.02 } : {}}
              >
                {word}
                {isSelected && showFeedback && (
                  <span className="ml-2 inline-flex items-center">
                    {isWordCorrect(word) ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </span>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
