import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Learning Store - Manages lesson progress, units, and spaced repetition
 */
export const useLearningStore = create(
  persist(
    (set, get) => ({
      // Current progress
      currentUnitId: 'unit-1',
      currentLessonId: null,

      // Completion tracking
      completedLessons: [], // Array of lesson IDs
      completedUnits: [], // Array of unit IDs

      // Spaced repetition queue
      reviewQueue: [], // { challengeId, nextReviewDate, attemptCount, lessonId }

      // Active lesson state
      activeLessonProgress: null,
      /* Shape:
      {
        lessonId: string,
        challengeIndex: number,
        correctAnswers: number,
        wrongAnswers: number,
        startTime: number,
        answers: [{ challengeId, isCorrect, timeSpent }]
      }
      */

      // Lesson results (shown after completion)
      lastLessonResults: null,

      // Actions
      startLesson: (lessonId) => {
        set({
          currentLessonId: lessonId,
          activeLessonProgress: {
            lessonId,
            challengeIndex: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            startTime: Date.now(),
            answers: [],
          },
        })
      },

      completeChallenge: (challengeId, isCorrect, timeSpent = 0) => {
        const state = get()
        if (!state.activeLessonProgress) return

        const progress = state.activeLessonProgress
        const newAnswers = [
          ...progress.answers,
          { challengeId, isCorrect, timeSpent },
        ]

        // Update review queue if wrong
        let newReviewQueue = state.reviewQueue
        if (!isCorrect) {
          // Check if already in queue
          const existingIndex = newReviewQueue.findIndex(
            (item) => item.challengeId === challengeId
          )

          if (existingIndex >= 0) {
            // Update existing entry - reset to 1 day
            newReviewQueue = [...newReviewQueue]
            newReviewQueue[existingIndex] = {
              ...newReviewQueue[existingIndex],
              nextReviewDate: Date.now() + 24 * 60 * 60 * 1000,
              attemptCount: newReviewQueue[existingIndex].attemptCount + 1,
            }
          } else {
            // Add new entry
            newReviewQueue = [
              ...newReviewQueue,
              {
                challengeId,
                lessonId: progress.lessonId,
                nextReviewDate: Date.now() + 24 * 60 * 60 * 1000,
                attemptCount: 1,
              },
            ]
          }
        } else {
          // If correct, update spaced repetition interval
          const existingIndex = newReviewQueue.findIndex(
            (item) => item.challengeId === challengeId
          )
          if (existingIndex >= 0) {
            const existing = newReviewQueue[existingIndex]
            const intervals = [1, 3, 7, 14, 30] // days
            const nextInterval =
              intervals[Math.min(existing.attemptCount, intervals.length - 1)]

            newReviewQueue = [...newReviewQueue]
            newReviewQueue[existingIndex] = {
              ...existing,
              nextReviewDate:
                Date.now() + nextInterval * 24 * 60 * 60 * 1000,
              attemptCount: existing.attemptCount + 1,
            }
          }
        }

        set({
          activeLessonProgress: {
            ...progress,
            challengeIndex: progress.challengeIndex + 1,
            correctAnswers: progress.correctAnswers + (isCorrect ? 1 : 0),
            wrongAnswers: progress.wrongAnswers + (isCorrect ? 0 : 1),
            answers: newAnswers,
          },
          reviewQueue: newReviewQueue,
        })
      },

      completeLesson: () => {
        const state = get()
        if (!state.activeLessonProgress) return null

        const progress = state.activeLessonProgress
        const lessonId = progress.lessonId
        const totalTime = Date.now() - progress.startTime
        const isPerfect = progress.wrongAnswers === 0

        // Calculate results
        const results = {
          lessonId,
          correctAnswers: progress.correctAnswers,
          wrongAnswers: progress.wrongAnswers,
          totalChallenges: progress.answers.length,
          accuracy:
            progress.answers.length > 0
              ? (progress.correctAnswers / progress.answers.length) * 100
              : 0,
          totalTime,
          isPerfect,
          answers: progress.answers,
        }

        // Update completed lessons
        const newCompletedLessons = state.completedLessons.includes(lessonId)
          ? state.completedLessons
          : [...state.completedLessons, lessonId]

        set({
          completedLessons: newCompletedLessons,
          currentLessonId: null,
          activeLessonProgress: null,
          lastLessonResults: results,
        })

        return results
      },

      abandonLesson: () => {
        set({
          currentLessonId: null,
          activeLessonProgress: null,
        })
      },

      completeUnit: (unitId) => {
        const state = get()
        if (state.completedUnits.includes(unitId)) return

        set({
          completedUnits: [...state.completedUnits, unitId],
        })
      },

      setCurrentUnit: (unitId) => {
        set({ currentUnitId: unitId })
      },

      // Get lessons due for review
      getDueReviews: () => {
        const state = get()
        const now = Date.now()
        return state.reviewQueue
          .filter((item) => item.nextReviewDate <= now)
          .sort((a, b) => a.nextReviewDate - b.nextReviewDate)
      },

      // Check if a lesson is completed
      isLessonCompleted: (lessonId) => {
        return get().completedLessons.includes(lessonId)
      },

      // Check if a unit is completed
      isUnitCompleted: (unitId) => {
        return get().completedUnits.includes(unitId)
      },

      // Get completion count for a unit
      getUnitProgress: (unitId, totalLessons) => {
        const state = get()
        // This would need to be enhanced with actual unit-lesson mapping
        // For now, return a simple count
        const completedInUnit = state.completedLessons.filter((id) =>
          id.startsWith(unitId.replace('unit-', 'lesson-'))
        ).length
        return {
          completed: completedInUnit,
          total: totalLessons,
          percentage: totalLessons > 0 ? (completedInUnit / totalLessons) * 100 : 0,
        }
      },

      // Clear last lesson results
      clearLastResults: () => {
        set({ lastLessonResults: null })
      },

      // Reset for testing
      resetProgress: () => {
        set({
          currentUnitId: 'unit-1',
          currentLessonId: null,
          completedLessons: [],
          completedUnits: [],
          reviewQueue: [],
          activeLessonProgress: null,
          lastLessonResults: null,
        })
      },
    }),
    {
      name: 'eco-game-learning',
      version: 1,
    }
  )
)

export default useLearningStore
