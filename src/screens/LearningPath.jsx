import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Lock, Check, Play } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useLearningStore } from '@/stores'
import { Card } from '@/components/ui'
import { TopBar, BottomNav } from '@/components/layout'

// Demo units data
const UNITS = [
  {
    id: 'unit-1',
    title: 'Welcome to Paradise',
    description: 'Get to know your tropical resort home',
    icon: '🏝️',
    color: 'from-green-400 to-emerald-500',
    lessons: [
      { id: 'lesson-1-1', title: 'Resort Orientation', xp: 50 },
      { id: 'lesson-1-2', title: 'Meet the Staff', xp: 50 },
      { id: 'lesson-1-3', title: 'Resort Amenities', xp: 50 },
      { id: 'lesson-1-4', title: 'Safety First', xp: 50 },
      { id: 'lesson-1-5', title: 'Unit Review', xp: 100 },
    ],
  },
  {
    id: 'unit-2',
    title: 'Local Wildlife Discovery',
    description: 'Learn about the amazing creatures around you',
    icon: '🦜',
    color: 'from-blue-400 to-cyan-500',
    lessons: [
      { id: 'lesson-2-1', title: 'Birds of Paradise', xp: 50 },
      { id: 'lesson-2-2', title: 'Marine Life', xp: 50 },
      { id: 'lesson-2-3', title: 'Jungle Creatures', xp: 50 },
      { id: 'lesson-2-4', title: 'Nocturnal Animals', xp: 50 },
      { id: 'lesson-2-5', title: 'Unit Review', xp: 100 },
    ],
  },
  {
    id: 'unit-3',
    title: 'Sustainability Practices',
    description: 'Discover how we protect our environment',
    icon: '🌿',
    color: 'from-amber-400 to-orange-500',
    lessons: [
      { id: 'lesson-3-1', title: 'Eco-Friendly Living', xp: 50 },
      { id: 'lesson-3-2', title: 'Conservation Efforts', xp: 50 },
      { id: 'lesson-3-3', title: 'Reduce & Recycle', xp: 50 },
      { id: 'lesson-3-4', title: 'Protecting Wildlife', xp: 50 },
      { id: 'lesson-3-5', title: 'Unit Review', xp: 100 },
    ],
  },
]

export default function LearningPath() {
  const navigate = useNavigate()
  const completedLessons = useLearningStore((state) => state.completedLessons)
  const completedUnits = useLearningStore((state) => state.completedUnits)

  const isLessonCompleted = (lessonId) => completedLessons.includes(lessonId)
  const isUnitCompleted = (unitId) => completedUnits.includes(unitId)

  const getUnitStatus = (unit, unitIndex) => {
    if (isUnitCompleted(unit.id)) return 'completed'
    if (unitIndex === 0) return 'current'
    
    // Check if previous unit is completed
    const prevUnit = UNITS[unitIndex - 1]
    if (prevUnit && isUnitCompleted(prevUnit.id)) return 'current'
    
    return 'locked'
  }

  const getLessonStatus = (lesson, lessonIndex, unit, unitStatus) => {
    if (unitStatus === 'locked') return 'locked'
    if (isLessonCompleted(lesson.id)) return 'completed'
    
    // First lesson of current unit is always available
    if (lessonIndex === 0 && unitStatus === 'current') return 'current'
    
    // Check if previous lesson is completed
    const prevLesson = unit.lessons[lessonIndex - 1]
    if (prevLesson && isLessonCompleted(prevLesson.id)) return 'current'
    
    return 'locked'
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar />

      <main className="px-4 py-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-6">
          Learning Path
        </h1>

        <div className="space-y-8">
          {UNITS.map((unit, unitIndex) => {
            const unitStatus = getUnitStatus(unit, unitIndex)
            const completedCount = unit.lessons.filter((l) =>
              isLessonCompleted(l.id)
            ).length

            return (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: unitIndex * 0.1 }}
              >
                {/* Unit Header */}
                <Card
                  className={cn(
                    'mb-4',
                    unitStatus === 'locked' && 'opacity-60'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        'w-14 h-14 rounded-xl flex items-center justify-center text-2xl',
                        'bg-gradient-to-br',
                        unit.color
                      )}
                    >
                      {unit.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="font-bold text-gray-800">{unit.title}</h2>
                        {unitStatus === 'locked' && (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                        {unitStatus === 'completed' && (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{unit.description}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {completedCount}/{unit.lessons.length} lessons
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Lessons */}
                <div className="relative pl-8">
                  {/* Connecting line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

                  <div className="space-y-3">
                    {unit.lessons.map((lesson, lessonIndex) => {
                      const lessonStatus = getLessonStatus(
                        lesson,
                        lessonIndex,
                        unit,
                        unitStatus
                      )

                      return (
                        <LessonNode
                          key={lesson.id}
                          lesson={lesson}
                          status={lessonStatus}
                          onClick={() => {
                            if (lessonStatus !== 'locked') {
                              navigate(`/lesson/${lesson.id}`)
                            }
                          }}
                        />
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

function LessonNode({ lesson, status, onClick }) {
  const statusStyles = {
    locked: 'bg-gray-100 border-gray-200 text-gray-400',
    current: 'bg-primary-50 border-primary-300 text-primary-700',
    completed: 'bg-green-50 border-green-300 text-green-700',
  }

  const nodeStyles = {
    locked: 'bg-gray-200 border-gray-300',
    current: 'bg-primary-500 border-primary-600',
    completed: 'bg-green-500 border-green-600',
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={status === 'locked'}
      className={cn(
        'relative w-full flex items-center gap-4 p-3 rounded-xl border-2 transition-all',
        statusStyles[status],
        status !== 'locked' && 'hover:shadow-md cursor-pointer'
      )}
      whileTap={status !== 'locked' ? { scale: 0.98 } : {}}
    >
      {/* Node dot */}
      <div
        className={cn(
          'absolute -left-6 w-4 h-4 rounded-full border-2',
          nodeStyles[status]
        )}
      >
        {status === 'completed' && (
          <Check className="w-2.5 h-2.5 text-white absolute top-0.5 left-0.5" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 text-left">
        <p className="font-medium">{lesson.title}</p>
        <p className="text-xs opacity-70">+{lesson.xp} XP</p>
      </div>

      {/* Action icon */}
      {status === 'locked' && <Lock className="w-4 h-4" />}
      {status === 'current' && <Play className="w-4 h-4 fill-current" />}
      {status === 'completed' && <Check className="w-4 h-4" />}
    </motion.button>
  )
}
