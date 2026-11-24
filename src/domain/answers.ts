import type { QuizQuestion } from './types'

export function isAnswerCorrect(question: QuizQuestion, answer: string): boolean {
  return question.options.includes(answer) && answer === question.correctAnswer
}
