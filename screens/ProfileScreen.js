import React, { useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import BottomTabBar from "../components/BottomTabBar"

export default function ProfileScreen({ navigation }) {
  const [streakDays, setStreakDays] = useState(5)
  const [totalXP, setTotalXP] = useState(430)
  const [level, setLevel] = useState(4)

  // Dados das conquistas
  const achievements = [
    {
      id: "streak3",
      title: "Sequência de 3 dias",
      description: "Mantenha uma sequência de estudo por 3 dias",
      icon: "flame",
      color: "#FF9500",
      unlocked: true,
    },
    {
      id: "streak7",
      title: "Sequência de 7 dias",
      description: "Mantenha uma sequência de estudo por 7 dias",
      icon: "flame",
      color: "#FF3B30",
      unlocked: false,
      progress: 0.7,
    },
    {
      id: "points100",
      title: "Centenário",
      description: "Acumule 100 pontos de experiência",
      icon: "star",
      color: "#FFCC00",
      unlocked: true,
    },
    {
      id: "lessons5",
      title: "Estudante Dedicado",
      description: "Complete 5 lições",
      icon: "book",
      color: "#5856D6",
      unlocked: false,
      progress: 0.6,
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarLetter}>J</Text>
          </View>
          <Text style={styles.userName}>João</Text>
          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>Nível {level}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="flame" size={24} color="#FF9500" />
              <Text style={styles.statValue}>{streakDays}</Text>
              <Text style={styles.statLabel}>Dias</Text>
            </View>

            <View style={styles.statItem}>
              <Ionicons name="star" size={24} color="#FFCC00" />
              <Text style={styles.statValue}>{totalXP}</Text>
              <Text style={styles.statLabel}>XP Total</Text>
            </View>

            <View style={styles.statItem}>
              <Ionicons name="trophy" size={24} color="#58CC02" />
              <Text style={styles.statValue}>{achievements.filter((a) => a.unlocked).length}</Text>
              <Text style={styles.statLabel}>Conquistas</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conquistas</Text>

          {achievements.map((achievement) => (
            <View
              key={achievement.id}
              style={[
                styles.achievementCard,
                {
                  opacity: achievement.unlocked ? 1 : 0.7,
                },
              ]}
            >
              <View style={[styles.achievementIcon, { backgroundColor: achievement.color }]}>
                <Ionicons name={achievement.icon} size={24} color="white" />
              </View>

              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>
                  {achievement.title}
                  {achievement.unlocked && <Ionicons name="checkmark-circle" size={16} color="#58CC02" style={{ marginLeft: 5 }} />}
                </Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>

                {!achievement.unlocked && achievement.progress && (
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFilled, { width: `${achievement.progress * 100}%` }]} />
                  </View>
                )}
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>Ver todas as conquistas</Text>
            <Ionicons name="chevron-forward" size={20} color="#58CC02" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estatísticas</Text>

          <View style={styles.statsCard}>
            <View style={styles.statRow}>
              <Text style={styles.statTitle}>Dias de sequência atual</Text>
              <Text style={styles.statNumber}>{streakDays}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statTitle}>Maior sequência</Text>
              <Text style={styles.statNumber}>7</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statTitle}>Lições completadas</Text>
              <Text style={styles.statNumber}>12</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statTitle}>Exercícios perfeitos</Text>
              <Text style={styles.statNumber}>8</Text>
            </View>
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      <BottomTabBar navigation={navigation} activeScreen="Profile" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#58CC02",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#58CC02",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarLetter: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  levelContainer: {
    backgroundColor: "#FFF4D4",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 20,
  },
  levelText: {
    color: "#FFCC00",
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  achievementCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  achievementDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    marginTop: 5,
  },
  progressFilled: {
    height: "100%",
    backgroundColor: "#58CC02",
    borderRadius: 3,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  viewAllText: {
    color: "#58CC02",
    fontWeight: "bold",
    marginRight: 5,
  },
  statsCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  statTitle: {
    fontSize: 16,
    color: "#333",
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  spacer: {
    height: 80,
  },
})

