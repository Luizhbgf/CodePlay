export type LanguageId = 'typescript' | 'python' | 'java' | 'cpp'
export type LessonStatus = 'locked' | 'available' | 'completed'

export interface Lesson {
  id: string
  title: string
  description: string
  language: LanguageId
  durationMinutes: number
  xp: number
  status: LessonStatus
}

export interface Course {
  id: LanguageId
  name: string
  description: string
  accent: string
  progress: number
  lessons: Lesson[]
}

export interface LearnerProfile {
  name: string
  level: number
  xp: number
  streakDays: number
  hearts: number
}

export type QuizQuestion = {
  id: string
  prompt: string
  options: string[]
  correctAnswer: string
  explanation: string
}
