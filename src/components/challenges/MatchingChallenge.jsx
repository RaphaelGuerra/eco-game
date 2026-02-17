import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * Matching Challenge Component
 * Two columns where users tap to match pairs
 */
export default function MatchingChallenge({
  challenge,
  selectedAnswer,
  showFeedback,
  isCorrect,
  onSelectAnswer,
}) {
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [matches, setMatches] = useState({}) // { leftId: rightId }
  const [wrongPair, setWrongPair] = useState(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  // Shuffle the right column
  const [shuffledRight] = useState(() => {
    return [...challenge.pairs].sort(() => Math.random() - 0.5)
  })

  // Check if all pairs are matched correctly
  useEffect(() => {
    if (hasSubmitted) return // Prevent multiple submissions

    const allMatched = challenge.pairs.every(
      (pair, index) => matches[index] !== undefined
    )
    if (allMatched) {
      const allCorrect = challenge.pairs.every((pair, index) => {
        const matchedRight = shuffledRight.find((r) => r.right === matches[index])
        return matchedRight && matchedRight.left === pair.left
      })
      setHasSubmitted(true)
      onSelectAnswer(allCorrect ? 'correct' : 'incorrect')
    }
  }, [matches, challenge.pairs, shuffledRight, onSelectAnswer, hasSubmitted])

  const handleLeftClick = (index) => {
    if (showFeedback || matches[index] !== undefined) return
    setSelectedLeft(selectedLeft === index ? null : index)
    setWrongPair(null)
  }

  const handleRightClick = (rightValue) => {
    if (showFeedback || selectedLeft === null) return

    // Check if this right item is already matched
    const isAlreadyMatched = Object.values(matches).includes(rightValue)
    if (isAlreadyMatched) return

    // Check if the match is correct
    const leftPair = challenge.pairs[selectedLeft]
    const rightPair = shuffledRight.find((r) => r.right === rightValue)
    const isMatch = leftPair.left === rightPair.left

    if (isMatch) {
      setMatches((prev) => ({ ...prev, [selectedLeft]: rightValue }))
      setSelectedLeft(null)
    } else {
      setWrongPair({ left: selectedLeft, right: rightValue })
      setTimeout(() => setWrongPair(null), 500)
    }
  }

  const isLeftMatched = (index) => matches[index] !== undefined
  const isRightMatched = (rightValue) => Object.values(matches).includes(rightValue)

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
        {challenge.instruction || 'Tap a term, then tap its match'}
      </p>

      <div className="flex gap-4">
        {/* Left Column */}
        <div className="flex-1 space-y-3">
          {challenge.pairs.map((pair, index) => (
            <motion.button
              key={`left-${index}`}
              onClick={() => handleLeftClick(index)}
              disabled={showFeedback || isLeftMatched(index)}
              className={cn(
                'w-full p-4 rounded-xl text-center font-medium transition-all duration-200',
                // Matched state
                isLeftMatched(index) && 'border-2 border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300',
                // Selected state
                selectedLeft === index && 'border-[3px] border-primary-500 bg-primary-50 dark:bg-primary-900/30 shadow-md',
                // Wrong pair flash
                wrongPair?.left === index && 'border-2 border-red-400 bg-red-50 dark:bg-red-900/30 animate-wiggle',
                // Default state
                !isLeftMatched(index) && selectedLeft !== index && wrongPair?.left !== index &&
                  'border-2 border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              )}
              whileTap={!showFeedback && !isLeftMatched(index) ? { scale: 0.95 } : {}}
            >
              <span className="dark:text-gray-100">{pair.left}</span>
              {isLeftMatched(index) && (
                <Check className="inline-block w-4 h-4 ml-2 text-green-500" />
              )}
            </motion.button>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex-1 space-y-3">
          {shuffledRight.map((pair, index) => (
            <motion.button
              key={`right-${index}`}
              onClick={() => handleRightClick(pair.right)}
              disabled={showFeedback || isRightMatched(pair.right) || selectedLeft === null}
              className={cn(
                'w-full p-4 rounded-xl text-center font-medium transition-all duration-200',
                // Matched state
                isRightMatched(pair.right) && 'border-2 border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300',
                // Wrong pair flash
                wrongPair?.right === pair.right && 'border-2 border-red-400 bg-red-50 dark:bg-red-900/30 animate-wiggle',
                // Default state when something is selected
                !isRightMatched(pair.right) && selectedLeft !== null && wrongPair?.right !== pair.right &&
                  'border-2 border-secondary-200 bg-secondary-50 dark:bg-secondary-900/20 dark:border-secondary-700 hover:border-secondary-400',
                // Default state when nothing selected
                !isRightMatched(pair.right) && selectedLeft === null && wrongPair?.right !== pair.right &&
                  'border-2 border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-600 opacity-60'
              )}
              whileTap={!showFeedback && !isRightMatched(pair.right) && selectedLeft !== null ? { scale: 0.95 } : {}}
            >
              <span className="dark:text-gray-100">{pair.right}</span>
              {isRightMatched(pair.right) && (
                <Check className="inline-block w-4 h-4 ml-2 text-green-500" />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
