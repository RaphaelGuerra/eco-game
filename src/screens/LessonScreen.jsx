import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useUserStore, useLearningStore } from '@/stores'
import { Button, Card } from '@/components/ui'
import { AlertModal } from '@/components/ui/Modal'
import { LessonTopBar } from '@/components/layout/TopBar'
import { Mascot } from '@/components/mascot'
import { soundManager } from '@/lib/soundManager'
import { celebrateLessonComplete, celebratePerfectLesson } from '@/lib/confetti'
import {
  MultipleChoiceChallenge,
  TrueFalseChallenge,
  MatchingChallenge,
  FillInBlankChallenge,
} from '@/components/challenges'

// Demo challenges for lesson - now with multiple types
const DEMO_CHALLENGES = [
  {
    id: 'c1',
    type: 'multiple-choice',
    question: 'Where is the main restaurant located?',
    options: [
      { id: 'a', text: 'Beach', correct: false },
      { id: 'b', text: 'Lobby', correct: true },
      { id: 'c', text: 'Pool', correct: false },
      { id: 'd', text: 'Garden', correct: false },
    ],
    feedback: {
      correct: "That's right! The main restaurant is in the lobby.",
      incorrect: 'Not quite. The main restaurant is actually in the lobby.',
    },
  },
  {
    id: 'c2',
    type: 'true-false',
    question: 'The resort front desk is open 24 hours a day.',
    statement: 'The resort front desk is open 24 hours a day.',
    isTrue: true,
    feedback: {
      correct: 'Correct! Our front desk is available 24/7 for your convenience.',
      incorrect: 'Actually, our front desk IS open 24/7!',
    },
  },
  {
    id: 'c3',
    type: 'fill-in-blank',
    question: 'Complete the sentence about our mascot.',
    sentence: 'The resort mascot is Tuki the ___.',
    answer: 'Toucan',
    acceptableAnswers: ['toucan'],
    distractors: ['Parrot', 'Flamingo', 'Pelican'],
    feedback: {
      correct: 'Yes! Tuki the Toucan is our beloved mascot!',
      incorrect: 'Close! Our mascot is actually Tuki the Toucan.',
    },
  },
  {
    id: 'c4',
    type: 'matching',
    question: 'Match each amenity with its location.',
    instruction: 'Tap an amenity, then tap where to find it',
    pairs: [
      { left: 'Restaurant', right: 'Lobby' },
      { left: 'Fitness Center', right: 'Ground Floor West' },
      { left: 'Spa', right: 'Second Floor' },
    ],
    feedback: {
      correct: 'Perfect! You know your way around the resort!',
      incorrect: 'Some matches were incorrect. Review the resort map!',
    },
  },
  {
    id: 'c5',
    type: 'multiple-choice',
    question: 'What time does breakfast start?',
    options: [
      { id: 'a', text: '6:00 AM', correct: false },
      { id: 'b', text: '7:00 AM', correct: true },
      { id: 'c', text: '8:00 AM', correct: false },
      { id: 'd', text: '9:00 AM', correct: false },
    ],
    feedback: {
      correct: 'Correct! Breakfast starts at 7:00 AM.',
      incorrect: 'Actually, breakfast starts at 7:00 AM.',
    },
  },
]

