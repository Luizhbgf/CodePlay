import { awardXp, calculateStreakBonus, getLevelProgress } from './gamification'

describe('gamification rules', () => {
  it('calculates progress within the current level', () => {
    expect(getLevelProgress(860, 4)).toBe(44)
    expect(getLevelProgress(-1, 1)).toBe(0)
    expect(getLevelProgress(900, 0)).toBe(0)
  })

  it('awards only finite, non-negative XP', () => {
    expect(awardXp(100, 25)).toBe(125)
    expect(awardXp(100, -5)).toBe(100)
    expect(awardXp(100, Number.NaN)).toBe(100)
  })

  it('caps daily streak bonus at 50 XP', () => {
    expect(calculateStreakBonus(3)).toBe(15)
    expect(calculateStreakBonus(20)).toBe(50)
    expect(calculateStreakBonus(0)).toBe(0)
  })
})
