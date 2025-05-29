import { createContext } from 'react';

export const AppContext = createContext({
  userPoints: 0,
  userLevel: 1,
  completedLessons: [],
  streakDays: 0,
  addPoints: () => {},
  completeLesson: () => {},
  login: () => {},
  logout: () => {}
});