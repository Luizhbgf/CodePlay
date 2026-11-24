import { StyleSheet, Text, View } from 'react-native'
import { colors, radii, spacing } from '../../theme/tokens'

type Token = { text: string; color: string }
const keywordSet = new Set([
  'const',
  'let',
  'function',
  'return',
  'if',
  'else',
  'def',
  'class',
  'public',
  'static',
  'void',
  'int',
  'String',
  'new',
])
function tokenize(line: string): Token[] {
  const pieces = line
    .split(
      /(\b(?:const|let|function|return|if|else|def|class|public|static|void|int|String|new)\b|"[^"]*"|'[^']*'|\b\d+\b|\/\/.*|#.*)/g,
    )
    .filter(Boolean)
  return pieces.map((text) => ({
    text,
    color:
      text.startsWith('//') || text.startsWith('#')
        ? '#718096'
        : text.startsWith('"') || text.startsWith("'")
          ? '#A3E635'
          : /^\d+$/.test(text)
            ? '#FBBF24'
            : keywordSet.has(text)
              ? '#A78BFA'
              : '#D5DEEA',
  }))
}

export default function CodeSnippet({ code, language }: { code: string; language: string }) {
  const lines = code.split('\n')
  return (
    <View style={styles.window} accessibilityLabel={`Exemplo de código em ${language}`}>
      <View style={styles.toolbar}>
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: '#FB7185' }]} />
          <View style={[styles.dot, { backgroundColor: '#FBBF24' }]} />
          <View style={[styles.dot, { backgroundColor: '#A3E635' }]} />
        </View>
        <Text style={styles.language}>{language}</Text>
        <Text style={styles.copy}>EXEMPLO</Text>
      </View>
      {lines.map((line, index) => (
        <View key={`${index}-${line}`} style={styles.line}>
          <Text style={styles.lineNumber}>{String(index + 1).padStart(2, '0')}</Text>
          <Text style={styles.code}>
            {tokenize(line).map((token, tokenIndex) => (
              <Text key={`${tokenIndex}-${token.text}`} style={{ color: token.color }}>
                {token.text}
              </Text>
            ))}
          </Text>
        </View>
      ))}
    </View>
  )
}
const styles = StyleSheet.create({
  window: {
    backgroundColor: '#090D14',
    borderRadius: radii.md,
    borderColor: colors.border,
    borderWidth: 1,
    paddingBottom: spacing.md,
    overflow: 'hidden',
  },
  toolbar: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  dots: { flexDirection: 'row', gap: 5 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  language: { color: colors.muted, fontSize: 10, marginLeft: 5 },
  copy: { color: '#66758A', fontSize: 8, letterSpacing: 1, marginLeft: 'auto' },
  line: { flexDirection: 'row', paddingHorizontal: spacing.md, paddingTop: 9, minHeight: 30 },
  lineNumber: { width: 29, color: '#536176', fontFamily: 'monospace', fontSize: 11 },
  code: { color: '#D5DEEA', fontFamily: 'monospace', fontSize: 12 },
})
