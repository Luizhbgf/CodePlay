import { Ionicons } from '@expo/vector-icons'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import BottomNav from '../components/BottomNav'
import PageHeader from '../components/PageHeader'
import { courses, learner } from '../src/domain/courses'
import { colors, radii, spacing } from '../src/theme/tokens'

const achievements = [
  {
    icon: 'flame' as const,
    title: 'Uma semana em sequência',
    detail: '7 dias aprendendo',
    color: colors.amber,
  },
  {
    icon: 'trophy' as const,
    title: 'Primeiros passos',
    detail: 'Concluiu sua primeira lição',
    color: colors.green,
  },
  {
    icon: 'code-slash' as const,
    title: 'Explorador de código',
    detail: 'Começou 3 trilhas diferentes',
    color: colors.blue,
  },
]
export default function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <PageHeader title="Seu perfil" subtitle="Cada linha de código conta." />
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{learner.name.slice(0, 1)}</Text>
          </View>
          <Text style={styles.name}>{learner.name}</Text>
          <Text style={styles.caption}>Aprendiz de código desde 2025</Text>
          <View style={styles.divider} />
          <View style={styles.summary}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{learner.level}</Text>
              <Text style={styles.summaryLabel}>NÍVEL</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{learner.xp}</Text>
              <Text style={styles.summaryLabel}>XP TOTAL</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{learner.streakDays}</Text>
              <Text style={styles.summaryLabel}>DIAS SEGUIDOS</Text>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Conquistas</Text>
        <Text style={styles.sectionSub}>Marcos da sua jornada de aprendizado</Text>
        {achievements.map((item) => (
          <View key={item.title} style={styles.achievement}>
            <View style={[styles.achievementIcon, { backgroundColor: `${item.color}20` }]}>
              <Ionicons name={item.icon} size={19} color={item.color} />
            </View>
            <View style={styles.achievementCopy}>
              <Text style={styles.achievementTitle}>{item.title}</Text>
              <Text style={styles.achievementDetail}>{item.detail}</Text>
            </View>
            <Ionicons name="checkmark-circle" size={19} color={item.color} />
          </View>
        ))}
        <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>Seu progresso</Text>
        <Text style={styles.sectionSub}>Continue explorando novas linguagens</Text>
        {courses.map((course) => (
          <View key={course.id} style={styles.progressCard}>
            <View style={styles.progressTop}>
              <Text style={styles.progressName}>{course.name}</Text>
              <Text style={styles.progressPercent}>{course.progress}%</Text>
            </View>
            <View style={styles.track}>
              <View
                style={[
                  styles.fill,
                  { width: `${course.progress}%`, backgroundColor: course.accent },
                ]}
              />
            </View>
          </View>
        ))}
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
  profileCard: {
    alignItems: 'center',
    padding: spacing.xl,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 25,
    backgroundColor: '#27351D',
    borderWidth: 1,
    borderColor: '#536A38',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: { color: colors.green, fontSize: 30, fontWeight: '800' },
  name: { color: colors.text, fontSize: 20, fontWeight: '800' },
  caption: { color: colors.muted, fontSize: 12, marginTop: 5 },
  divider: { height: 1, backgroundColor: colors.border, width: '100%', marginVertical: spacing.xl },
  summary: { flexDirection: 'row', width: '100%' },
  summaryItem: { flex: 1, alignItems: 'center', gap: 5 },
  summaryValue: { color: colors.text, fontSize: 17, fontWeight: '800' },
  summaryLabel: { color: colors.muted, fontSize: 8, fontWeight: '700', letterSpacing: 0.8 },
  sectionTitle: { color: colors.text, fontSize: 17, fontWeight: '800', marginTop: spacing.xl },
  sectionSub: { color: colors.muted, fontSize: 11, marginTop: 4, marginBottom: spacing.md },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementCopy: { flex: 1, gap: 4 },
  achievementTitle: { color: colors.text, fontSize: 12, fontWeight: '700' },
  achievementDetail: { color: colors.muted, fontSize: 10 },
  progressCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  progressName: { color: colors.text, fontSize: 12, fontWeight: '700' },
  progressPercent: { color: colors.muted, fontSize: 11 },
  track: { height: 5, backgroundColor: colors.border, borderRadius: 4, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4 },
})
