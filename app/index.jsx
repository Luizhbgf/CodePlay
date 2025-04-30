import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function IndexScreen() {
  const router = useRouter();

  const navigateToQuiz = () => {
    router.push('/QuizBox'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CodePlay</Text>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Pressable style={styles.button} onPress={navigateToQuiz}>
        <Text style={styles.buttonText}>Jogar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  ccontainer: {
    flex: 1,
    backgroundColor: '#222831',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#00ADB5',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#EEEEEE',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
