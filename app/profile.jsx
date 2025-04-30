import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Switch, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const [badgesEnabled, setBadgesEnabled] = React.useState(true);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>
      
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarLetter}>A</Text>
        </View>
        <Text style={styles.userName}>Fulano</Text>
        <Text style={styles.userLevel}>Nível 2  130 XP</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Badges</Text>
            <Switch
              value={badgesEnabled}
              onValueChange={setBadgesEnabled}
              trackColor={{ false: '#D1D1D6', true: '#4CD964' }}
              thumbColor={'#FFFFFF'}
            />
          </View>
          
          <View style={styles.badgesContainer}>
            <Image source={require('../assets/images/badge1.png')} style={styles.badge} />
            <Image source={require('../assets/images/badge2.png')} style={styles.badge} />
            <Image source={require('../assets/images/badge3.png')} style={styles.badge} />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progresso</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressChart}>
              <View style={styles.progressFilled} />
            </View>
            
            <View style={styles.progressStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>2 conduzidos</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>3 restantes</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="leaf" size={24} color="#4CD964" />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarLetter: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  userLevel: {
    fontSize: 16,
    color: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  badge: {
    width: 70,
    height: 70,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressChart: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 15,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-90deg' }],
    marginBottom: 20,
  },
  progressFilled: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 15,
    borderColor: '#00A5F7',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
});