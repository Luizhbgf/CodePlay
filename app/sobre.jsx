import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';

export default function SobreScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header title="Sobre o App" />
      <View style={styles.content}>
        <Text style={styles.text}>
          Este aplicativo foi desenvolvido para ensinar linguagens de programação
          como Java, Python e C++ de forma leve, divertida e interativa.
        </Text>
        <Text style={styles.text}>
          Explore cursos, trilhas de aprendizado, quizzes e desafios diários para turbinar seu conhecimento!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  content: { padding: 24, alignItems: 'center' },
  text: { fontSize: 18, lineHeight: 28, color: '#333', textAlign: 'center', marginBottom: 20 },
});
