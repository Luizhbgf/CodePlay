import { isAnswerCorrect } from './answers'
import type { QuizQuestion } from './types'

const question: QuizQuestion = {
  id: 'q',
  prompt: 'Qual é o tipo textual?',
  options: ['string', 'number'],
  correctAnswer: 'string',
  explanation: 'Texto é string.',
}

describe('quiz answer validation', () => {
  it('accepts the correct option', () => expect(isAnswerCorrect(question, 'string')).toBe(true))
  it('rejects an incorrect or unknown option', () => {
    expect(isAnswerCorrect(question, 'number')).toBe(false)
    expect(isAnswerCorrect(question, 'other')).toBe(false)
  })
})
