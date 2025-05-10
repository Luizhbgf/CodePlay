import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gato</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.profileIcon}>
            <Ionicons name="person" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.userCard}>
          <Image 
            source={require('../assets/images/avatar.png')} 
            style={styles.avatar} 
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>João</Text>
            <Text style={styles.userLevel}>Nível 3</Text>
            <View style={styles.progressBar}>
              <View style={styles.progressFilled} />
            </View>
          </View>
          
          <View style={styles.badgesContainer}>
            <View style={[styles.badgeIcon, { backgroundColor: '#4CD964' }]}>
              <FontAwesome5 name="leaf" size={20} color="white" />
            </View>
            <View style={[styles.badgeIcon, { backgroundColor: '#007AFF' }]}>
              <Text style={styles.badgeText}>JS</Text>
            </View>
            <View style={[styles.badgeIcon, { backgroundColor: '#FFCC00' }]}>
              <Text style={styles.badgeText}>JS</Text>
            </View>
            <View style={[styles.badgeIcon, { backgroundColor: '#5856D6' }]}>
              <FontAwesome5 name="home" size={20} color="white" />
            </View>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Trilhas de Aprendizagem</Text>
        
        <TouchableOpacity 
          style={styles.courseCard}
          onPress={() => navigation.navigate('CourseIntro')}
        >
          <View style={[styles.courseIcon, { backgroundColor: '#FFCC00' }]}>
            <Text style={styles.courseIconText}>HTML</Text>
          </View>
          <Text style={styles.courseTitle}>HTML</Text>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.courseCard}>
          <View style={[styles.courseIcon, { backgroundColor: '#007AFF' }]}>
            <Text style={styles.courseIconText}>CSS</Text>
          </View>
          <Text style={styles.courseTitle}>CSS</Text>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.courseCard}>
          <View style={[styles.courseIcon, { backgroundColor: '#FFCC00' }]}>
            <Text style={styles.courseIconText}>JS</Text>
          </View>
          <Text style={styles.courseTitle}>JavaScript</Text>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.courseCard}>
          <View style={[styles.courseIcon, { backgroundColor: '#5856D6' }]}>
            <FontAwesome5 name="python" size={24} color="white" />
          </View>
          <Text style={styles.courseTitle}>Python</Text>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.courseCard}>
          <View style={[styles.courseIcon, { backgroundColor: '#4CD964' }]}>
            <Text style={styles.courseIconText}>C++</Text>
          </View>
          <Text style={styles.courseTitle}>C++</Text>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
      </ScrollView>
      
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#00A5F7" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="help-circle" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="pause" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <FontAwesome5 name="trophy" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person" size={24} color="#999" />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  userCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userLevel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    width: '100%',
  },
  progressFilled: {
    height: '100%',
    width: '60%',
    backgroundColor: '#FFCC00',
    borderRadius: 3,
  },
  badgesContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  badgeIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  courseIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  courseIconText: {
    color: 'white',
    fontWeight: 'bold',
  },
  courseTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
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