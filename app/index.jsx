import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Header from '../components/Header';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header title="Aprenda Programação" />
      <View style={styles.content}>
        <Image
          source={require('../assets/images/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Java, Python e C++ de forma divertida!</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Começar Agora</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Sobre o App</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  content: { alignItems: 'center', padding: 20 },
  logo: { width: 150, height: 150, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 30 },
  button: { backgroundColor: '#58cc02', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30, alignItems: 'center', marginBottom: 15 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  secondaryButton: { paddingVertical: 10 },
  secondaryButtonText: { color: '#58cc02', fontSize: 16, fontWeight: 'bold' },
});
