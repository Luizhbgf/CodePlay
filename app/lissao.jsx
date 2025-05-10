import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LessonScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#4CD964" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HTML</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.lessonTitle}>
          <View style={styles.codeIcon}>
            <Ionicons name="code-slash" size={30} color="white" />
          </View>
          <Text style={styles.titleText}>Introdução ao HTML</Text>
        </View>
        
        <View style={styles.roadmap}>
          <View style={styles.roadmapItem}>
            <View style={[styles.roadmapIcon, styles.activeIcon]}>
              <Ionicons name="document-text" size={24} color="white" />
            </View>
            <Text style={styles.roadmapText}>Módulo 1</Text>
            <Text style={styles.roadmapSubtext}>Introdução</Text>
          </View>
          
          <View style={styles.roadmapConnector} />
          
          <View style={styles.roadmapItem}>
            <View style={[styles.roadmapIcon, styles.completedIcon]}>
              <Ionicons name="checkmark" size={24} color="white" />
            </View>
            <Text style={styles.roadmapText}>Sintaxe</Text>
          </View>
          
          <View style={styles.roadmapConnector} />
          
          <View style={styles.roadmapItem}>
            <View style={styles.roadmapIcon}>
              <Ionicons name="trophy" size={24} color="white" />
            </View>
            <Text style={styles.roadmapText}>Quia Final</Text>
          </View>
          
          <View style={styles.roadmapConnector} />
          
          <View style={styles.roadmapItem}>
            <View style={styles.roadmapIcon}>
              <Ionicons name="help" size={24} color="white" />
            </View>
            <Text style={styles.roadmapText}>Quiz</Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.nextButton}
        onPress={() => navigation.navigate('Quiz')}
      >
        <Text style={styles.nextButtonText}>Continuar</Text>
      </TouchableOpacity>
      
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="information-circle" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="book" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="settings" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>  color="#333" />
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
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF9500',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  lessonTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  codeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CD964',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  roadmap: {
    alignItems: 'center',
  },
  roadmapItem: {
    alignItems: 'center',
    marginBottom: 10,
  },
  roadmapIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  activeIcon: {
    backgroundColor: '#4CD964',
  },
  completedIcon: {
    backgroundColor: '#4CD964',
  },
  roadmapText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  roadmapSubtext: {
    fontSize: 14,
    color: '#666',
  },
  roadmapConnector: {
    width: 2,
    height: 30,
    backgroundColor: '#CCCCCC',
    marginVertical: 5,
  },
  nextButton: {
    backgroundColor: '#4CD964',
    borderRadius: 10,
    padding: 15,
    margin: 20,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
});