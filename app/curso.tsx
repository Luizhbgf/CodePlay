import { useMemo, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import BottomNav from '../components/BottomNav'
import PageHeader from '../components/PageHeader'
import { courses } from '../src/domain/courses'
import type { LanguageId } from '../src/domain/types'
import { colors, radii, spacing } from '../src/theme/tokens'

const filters: { label: string; value: LanguageId | 'all' }[] = [
  { label: 'Todas', value: 'all' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'C++', value: 'cpp' },
]
export default function CourseScreen() {
  const router = useRouter()
  const [filter, setFilter] = useState<LanguageId | 'all'>('all')
  const visible = useMemo(
    () => (filter === 'all' ? courses : courses.filter((course) => course.id === filter)),
    [filter],
  )
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <PageHeader title="Trilhas de código" subtitle="Aprenda no seu ritmo, pratique todo dia." />
        <View style={styles.banner}>
          <View style={styles.bannerIcon}>
            <Ionicons name="map" size={21} color={colors.green} />
          </View>
          <View style={styles.bannerCopy}>
            <Text style={styles.bannerTitle}>Seu próximo projeto começa aqui</Text>
            <Text style={styles.bannerText}>Escolha uma trilha e avance lição por lição.</Text>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
          accessibilityLabel="Filtrar trilhas por linguagem"
        >
          {filters.map((item) => (
            <Pressable
              key={item.value}
              onPress={() => setFilter(item.value)}
              accessibilityRole="button"
              accessibilityState={{ selected: filter === item.value }}
              style={[styles.filter, filter === item.value && styles.filterActive]}
            >
              <Text style={[styles.filterText, filter === item.value && styles.filterTextActive]}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        {visible.map((course) => (
          <View key={course.id} style={styles.course}>
            <View style={styles.courseHeader}>
              <View style={[styles.languageMark, { backgroundColor: `${course.accent}20` }]}>
                <Ionicons name="code-slash" size={19} color={course.accent} />
              </View>
              <View style={styles.courseCopy}>
                <Text style={styles.courseTitle}>{course.name}</Text>
                <Text style={styles.courseDescription}>{course.description}</Text>
              </View>
              <Text style={styles.progress}>{course.progress}%</Text>
            </View>
            <View style={styles.track}>
              <View
                style={[
                  styles.fill,
                  { width: `${course.progress}%`, backgroundColor: course.accent },
                ]}
              />
            </View>
            <View style={styles.lessons}>
              {course.lessons.map((lesson, index) => (
                <View key={lesson.id} style={styles.lesson}>
                  <View
                    style={[
                      styles.lessonNode,
                      lesson.status === 'completed' && styles.nodeDone,
                      lesson.status === 'available' && styles.nodeActive,
                    ]}
                  >
                    {lesson.status === 'completed' ? (
                      <Ionicons name="checkmark" size={13} color={colors.background} />
                    ) : lesson.status === 'locked' ? (
                      <Ionicons name="lock-closed" size={11} color={colors.muted} />
                    ) : (
                      <Text style={styles.nodeNumber}>{index + 1}</Text>
                    )}
                  </View>
                  <View style={styles.lessonCopy}>
                    <Text style={[styles.lessonTitle, lesson.status === 'locked' && styles.locked]}>
                      {lesson.title}
                    </Text>
                    <Text style={styles.lessonMeta}>
                      {lesson.durationMinutes} min · +{lesson.xp} XP
                    </Text>
                  </View>
                  {lesson.status === 'available' && (
                    <Pressable
                      onPress={() =>
                        router.push({ pathname: '/lesson/[id]', params: { id: lesson.id } })
                      }
                      style={styles.startButton}
                      accessibilityRole="button"
                      accessibilityLabel={`Iniciar ${lesson.title}`}
                    >
                      <Text style={styles.startText}>Iniciar</Text>
                      <Ionicons name="arrow-forward" size={13} color={colors.background} />
                    </Pressable>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}
        <Text style={styles.footer}>NOVAS LIÇÕES ADICIONADAS TODA SEMANA</Text>
      </ScrollView>
      <BottomNav />
    </View>
  )
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radii.md,
    backgroundColor: '#17231C',
    borderWidth: 1,
    borderColor: '#344632',
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  bannerIcon: {
    height: 42,
    width: 42,
    borderRadius: 13,
    backgroundColor: '#24341F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerCopy: { flex: 1, gap: 4 },
  bannerTitle: { color: colors.text, fontSize: 13, fontWeight: '700' },
  bannerText: { color: colors.muted, fontSize: 11 },
  filters: { gap: spacing.sm, paddingBottom: spacing.lg },
  filter: {
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: 9,
    backgroundColor: colors.surface,
  },
  filterActive: { backgroundColor: colors.green, borderColor: colors.green },
  filterText: { color: colors.muted, fontSize: 11, fontWeight: '700' },
  filterTextActive: { color: colors.background },
  course: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  courseHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  languageMark: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseCopy: { flex: 1, gap: 4 },
  courseTitle: { color: colors.text, fontWeight: '800', fontSize: 15 },
  courseDescription: { color: colors.muted, fontSize: 11 },
  progress: { color: colors.muted, fontSize: 11, fontWeight: '700' },
  track: {
    height: 5,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginTop: spacing.lg,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: 4 },
  lessons: {
    marginTop: spacing.lg,
    borderLeftWidth: 1,
    borderColor: colors.border,
    marginLeft: 11,
    paddingLeft: spacing.lg,
    gap: spacing.lg,
  },
  lesson: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 40,
    marginLeft: -25,
  },
  lessonNode: {
    width: 23,
    height: 23,
    borderRadius: 12,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeDone: { backgroundColor: colors.green, borderColor: colors.green },
  nodeActive: { borderColor: colors.green },
  nodeNumber: { color: colors.green, fontSize: 10, fontWeight: '800' },
  lessonCopy: { flex: 1, gap: 4 },
  lessonTitle: { color: colors.text, fontSize: 12, fontWeight: '700' },
  locked: { color: colors.muted },
  lessonMeta: { color: colors.muted, fontSize: 10 },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: colors.green,
  },
  startText: { color: colors.background, fontSize: 10, fontWeight: '800' },
  footer: {
    textAlign: 'center',
    color: colors.muted,
    fontSize: 9,
    letterSpacing: 1.1,
    marginTop: spacing.xl,
  },
})
