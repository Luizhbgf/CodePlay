import { Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import { colors, spacing } from '../src/theme/tokens'

export default function PageHeader({
  title,
  subtitle,
  back = false,
}: {
  title: string
  subtitle?: string
  back?: boolean
}) {
  const router = useRouter()
  return (
    <View style={styles.row}>
      {back && (
        <Pressable
          onPress={() => router.back()}
          style={styles.back}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={20} color={colors.text} />
        </Pressable>
      )}
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {!back && (
        <View style={styles.badge}>
          <Ionicons name="flash" size={15} color={colors.green} />
          <Text style={styles.badgeText}>7</Text>
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: { flex: 1, gap: 4 },
  title: { color: colors.text, fontWeight: '800', fontSize: 23, letterSpacing: -0.5 },
  subtitle: { color: colors.muted, fontSize: 13 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surfaceRaised,
  },
  badgeText: { color: colors.text, fontSize: 12, fontWeight: '700' },
})
