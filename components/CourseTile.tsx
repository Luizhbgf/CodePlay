import { Ionicons } from '@expo/vector-icons'
import { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import type { Course } from '../src/domain/types'
import { colors, radii, spacing } from '../src/theme/tokens'

export default function CourseTile({ course, onPress }: { course: Course; onPress: () => void }) {
  const progress = useSharedValue(0)
  const animatedProgress = useAnimatedStyle(() => ({ width: `${progress.value}%` }))

  useEffect(() => {
    progress.value = withTiming(course.progress, { duration: 700 })
  }, [course.progress, progress])

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`Abrir trilha ${course.name}`}
    >
      <View style={[styles.icon, { backgroundColor: `${course.accent}1F` }]}>
        <Ionicons name="code-slash" size={21} color={course.accent} />
      </View>
      <View style={styles.body}>
        <View style={styles.titleLine}>
          <Text style={styles.title}>{course.name}</Text>
          <Text style={styles.percent}>{course.progress}%</Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {course.description}
        </Text>
        <View style={styles.track}>
          <Animated.View
            style={[styles.fill, animatedProgress, { backgroundColor: course.accent }]}
          />
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.muted} />
    </Pressable>
  )
}
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    marginBottom: spacing.md,
  },
  pressed: { opacity: 0.78 },
  icon: {
    width: 46,
    height: 46,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1, gap: 7 },
  titleLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: colors.text, fontWeight: '700', fontSize: 15 },
  percent: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  description: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  track: { height: 5, borderRadius: 9, overflow: 'hidden', backgroundColor: colors.border },
  fill: { height: '100%', borderRadius: 9 },
})
