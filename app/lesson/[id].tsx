import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { useLocalSearchParams } from 'expo-router'
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import PageHeader from '../../components/PageHeader'
import QuizCard from '../../components/QuizCard'
import CodeSnippet from '../../src/features/lessons/CodeSnippet'
import { courses, dailyQuestions } from '../../src/domain/courses'
import { colors, radii, spacing } from '../../src/theme/tokens'

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const lesson = courses.flatMap((course) => course.lessons).find((item) => item.id === id)
  const [completed, setCompleted] = useState(false)
  if (!lesson)
    return (
      <View style={styles.screen}>
        <View style={styles.content}>
          <PageHeader
            title="Lição não encontrada"
            subtitle="Essa lição não está disponível."
            back
          />
        </View>
      </View>
    )
  const code =
    lesson.language === 'python'
      ? 'def saudacao(nome):\n    return "Olá, " + nome\n\nprint(saudacao("Alex"))'
      : lesson.language === 'java'
        ? 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Olá, mundo");\n    }\n}'
        : lesson.language === 'cpp'
          ? '#include <iostream>\nint main() {\n    std::cout << "Olá, mundo";\n    return 0;\n}'
          : 'const learner = {\n  name: "Alex",\n  level: 4,\n}\n\nfunction greet(name: string) {\n  return `Olá, ${name}`\n}'
  const languageLabel =
    lesson.language === 'cpp' ? 'C++' : lesson.language[0].toUpperCase() + lesson.language.slice(1)
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <PageHeader
          title={lesson.title}
          subtitle={`${languageLabel}  ·  ${lesson.durationMinutes} min`}
          back
        />
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>LIÇÃO 1 DE 5</Text>
          <Text style={styles.progressLabel}>20%</Text>
        </View>
        <View style={styles.track}>
          <View style={styles.fill} />
        </View>
        <View style={styles.lessonHeading}>
          <Text style={styles.kicker}>FUNDAMENTOS</Text>
          <Text style={styles.heading}>Construa com tipos,{'\n'}progrida com confiança.</Text>
          <Text style={styles.body}>
            {lesson.description} Nesta lição, veja como declarar valores e deixar seu código mais
            claro.
          </Text>
        </View>
        <CodeSnippet code={code} language={languageLabel} />
        <View style={styles.tip}>
          <Ionicons name="bulb-outline" size={18} color={colors.amber} />
          <Text style={styles.tipText}>
            Dica: tipos explícitos ajudam você e sua equipe a entenderem os dados esperados.
          </Text>
        </View>
        <Text style={styles.sectionTitle}>Confira o que aprendeu</Text>
        <QuizCard question={dailyQuestions[0]} />
        <Pressable
          disabled={completed}
          style={[styles.completeButton, completed && styles.completeDone]}
          onPress={async () => {
            setCompleted(true)
            if (Platform.OS !== 'web') {
              await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            }
          }}
          accessibilityRole="button"
          accessibilityState={{ disabled: completed }}
        >
          <Text style={styles.completeText}>
            {completed ? 'Lição concluída · +45 XP' : 'Concluir lição · +45 XP'}
          </Text>
          <Ionicons
            name={completed ? 'checkmark-circle' : 'arrow-forward'}
            size={17}
            color={colors.background}
          />
        </Pressable>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.section,
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
  },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7 },
  progressLabel: { color: colors.muted, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  track: { height: 5, borderRadius: 4, backgroundColor: colors.border, overflow: 'hidden' },
  fill: { width: '20%', height: '100%', backgroundColor: colors.green },
  lessonHeading: { marginTop: spacing.xl, marginBottom: spacing.lg, gap: spacing.md },
  kicker: { color: colors.green, fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  heading: {
    color: colors.text,
    fontSize: 25,
    lineHeight: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  body: { color: colors.muted, fontSize: 13, lineHeight: 21 },
  tip: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: '#2A2518',
    borderColor: '#544528',
    borderWidth: 1,
  },
  tipText: { color: '#D3C7A1', flex: 1, fontSize: 12, lineHeight: 19 },
  sectionTitle: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 17,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.green,
    borderRadius: radii.sm,
    minHeight: 50,
    marginTop: spacing.xl,
  },
  completeDone: { backgroundColor: '#82B82F' },
  completeText: { color: colors.background, fontWeight: '800', fontSize: 13 },
})
