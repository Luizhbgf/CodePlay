import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.leftPanel}>
        <View style={styles.mascotContainer}>
          <Image 
            source={require('../assets/images/mascot.png')} 
            style={styles.mascot} 
          />
        </View>
        <Text style={styles.leftTitle}>CodePlay</Text>
      </View>
      
      <View style={styles.rightPanel}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>CodePlay</Text>
          
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Seu e-mail"
            keyboardType="email-address"
          />
          
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
            placeholder="Sua senha"
            secureTextEntry
          />
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          
          <Text style={styles.orText}>Ou continua com</Text>
          
          <TouchableOpacity style={styles.googleButton}>
            <Image 
              source={require('../assets/images/google-icon.png')} 
              style={styles.googleIcon} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.registerText}>Cadastrar-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftPanel: {
    flex: 1,
    backgroundColor: '#00A5F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mascotContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#4CD964',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  mascot: {
    width: 50,
    height: 50,
  },
  leftTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  rightPanel: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    maxWidth: 300,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00A5F7',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CD964',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 15,
  },
  googleButton: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  registerText: {
    color: '#00A5F7',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});