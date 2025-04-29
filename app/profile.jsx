import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import UserProfileCard from '../components/UserProfileCard';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header title="Perfil" />
      <View style={styles.section}>
        <UserProfileCard name="Fulano" level={2} xp={130} />

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Progresso</Text>
          <Text style={styles.infoText}>2 cursos concluídos</Text>
          <Text style={styles.infoText}>3 cursos restantes</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Linguagens Estudadas</Text>
          <Text style={styles.language}>HTML</Text>
          <Text style={styles.language}>CSS</Text>
          <Text style={styles.language}>JavaScript</Text>
          <Text style={styles.language}>Python</Text>
          <Text style={styles.language}>C++</Text>
        </View>

        <View style={styles.challengeCard}>
          <Text style={styles.challengeTitle}>Desafio Diário</Text>
          <Text style={styles.challengeText}>Resolva 1 desafio e ganhe +10XP!</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>COMEÇAR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  section: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#58cc02', marginBottom: 10 },
  infoCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, marginBottom: 20, elevation: 3 },
  infoText: { fontSize: 16, marginBottom: 5, color: '#555' },
  language: { fontSize: 16, marginBottom: 5, color: '#333' },
  challengeCard: { backgroundColor: '#eaffea', borderRadius: 20, padding: 20, marginBottom: 30 },
  challengeTitle: { fontSize: 18, fontWeight: 'bold', color: '#58cc02', marginBottom: 5 },
  challengeText: { fontSize: 16, color: '#555' },
  startButton: { backgroundColor: '#58cc02', padding: 15, borderRadius: 30, alignItems: 'center', margin: 20 },
  startButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});
