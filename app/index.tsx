import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import BottomNav from '../components/BottomNav'
import CourseTile from '../components/CourseTile'
import PageHeader from '../components/PageHeader'
import QuizCard from '../components/QuizCard'
import { courses, dailyQuestions, learner } from '../src/domain/courses'
import { awardXp, getLevelProgress } from '../src/domain/gamification'
import { colors, radii, spacing } from '../src/theme/tokens'

export default function HomeScreen() {
  const router = useRouter()
  const [xp, setXp] = useState(learner.xp)
  const [earned, setEarned] = useState(false)
  const progress = getLevelProgress(xp, learner.level)
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <PageHeader title="Olá, Alex" subtitle="Um passo de cada vez. Você está evoluindo." />
        <View style={styles.hero}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.eyebrow}>SUA JORNADA</Text>
              <Text style={styles.heroTitle}>Código novo,{'\n'}possibilidades novas.</Text>
            </View>
            <View style={styles.heroIcon}>
              <Ionicons name="terminal" size={25} color={colors.green} />
            </View>
          </View>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Ionicons name="flash" size={15} color={colors.green} />
              <Text style={styles.statValue}>{xp}</Text>
              <Text style={styles.statLabel}>XP total</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Ionicons name="flame" size={15} color={colors.amber} />
              <Text style={styles.statValue}>{learner.streakDays} dias</Text>
              <Text style={styles.statLabel}>sequência</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Ionicons name="heart" size={15} color={colors.red} />
              <Text style={styles.statValue}>{learner.hearts}</Text>
              <Text style={styles.statLabel}>vidas</Text>
            </View>
          </View>
          <View style={styles.levelRow}>
            <Text style={styles.levelLabel}>NÍVEL {learner.level}</Text>
            <Text style={styles.levelLabel}>{progress}%</Text>
          </View>
          <View style={styles.levelTrack}>
            <View style={[styles.levelFill, { width: `${progress}%` }]} />
          </View>
        </View>
        <View style={styles.sectionHead}>
          <View>
            <Text style={styles.sectionTitle}>Continue aprendendo</Text>
            <Text style={styles.sectionSubtitle}>Retome de onde você parou</Text>
          </View>
          <Pressable onPress={() => router.push('/curso')} accessibilityRole="button">
            <Text style={styles.link}>Ver trilhas</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => router.push('/curso')}
          style={styles.continueCard}
          accessibilityRole="button"
          accessibilityLabel="Continuar trilha de TypeScript"
        >
          <View style={styles.continueIcon}>
            <Ionicons name="code-slash" size={22} color={colors.blue} />
          </View>
          <View style={styles.continueBody}>
            <Text style={styles.continueEyebrow}>TYPESCRIPT · LIÇÃO 2</Text>
            <Text style={styles.continueTitle}>Objetos e interfaces</Text>
            <Text style={styles.continueMeta}>12 min · +45 XP</Text>
          </View>
          <View style={styles.play}>
            <Ionicons name="play" size={14} color={colors.background} />
          </View>
        </Pressable>
        <View style={styles.sectionHead}>
          <View>
            <Text style={styles.sectionTitle}>Suas trilhas</Text>
            <Text style={styles.sectionSubtitle}>Quatro linguagens, um novo começo</Text>
          </View>
        </View>
        {courses.map((course) => (
          <CourseTile key={course.id} course={course} onPress={() => router.push('/curso')} />
        ))}
        <View style={styles.sectionHead}>
          <View>
            <Text style={styles.sectionTitle}>Desafio do dia</Text>
            <Text style={styles.sectionSubtitle}>Uma pergunta rápida, XP para você</Text>
          </View>
        </View>
        <QuizCard
          question={dailyQuestions[0]}
          onCorrect={() => {
            if (!earned) {
              setXp((value) => awardXp(value, 15))
              setEarned(true)
            }
          }}
        />
        {earned && (
          <Text style={styles.earned} accessibilityLiveRegion="polite">
            Resposta certa — 15 XP adicionados à sua jornada.
          </Text>
        )}
        <Text style={styles.footer}>CODEPLAY · APRENDA FAZENDO</Text>
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
  hero: {
    padding: spacing.xl,
    backgroundColor: colors.surfaceRaised,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.lg,
    marginBottom: spacing.section,
  },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between' },
  eyebrow: {
    color: colors.green,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: spacing.sm,
  },
  heroTitle: {
    fontSize: 23,
    lineHeight: 30,
    color: colors.text,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#27351D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  stat: { flex: 1, alignItems: 'center', gap: 3 },
  statValue: { color: colors.text, fontSize: 13, fontWeight: '700' },
  statLabel: { color: colors.muted, fontSize: 10 },
  statDivider: { width: 1, height: 27, backgroundColor: colors.border },
  levelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7 },
  levelLabel: { color: colors.muted, fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  levelTrack: { height: 6, borderRadius: 5, backgroundColor: colors.border, overflow: 'hidden' },
  levelFill: { height: '100%', borderRadius: 5, backgroundColor: colors.green },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.xl,
  },
  sectionTitle: { color: colors.text, fontSize: 17, fontWeight: '800' },
  sectionSubtitle: { color: colors.muted, fontSize: 11, marginTop: 4 },
  link: { color: colors.green, fontSize: 12, fontWeight: '700' },
  continueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.lg,
  },
  continueIcon: {
    width: 46,
    height: 46,
    borderRadius: radii.sm,
    backgroundColor: '#1C2A3B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBody: { flex: 1, gap: 4 },
  continueEyebrow: { color: colors.blue, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  continueTitle: { color: colors.text, fontSize: 14, fontWeight: '700' },
  continueMeta: { color: colors.muted, fontSize: 11 },
  play: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  earned: { color: colors.green, marginTop: spacing.md, fontSize: 12 },
  footer: {
    textAlign: 'center',
    marginTop: spacing.section,
    marginBottom: spacing.lg,
    color: '#536176',
    fontSize: 9,
    letterSpacing: 1.6,
    fontWeight: '700',
  },
})
