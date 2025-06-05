"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, StatusBar } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { supabase } from "../../lib/supabase"
import { Ionicons } from "@expo/vector-icons"

const { width } = Dimensions.get("window")
const cardWidth = width * 0.85

const HomeView = ({ navigation, route }) => {
  const { session } = route.params
  const [username, setUsername] = useState("")
  const [streak, setStreak] = useState(0)
  const [xp, setXp] = useState(0)
  const [dailyGoal, setDailyGoal] = useState(50)
  const [dailyProgress, setDailyProgress] = useState(0)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    if (session) getProfile()
    fetchCourses()
  }, [session])

  const getProfile = async () => {
    try {
      const { user } = session

      const { data, error } = await supabase
        .from("profiles")
        .select("username, streak, xp, daily_goal, daily_progress")
        .eq("id", user.id)
        .single()

      if (error) throw error

      if (data) {
        setUsername(data.username || user.email.split("@")[0])
        setStreak(data.streak || 0)
        setXp(data.xp || 0)
        setDailyGoal(data.daily_goal || 50)
        setDailyProgress(data.daily_progress || 0)
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error.message)
    }
  }

  const fetchCourses = async () => {
    // Simulando dados de cursos
    setCourses([
      {
        id: 1,
        title: "JavaScript Básico",
        description: "Aprenda os fundamentos do JavaScript",
        progress: 65,
        icon: "logo-javascript",
        color: "#F7DF1E",
        lessons: 10,
      },
      {
        id: 2,
        title: "HTML & CSS",
        description: "Construa sites responsivos",
        progress: 40,
        icon: "code-slash",
        color: "#E44D26",
        lessons: 8,
      },
      {
        id: 3,
        title: "React Native",
        description: "Crie apps para iOS e Android",
        progress: 20,
        icon: "phone-portrait",
        color: "#61DAFB",
        lessons: 12,
      },
    ])
  }

  const handleCoursePress = (course) => {
    navigation.navigate("Quiz", { course })
  }

  const handlePracticePress = () => {
    navigation.navigate("Practice")
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      <LinearGradient
        colors={["#4CAF50", "#45a049", "#2E7D32"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Olá, {username}!</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="flame" size={24} color="#FF6B35" />
              <Text style={styles.statValue}>{streak}</Text>
              <Text style={styles.statLabel}>Dias</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="star" size={24} color="#FFD700" />
              <Text style={styles.statValue}>{xp}</Text>
              <Text style={styles.statLabel}>XP</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Daily Goal */}
        <View style={styles.dailyGoalCard}>
          <View style={styles.dailyGoalHeader}>
            <Text style={styles.dailyGoalTitle}>Meta Diária</Text>
            <Text style={styles.dailyGoalXP}>
              {dailyProgress}/{dailyGoal} XP
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${(dailyProgress / dailyGoal) * 100}%` }]} />
          </View>
        </View>

        {/* Continue Learning */}
        <Text style={styles.sectionTitle}>Continue Aprendendo</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.coursesScroll}>
          {courses.map((course) => (
            <TouchableOpacity key={course.id} style={styles.courseCard} onPress={() => handleCoursePress(course)}>
              <View style={[styles.courseIconContainer, { backgroundColor: course.color }]}>
                <Ionicons name={course.icon} size={30} color="#FFF" />
              </View>
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseDescription}>{course.description}</Text>
                <View style={styles.courseProgressContainer}>
                  <View style={styles.courseProgressBar}>
                    <View style={[styles.courseProgress, { width: `${course.progress}%` }]} />
                  </View>
                  <Text style={styles.courseProgressText}>{course.progress}%</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Practice */}
        <Text style={styles.sectionTitle}>Pratique Suas Habilidades</Text>
        <TouchableOpacity style={styles.practiceCard} onPress={handlePracticePress}>
          <LinearGradient
            colors={["#FF6B35", "#F7931E"]}
            style={styles.practiceGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.practiceContent}>
              <View style={styles.practiceIconContainer}>
                <Ionicons name="fitness" size={40} color="#FFF" />
              </View>
              <View style={styles.practiceInfo}>
                <Text style={styles.practiceTitle}>Modo Prática</Text>
                <Text style={styles.practiceDescription}>Teste seus conhecimentos com exercícios rápidos</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Challenges */}
        <Text style={styles.sectionTitle}>Desafios</Text>
        <View style={styles.challengeCard}>
          <View style={styles.challengeHeader}>
            <Ionicons name="trophy" size={24} color="#FFD700" />
            <Text style={styles.challengeTitle}>Desafio Semanal</Text>
          </View>
          <Text style={styles.challengeDescription}>Complete 5 lições para ganhar 50 XP extras!</Text>
          <View style={styles.challengeProgressContainer}>
            <View style={styles.challengeProgressBar}>
              <View style={[styles.challengeProgress, { width: "40%" }]} />
            </View>
            <Text style={styles.challengeProgressText}>2/5</Text>
          </View>
        </View>

        {/* Spacing for bottom tabs */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
    marginLeft: 20,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  dailyGoalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dailyGoalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  dailyGoalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  dailyGoalXP: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "600",
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    marginTop: 10,
  },
  coursesScroll: {
    marginBottom: 20,
  },
  courseCard: {
    width: cardWidth,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  courseDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  courseProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  courseProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    marginRight: 10,
    overflow: "hidden",
  },
  courseProgress: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 3,
  },
  courseProgressText: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "600",
  },
  practiceCard: {
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  practiceGradient: {
    padding: 20,
  },
  practiceContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  practiceIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  practiceInfo: {
    flex: 1,
  },
  practiceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  practiceDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  challengeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  challengeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  challengeDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  challengeProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  challengeProgressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginRight: 10,
    overflow: "hidden",
  },
  challengeProgress: {
    height: "100%",
    backgroundColor: "#FFD700",
    borderRadius: 4,
  },
  challengeProgressText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
})

export default HomeView
