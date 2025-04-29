import { View, TextInput, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';
import Header from '../components/Header';
import UserProfileCard from '../components/UserProfileCard';
import QuizBox from '../components/QuizBox';

export default function LoginScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header title="CodePlay" />
      <View style={styles.formContainer}>
        <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
        <TouchableOpacity style={styles.mainButton}>
          <Text style={styles.mainButtonText}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>Ou cadastre-se</Text>
      </View>

      <UserProfileCard name="João" level={3} xp={150} />
      <QuizBox
        question="Qual tag cria um parágrafo em HTML?"
        options={['<body>', '<div>', '<p>']}
        onNext={() => console.log('Avançar')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  formContainer: { padding: 20 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 15, marginBottom: 15, backgroundColor: '#fff' },
  mainButton: { backgroundColor: '#58cc02', padding: 15, borderRadius: 20, alignItems: 'center', marginBottom: 15 },
  mainButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  registerText: { textAlign: 'center', color: '#58cc02', marginBottom: 20 },
});
