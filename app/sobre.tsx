import { ScrollView, StyleSheet, Text, View } from 'react-native'
import PageHeader from '../components/PageHeader'
import { colors, radii, spacing } from '../src/theme/tokens'

export default function AboutScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <PageHeader
        title="Sobre o CodePlay"
        subtitle="Aprender programação, um passo por vez."
        back
      />
      <View style={styles.card}>
        <Text style={styles.heading}>Feito para quem está começando.</Text>
        <Text style={styles.text}>
          CodePlay transforma conceitos de programação em lições práticas e curtas. Explore
          TypeScript, Python, Java e C++, acompanhe seu progresso e pratique com desafios
          interativos.
        </Text>
        <Text style={styles.text}>
          A ideia é simples: consistência vence a pressa. Um pouco de código todos os dias já é um
          ótimo começo.
        </Text>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, maxWidth: 720, width: '100%', alignSelf: 'center' },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  heading: { color: colors.text, fontSize: 20, fontWeight: '800', lineHeight: 28 },
  text: { color: colors.muted, fontSize: 14, lineHeight: 23 },
})
