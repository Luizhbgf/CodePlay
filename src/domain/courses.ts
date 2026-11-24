import type { Course, LearnerProfile, QuizQuestion } from './types'

export const learner: LearnerProfile = { name: 'Alex', level: 4, xp: 860, streakDays: 7, hearts: 5 }

export const courses: Course[] = [
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'Interfaces, tipos e aplicações modernas.',
    accent: '#60A5FA',
    progress: 68,
    lessons: [
      {
        id: 'ts-1',
        title: 'Tipos primitivos',
        description: 'Dê forma aos seus primeiros valores.',
        language: 'typescript',
        durationMinutes: 8,
        xp: 30,
        status: 'completed',
      },
      {
        id: 'ts-2',
        title: 'Objetos e interfaces',
        description: 'Descreva dados com confiança.',
        language: 'typescript',
        durationMinutes: 12,
        xp: 45,
        status: 'available',
      },
      {
        id: 'ts-3',
        title: 'Tipos avançados',
        description: 'Construa tipos que se adaptam.',
        language: 'typescript',
        durationMinutes: 15,
        xp: 60,
        status: 'locked',
      },
    ],
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Automação, lógica e ciência de dados.',
    accent: '#FBBF24',
    progress: 42,
    lessons: [
      {
        id: 'py-1',
        title: 'Variáveis e valores',
        description: 'Guarde e transforme informação.',
        language: 'python',
        durationMinutes: 10,
        xp: 35,
        status: 'available',
      },
      {
        id: 'py-2',
        title: 'Laços de repetição',
        description: 'Faça o código trabalhar por você.',
        language: 'python',
        durationMinutes: 12,
        xp: 45,
        status: 'locked',
      },
    ],
  },
  {
    id: 'java',
    name: 'Java',
    description: 'Orientação a objetos, do início ao projeto.',
    accent: '#FB7185',
    progress: 24,
    lessons: [
      {
        id: 'java-1',
        title: 'Seu primeiro programa',
        description: 'Entenda a estrutura de uma classe.',
        language: 'java',
        durationMinutes: 12,
        xp: 40,
        status: 'available',
      },
    ],
  },
  {
    id: 'cpp',
    name: 'C++',
    description: 'Performance, estruturas e fundamentos.',
    accent: '#A78BFA',
    progress: 11,
    lessons: [
      {
        id: 'cpp-1',
        title: 'Fundamentos de C++',
        description: 'Conheça o poder da linguagem.',
        language: 'cpp',
        durationMinutes: 14,
        xp: 45,
        status: 'available',
      },
    ],
  },
]

export const dailyQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: 'Qual tipo representa um texto em TypeScript?',
    options: ['string', 'number', 'boolean'],
    correctAnswer: 'string',
    explanation: 'string representa sequências de caracteres, como nomes e mensagens.',
  },
  {
    id: 'q2',
    prompt: 'Qual palavra declara uma constante em TypeScript?',
    options: ['const', 'repeat', 'define'],
    correctAnswer: 'const',
    explanation: 'const cria uma referência que não pode ser reatribuída.',
  },
]
