import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CourseIntroScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <View style={styles.mascotContainer}>
          <Image 
            source={require('../assets/images/mascot.png')} 
            style={styles.mascot} 
          />
        </View>
        
        <Text style={styles.title}>INTRODUÇÃO AO PYTHON</Text>
        
        <Text style={styles.subtitle}>
          Vamos Aprender o Básico de Python e Suas Estruturas
        </Text>
        
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => navigation.navigate('Lesson')}
        >
          <Text style={styles.startButtonText}>COMEÇAR</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="chatbubble" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="flag" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00A5F7',
  },
  backButton: {
    padding: 15,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  mascotContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#4CD964',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  mascot: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 60,
  },
  startButton: {
    backgroundColor: '#4CD964',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
});