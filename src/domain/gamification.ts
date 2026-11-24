export const XP_PER_LEVEL = 250

export function getLevelProgress(xp: number, level: number): number {
  if (xp < 0 || level < 1) return 0
  return Math.min(
    100,
    Math.max(0, Math.round(((xp - (level - 1) * XP_PER_LEVEL) / XP_PER_LEVEL) * 100)),
  )
}

export function awardXp(currentXp: number, earnedXp: number): number {
  if (!Number.isFinite(currentXp) || !Number.isFinite(earnedXp) || earnedXp < 0) return currentXp
  return currentXp + earnedXp
}

export function calculateStreakBonus(days: number): number {
  if (!Number.isInteger(days) || days < 1) return 0
  return Math.min(days * 5, 50)
}
