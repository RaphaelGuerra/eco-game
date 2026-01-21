import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useUserStore, useLearningStore } from '@/stores'
import { Button, Card } from '@/components/ui'
import { SegmentedProgress } from '@/components/ui/ProgressBar'
import { LessonTopBar } from '@/components/layout/TopBar'
import { Mascot } from '@/components/mascot'
import { soundManager } from '@/lib/soundManager'
import { celebrateLessonComplete, celebratePerfectLesson } from '@/lib/confetti'

// Demo challenges for lesson
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
      correct: 'That\'s right! The main restaurant is in the lobby.',
      incorrect: 'Not quite. The main restaurant is actually in the lobby.',
    },
  },
  {
    id: 'c2',
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
  {
    id: 'c3',
    type: 'multiple-choice',
    question: 'Which bird is the resort mascot?',
    options: [
      { id: 'a', text: 'Parrot', correct: false },
      { id: 'b', text: 'Toucan', correct: true },
      { id: 'c', text: 'Flamingo', correct: false },
      { id: 'd', text: 'Pelican', correct: false },
    ],
    feedback: {
      correct: 'Yes! Tuki the Toucan is our beloved mascot! 🦜',
      incorrect: 'Close! Our mascot is actually Tuki the Toucan.',
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

  const handleSelectAnswer = (optionId) => {
    if (showFeedback) return
    setSelectedAnswer(optionId)
  }

  const handleCheckAnswer = () => {
    const option = currentChallenge.options.find((o) => o.id === selectedAnswer)
    const correct = option?.correct || false
    
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
    // TODO: Show confirmation modal
    navigate('/learn')
  }

  // No hearts left
  if (hearts === 0 && !lessonComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <Mascot state="disappointed" size="lg" message="You're out of hearts!" />
        <p className="text-gray-600 mt-4 mb-6 text-center">
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
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10 }}
        >
          <Mascot
            state={isPerfect ? 'cheering' : 'happy'}
            size="xl"
            message={isPerfect ? 'Perfect! 🌟' : 'Great job! 🎉'}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            Lesson Complete!
          </h1>
          <p className="text-gray-600 mb-6">
            You earned {50 + (isPerfect ? 25 : 0)} XP
          </p>

          <Card className="mb-6 text-left">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Correct answers</span>
                <span className="font-bold text-green-600">
                  {progress?.correctAnswers || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Wrong answers</span>
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {currentChallenge.question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {currentChallenge.options.map((option) => {
                const isSelected = selectedAnswer === option.id
                const showResult = showFeedback && isSelected
                const showCorrectHint = showFeedback && option.correct && !isSelected

                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleSelectAnswer(option.id)}
                    disabled={showFeedback}
                    className={cn(
                      'w-full p-4 rounded-xl text-left transition-all duration-200',
                      // Result states
                      showResult && option.correct && 'border-2 border-green-500 bg-green-50 shadow-md',
                      showResult && !option.correct && 'border-2 border-red-400 bg-red-50',
                      showCorrectHint && 'border-2 border-green-300 bg-green-50/50',
                      // Selected state
                      isSelected && !showFeedback && 'border-[3px] border-primary-500 bg-primary-50 shadow-md',
                      // Default state
                      !isSelected && !showFeedback && 'border-2 border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm',
                      // Disabled non-selected during feedback
                      showFeedback && !isSelected && !showCorrectHint && 'opacity-50'
                    )}
                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option.text}</span>
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

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'mt-6 p-4 rounded-xl border-l-4',
                    isCorrect
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-400'
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
                        isCorrect ? 'text-green-800' : 'text-red-800'
                      )}>
                        {isCorrect ? 'Correct!' : 'Not quite'}
                      </p>
                      <p className={cn(
                        'text-sm',
                        isCorrect ? 'text-green-700' : 'text-red-700'
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
              disabled={!selectedAnswer}
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
    </div>
  )
}