export default function LessonScreen() {
  const { lessonId } = useParams()
  const navigate = useNavigate()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [lessonComplete, setLessonComplete] = useState(false)
  const [lessonResults, setLessonResults] = useState(null)
  const [showExitModal, setShowExitModal] = useState(false)

  const addXP = useUserStore((state) => state.addXP)
  const loseHeart = useUserStore((state) => state.loseHeart)
  const hearts = useUserStore((state) => state.hearts)

  const startLesson = useLearningStore((state) => state.startLesson)
  const completeChallenge = useLearningStore((state) => state.completeChallenge)
  const completeLesson = useLearningStore((state) => state.completeLesson)
  const activeLessonProgress = useLearningStore((state) => state.activeLessonProgress)

  const challenges = DEMO_CHALLENGES
  const currentChallenge = challenges[currentIndex]
  const totalChallenges = challenges.length

  // Start lesson on mount
  useEffect(() => {
    startLesson(lessonId)
  }, [lessonId, startLesson])

  const handleSelectAnswer = (answer) => {
    if (showFeedback) return
    setSelectedAnswer(answer)
  }

  const checkAnswer = (challenge, answer) => {
    switch (challenge.type) {
      case 'multiple-choice':
        const option = challenge.options.find((o) => o.id === answer)
        return option?.correct || false

      case 'true-false':
        return challenge.isTrue === (answer === 'true')

      case 'fill-in-blank':
        const acceptableAnswers = [
          challenge.answer.toLowerCase(),
          ...(challenge.acceptableAnswers || []).map((a) => a.toLowerCase()),
        ]
        return acceptableAnswers.includes(answer?.toLowerCase())

      case 'matching':
        return answer === 'correct'

      default:
        return false
    }
  }

  const handleCheckAnswer = () => {
    const correct = checkAnswer(currentChallenge, selectedAnswer)

    setIsCorrect(correct)
    setShowFeedback(true)

    // Play sound
    soundManager.play(correct ? 'correct' : 'wrong')

    // Update progress
    completeChallenge(currentChallenge.id, correct)

    if (!correct) {
      loseHeart()
    }
  }

  const handleContinue = () => {
    if (currentIndex < totalChallenges - 1) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      // Lesson complete
      const results = completeLesson()
      setLessonResults(results)
      const xpEarned = 50 + (results?.isPerfect ? 25 : 0)
      addXP(xpEarned)

      // Celebration
      if (results?.isPerfect) {
        celebratePerfectLesson()
      } else {
        celebrateLessonComplete()
      }

      soundManager.play('lessonComplete')
      setLessonComplete(true)
    }
  }

  const handleExit = () => {
    setShowExitModal(true)
  }

  const confirmExit = () => {
    setShowExitModal(false)
    navigate('/learn')
  }

  // Check if answer is ready to check
  const canCheck = () => {
    if (!selectedAnswer) return false
    // Matching challenge auto-submits when complete
    if (currentChallenge.type === 'matching') return false
    return true
  }

  // Render the appropriate challenge component
  const renderChallenge = () => {
    const commonProps = {
      challenge: currentChallenge,
      selectedAnswer,
      showFeedback,
      isCorrect,
      onSelectAnswer: handleSelectAnswer,
    }

    switch (currentChallenge.type) {
      case 'multiple-choice':
        return <MultipleChoiceChallenge {...commonProps} />

      case 'true-false':
        return <TrueFalseChallenge {...commonProps} />

      case 'matching':
        return (
          <MatchingChallenge
            {...commonProps}
            onSelectAnswer={(result) => {
              setSelectedAnswer(result)
              // Auto-check when matching is complete
              if (result === 'correct' || result === 'incorrect') {
                setTimeout(() => {
                  const correct = result === 'correct'
                  setIsCorrect(correct)
                  setShowFeedback(true)
                  soundManager.play(correct ? 'correct' : 'wrong')
                  completeChallenge(currentChallenge.id, correct)
                  if (!correct) loseHeart()
                }, 300)
              }
            }}
          />
        )

      case 'fill-in-blank':
        return <FillInBlankChallenge {...commonProps} />

      default:
        return <MultipleChoiceChallenge {...commonProps} />
    }
  }

  // No hearts left
  if (hearts === 0 && !lessonComplete) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6">
        <Mascot state="disappointed" size="lg" message="You're out of hearts!" />
        <p className="text-gray-600 dark:text-gray-400 mt-4 mb-6 text-center">
          Wait for hearts to regenerate or practice old lessons to earn more.
        </p>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    )
  }

  // Lesson complete screen
  if (lessonComplete) {
    const progress = lessonResults || activeLessonProgress
    const isPerfect = progress?.wrongAnswers === 0

    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white dark:from-primary-900/30 dark:to-gray-900 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10 }}
        >
          <Mascot
            state={isPerfect ? 'cheering' : 'happy'}
            size="xl"
            message={isPerfect ? 'Perfect!' : 'Great job!'}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-2">
            Lesson Complete!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You earned {50 + (isPerfect ? 25 : 0)} XP
          </p>

          <Card className="mb-6 text-left">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Correct answers</span>
                <span className="font-bold text-green-600">
                  {progress?.correctAnswers || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Wrong answers</span>
                <span className="font-bold text-red-500">
                  {progress?.wrongAnswers || 0}
                </span>
              </div>
              {isPerfect && (
                <div className="flex justify-between text-amber-600">
                  <span>Perfect bonus</span>
                  <span className="font-bold">+25 XP</span>
                </div>
              )}
            </div>
          </Card>

          <Button size="lg" fullWidth onClick={() => navigate('/learn')}>
            Continue
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <LessonTopBar
        progress={currentIndex + (showFeedback ? 1 : 0)}
        total={totalChallenges}
        onClose={handleExit}
      />

      <main className="flex-1 flex flex-col p-6 max-w-lg mx-auto w-full">
        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChallenge.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1"
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              {currentChallenge.question || currentChallenge.statement}
            </h2>

            {/* Challenge Component */}
            {renderChallenge()}

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'mt-6 p-4 rounded-xl border-l-4',
                    isCorrect
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-500'
                      : 'bg-red-50 dark:bg-red-900/30 border-red-400'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                      isCorrect ? 'bg-green-500' : 'bg-red-400'
                    )}>
                      {isCorrect ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <X className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <p className={cn(
                        'font-semibold mb-1',
                        isCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'
                      )}>
                        {isCorrect ? 'Correct!' : 'Not quite'}
                      </p>
                      <p className={cn(
                        'text-sm',
                        isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                      )}>
                        {isCorrect
                          ? currentChallenge.feedback.correct
                          : currentChallenge.feedback.incorrect}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Action button */}
        <div className="mt-auto pt-6">
          {!showFeedback ? (
            <Button
              size="lg"
              fullWidth
              disabled={!canCheck()}
              onClick={handleCheckAnswer}
            >
              Check
            </Button>
          ) : (
            <Button
              size="lg"
              fullWidth
              variant={isCorrect ? 'success' : 'primary'}
              onClick={handleContinue}
            >
              Continue
            </Button>
          )}
        </div>
      </main>

      {/* Exit Confirmation Modal */}
      <AlertModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={confirmExit}
        title="Leave Lesson?"
        message="Your progress in this lesson will be lost. Are you sure you want to exit?"
        confirmText="Leave"
        cancelText="Stay"
        variant="danger"
      />
    </div>
  )
}
