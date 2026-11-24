import { useState } from 'react'
import * as Haptics from 'expo-haptics'
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import type { QuizQuestion } from '../src/domain/types'
import { isAnswerCorrect } from '../src/domain/answers'
import { colors, radii, spacing } from '../src/theme/tokens'

export default function QuizCard({
  question,
  onCorrect,
}: {
  question: QuizQuestion
  onCorrect?: () => void
}) {
  const [selected, setSelected] = useState<string | null>(null)
  const answered = selected !== null
  const correct = selected !== null && isAnswerCorrect(question, selected)
  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <Text style={styles.kicker}>DESAFIO RÁPIDO</Text>
        <Text style={styles.counter}>01 / 05</Text>
      </View>
      <Text style={styles.prompt}>{question.prompt}</Text>
      <View style={styles.options}>
        {question.options.map((option, index) => {
          const chosen = selected === option
          const isAnswer = answered && option === question.correctAnswer
          return (
            <Pressable
              key={option}
              onPress={() => {
                if (!answered) {
                  setSelected(option)
                  const isCorrect = option === question.correctAnswer
                  if (isCorrect) onCorrect?.()
                  if (Platform.OS !== 'web')
                    void Haptics.notificationAsync(
                      isCorrect
                        ? Haptics.NotificationFeedbackType.Success
                        : Haptics.NotificationFeedbackType.Error,
                    )
                }
              }}
              disabled={answered}
              accessibilityRole="radio"
              accessibilityState={{ checked: chosen, disabled: answered }}
              style={[
                styles.option,
                chosen && (correct ? styles.correct : styles.incorrect),
                isAnswer && styles.correct,
              ]}
            >
              <Text style={[styles.letter, isAnswer && styles.correctText]}>
                {String.fromCharCode(65 + index)}
              </Text>
              <Text style={[styles.optionText, isAnswer && styles.correctText]}>{option}</Text>
            </Pressable>
          )
        })}
      </View>
      {answered && (
        <Text
          accessibilityLiveRegion="polite"
          style={[styles.feedback, correct ? styles.feedbackGood : styles.feedbackBad]}
        >
          {correct ? `Correto. ${question.explanation}` : `Ainda não. ${question.explanation}`}
        </Text>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.lg,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  heading: { flexDirection: 'row', justifyContent: 'space-between' },
  kicker: { color: colors.green, fontSize: 10, fontWeight: '800', letterSpacing: 1.3 },
  counter: { color: colors.muted, fontSize: 11 },
  prompt: { color: colors.text, fontSize: 19, lineHeight: 27, fontWeight: '700' },
  options: { gap: spacing.sm },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.sm,
    padding: spacing.md,
    minHeight: 48,
    backgroundColor: colors.surfaceRaised,
  },
  letter: { color: colors.muted, fontSize: 12, fontWeight: '800', width: 20 },
  optionText: { color: colors.text, fontSize: 14, fontFamily: 'monospace' },
  correct: { borderColor: colors.green, backgroundColor: '#1B2A1C' },
  incorrect: { borderColor: colors.red, backgroundColor: '#321E2A' },
  correctText: { color: colors.green },
  feedback: { fontSize: 12, lineHeight: 18 },
  feedbackGood: { color: colors.green },
  feedbackBad: { color: colors.red },
})
