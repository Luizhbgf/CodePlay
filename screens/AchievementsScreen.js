import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from '../context/ThemeContext';
import { AppContext } from '../context/AppContext';


export default function AchievementsScreen() {
  const { theme } = useContext(ThemeContext);
  const { userPoints, completedLessons, streakDays } = useContext(AppContext);
  
  // Lista de conquistas
  const achievements = [
    {
      id: 'streak3',
      title: 'Sequência de 3 dias',
      description: 'Mantenha uma sequência de estudo por 3 dias',
      icon: 'flame',
      color: '#FF9500',
      unlocked: streakDays >= 3,
      progress: Math.min(streakDays / 3, 1),
    },
    {
      id: 'streak7',
      title: 'Sequência de 7 dias',
      description: 'Mantenha uma sequência de estudo por 7 dias',
      icon: 'flame',
      color: '#FF3B30',
      unlocked: streakDays >= 7,
      progress: Math.min(streakDays / 7, 1),
    },
    {
      id: 'points100',
      title: 'Centenário',
      description: 'Acumule 100 pontos de experiência',
      icon: 'star',
      color: '#FFCC00',
      unlocked: userPoints >= 100,
      progress: Math.min(userPoints / 100, 1),
    },
    {
      id: 'points500',
      title: 'Mestre Iniciante',
      description: 'Acumule 500 pontos de experiência',
      icon: 'star',
      color: '#4CD964',
      unlocked: userPoints >= 500,
      progress: Math.min(userPoints / 500, 1),
    },
    {
      id: 'lessons5',
      title: 'Estudante Dedicado',
      description: 'Complete 5 lições',
      icon: 'book',
      color: '#5856D6',
      unlocked: completedLessons.length >= 5,
      progress: Math.min(completedLessons.length / 5, 1),
    },
    {
      id: 'lessons10',
      title: 'Aprendiz de Programação',
      description: 'Complete 10 lições',
      icon: 'code-slash',
      color: '#007AFF',
      unlocked: completedLessons.length >= 10,
      progress: Math.min(completedLessons.length / 10, 1),
    },
  ];
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <LinearGradient
        colors={[theme.primary, theme.primary + '80']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Conquistas</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{achievements.filter(a => a.unlocked).length}</Text>
            <Text style={styles.statLabel}>Desbloqueadas</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{achievements.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)}%</Text>
            <Text style={styles.statLabel}>Completo</Text>
          </View>
        </View>
      </LinearGradient>
      
      <ScrollView style={styles.scrollView}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Suas Conquistas</Text>
        
        {achievements.map((achievement) => (
          <View 
            key={achievement.id} 
            style={[
              styles.achievementCard, 
              { 
                backgroundColor: theme.card,
                borderColor: theme.border,
                opacity: achievement.unlocked ? 1 : 0.7
              }
            ]}
          >
            <View style={[styles.achievementIcon, { backgroundColor: achievement.color }]}>
              <Ionicons name={achievement.icon} size={24} color="white" />
            </View>
            
            <View style={styles.achievementInfo}>
              <Text style={[styles.achievementTitle, { color: theme.text }]}>
                {achievement.title}
                {achievement.unlocked && (
                  <Ionicons name="checkmark-circle" size={16} color={theme.success} style={{ marginLeft: 5 }} />
                )}
              </Text>
              <Text style={[styles.achievementDescription, { color: theme.placeholder }]}>
                {achievement.description}
              </Text>
              
              <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
                <View 
                  style={[
                    styles.progressFilled, 
                    { 
                      backgroundColor: achievement.color,
                      width: `${achievement.progress * 100}%` 
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.progressText, { color: theme.placeholder }]}>
                {Math.round(achievement.progress * 100)}%
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  achievementCard: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  achievementDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 5,
  },
  progressFilled: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    textAlign: 'right',
  },
});