import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors, radii, spacing } from '../src/theme/tokens'

export default function LoginScreen() {
  const router = useRouter()
  return (
    <View style={styles.screen}>
      <View style={styles.mark}>
        <Ionicons name="terminal" size={31} color={colors.green} />
      </View>
      <Text style={styles.brand}>codeplay</Text>
      <Text style={styles.heading}>Seu próximo capítulo{'\n'}começa com uma linha.</Text>
      <Text style={styles.description}>
        Aprenda programação com pequenas lições, projetos práticos e uma comunidade que torce por
        você.
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => router.replace('/')}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Começar a aprender</Text>
        <Ionicons name="arrow-forward" size={17} color={colors.background} />
      </Pressable>
      <Text style={styles.note}>GRÁTIS PARA COMEÇAR · APRENDA NO SEU RITMO</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mark: {
    width: 64,
    height: 64,
    borderRadius: 21,
    backgroundColor: '#27351D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    color: colors.text,
    fontSize: 13,
    letterSpacing: 3,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginTop: spacing.md,
  },
  heading: {
    color: colors.text,
    fontSize: 31,
    lineHeight: 40,
    fontWeight: '800',
    letterSpacing: -1,
    textAlign: 'center',
    marginTop: spacing.section,
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: 340,
    marginTop: spacing.md,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    backgroundColor: colors.green,
    borderRadius: radii.sm,
    width: '100%',
    maxWidth: 380,
    minHeight: 52,
    marginTop: spacing.xxl,
  },
  buttonText: { color: colors.background, fontSize: 14, fontWeight: '800' },
  note: {
    color: colors.muted,
    fontSize: 9,
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
})
