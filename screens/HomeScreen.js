"use client"

import { useState, useRef, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import BottomTabBar from "../components/BottomTabBar"
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

export default function HomeScreen({ navigation }) {
  const [streakDays, setStreakDays] = useState(5)
  const [xpPoints, setXpPoints] = useState(130)
  const { darkMode, setDarkMode } = useContext(ThemeContext)
  const animation = useRef(new Animated.Value(0)).current

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#fff", "#151515"],
  })

  const headerColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#54B435", "#397E00"],
  })

  const getThemeStyles = (darkMode) => ({
    welcomeText: {
      color: darkMode ? '#FFF' : '#333',
    },
    subText: {
      color: darkMode ? '#CCC' : '#666',
    },
    iconColor: darkMode ? '#151515' : 'white',
    cardText: {
      color: darkMode ? '#FFF' : '#333',
    },
    cardDesc: {
      color: darkMode ? '#AAA' : '#666',
    },
    cardProgressText: {
      color: darkMode ? '#999' : '#666',
    },
    moduleCardBg: darkMode ? '#1e1e1e' : null,
    goalCardBg: darkMode ? '#333' : '#FFF9E5',
    goalText: darkMode ? '#FFF' : '#333',
  })

  useEffect(() => {
    Animated.timing(animation, {
      toValue: darkMode ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [darkMode])

  const stylesTheme = getThemeStyles(darkMode)

  const modules = [
    {
      id: "html",
      title: "HTML",
      description: "Aprenda a estrutura básica da web",
      icon: "logo-html5",
      iconColor: "#E44D26",
      backgroundColor: "#FFF4F2",
      progress: 0.4,
      lessons: [
        { id: "html1", title: "Introdução", completed: true },
        { id: "html2", title: "Tags Básicas", completed: true },
        { id: "html3", title: "Formulários", completed: false },
        { id: "html4", title: "Tabelas", completed: false },
        { id: "html5", title: "Semântica", completed: false },
      ],
    },
    {
      id: "css",
      title: "CSS",
      description: "Estilize suas páginas web",
      icon: "logo-css3",
      iconColor: "#264DE4",
      backgroundColor: "#F2F9FF",
      progress: 0.2,
      lessons: [
        { id: "css1", title: "Seletores", completed: true },
        { id: "css2", title: "Cores e Fontes", completed: false },
        { id: "css3", title: "Layout", completed: false },
        { id: "css4", title: "Flexbox", completed: false },
        { id: "css5", title: "Responsividade", completed: false },
      ],
    },
    {
      id: "js",
      title: "JavaScript",
      description: "Adicione interatividade aos seus sites",
      icon: "logo-javascript",
      iconColor: "#F7DF1E",
      backgroundColor: "#FFFDF2",
      progress: 0.1,
      lessons: [
        { id: "js1", title: "Variáveis", completed: true },
        { id: "js2", title: "Funções", completed: false },
        { id: "js3", title: "DOM", completed: false },
        { id: "js4", title: "Eventos", completed: false },
        { id: "js5", title: "APIs", completed: false },
      ],
    },
    {
      id: "python",
      title: "Python",
      description: "Aprenda a linguagem mais versátil",
      icon: "logo-python",
      iconColor: "#3776AB",
      backgroundColor: "#F2F7FF",
      progress: 0,
      locked: true,
      lessons: [
        { id: "py1", title: "Introdução", completed: false },
        { id: "py2", title: "Estruturas de Dados", completed: false },
        { id: "py3", title: "Funções", completed: false },
        { id: "py4", title: "Classes", completed: false },
        { id: "py5", title: "Bibliotecas", completed: false },
      ],
    },
  ]

  const handleModulePress = (module) => {
    if (module.locked) return
    navigation.navigate("CourseIntro", { module })
  }

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Animated.View style={[styles.header, { backgroundColor: headerColor }]}>
        <View style={styles.headerTop}>
          <View style={styles.streakContainer}>
            <Ionicons name="flame" size={24} color="#FF9500" />
            <Text style={styles.streakText}>{streakDays}</Text>
          </View>

          <View style={styles.xpContainer}>
            <Ionicons name="star" size={20} color="#FFCC00" />
            <Text style={styles.xpText}>{xpPoints} XP</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TouchableOpacity onPress={() => setDarkMode(!darkMode)}>
              <View style={styles.settingsIcon}>
                <Ionicons
                  name={darkMode ? "moon" : "sunny"}
                  size={24}
                  color={stylesTheme.iconColor}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <View style={styles.profileIcon}>
                <Ionicons name="person" size={24} color={stylesTheme.iconColor} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFilled, { width: `${((xpPoints % 100) / 100) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>{100 - (xpPoints % 100)} XP para o próximo nível</Text>
        </View>
      </Animated.View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <Text style={[styles.welcomeTitle, stylesTheme.welcomeText]}>Olá, Programador!</Text>
          <Text style={[styles.welcomeSubtitle, stylesTheme.subText]}>Vamos continuar aprendendo hoje?</Text>
        </View>

        <View style={styles.modulesContainer}>
          {modules.map((module) => (
            <TouchableOpacity
              key={module.id}
              style={[styles.moduleCard, { backgroundColor: stylesTheme.moduleCardBg || module.backgroundColor }]}
              onPress={() => handleModulePress(module)}
              disabled={module.locked}
            >
              <View style={[styles.moduleIconContainer, { backgroundColor: module.iconColor }]}>
                <Ionicons name={module.icon} size={30} color="white" />
              </View>

              <View style={styles.moduleInfo}>
                <Text style={[styles.moduleTitle, stylesTheme.cardText]}>{module.title}</Text>
                <Text style={[styles.moduleDescription, stylesTheme.cardDesc]} numberOfLines={1}>{module.description}</Text>

                <View style={styles.moduleProgressBar}>
                  <View style={[styles.moduleProgressFilled, { width: `${module.progress * 100}%` }]} />
                </View>
                <Text style={[styles.moduleProgressText, stylesTheme.cardProgressText]}>{Math.round(module.progress * 100)}% completo</Text>
              </View>

              {module.locked && (
                <View style={styles.lockedOverlay}>
                  <Ionicons name="lock-closed" size={24} color="white" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.dailyGoalSection}>
          <Text style={[styles.dailyGoalTitle, { color: stylesTheme.goalText }]}>Meta Diária</Text>
          <View style={[styles.dailyGoalCard, { backgroundColor: stylesTheme.goalCardBg }]}>
            <Ionicons name="trophy" size={40} color="#FFCC00" />
            <View style={styles.dailyGoalInfo}>
              <Text style={[styles.dailyGoalText, { color: stylesTheme.goalText }]}>Ganhe 50 XP hoje</Text>
              <View style={styles.dailyGoalProgress}>
                <View style={[styles.dailyGoalProgressFilled, { width: "60%" }]} />
              </View>
              <Text style={[styles.dailyGoalProgressText, stylesTheme.cardProgressText]}>30/50 XP</Text>
            </View>
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      <BottomTabBar navigation={navigation} activeScreen="Home" />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#58CC02",
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 94, 0, 0.2)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  streakText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },
  xpContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  xpText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarContainer: {
    marginTop: 5,
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 4,
    marginBottom: 5,
  },
  progressFilled: {
    height: "100%",
    backgroundColor: "#FFCC00",
    borderRadius: 4,
  },
  progressText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  modulesContainer: {
    paddingHorizontal: 20,
  },
  moduleCard: {
    flexDirection: "row",
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
    overflow: "hidden",
  },
  moduleIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  moduleProgressBar: {
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    marginBottom: 4,
  },
  moduleProgressFilled: {
    height: "100%",
    backgroundColor: "#58CC02",
    borderRadius: 3,
  },
  moduleProgressText: {
    fontSize: 12,
    color: "#666",
  },
  lockedOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  dailyGoalSection: {
    padding: 20,
  },
  dailyGoalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  dailyGoalCard: {
    flexDirection: "row",
    backgroundColor: "#FFF9E5",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
  },
  dailyGoalInfo: {
    flex: 1,
    marginLeft: 15,
  },
  dailyGoalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  dailyGoalProgress: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 5,
  },
  dailyGoalProgressFilled: {
    height: "100%",
    backgroundColor: "#FFCC00",
    borderRadius: 4,
  },
  dailyGoalProgressText: {
    fontSize: 12,
    color: "#666",
  },
  spacer: {
    height: 80,
  },
  containerDark: {
    backgroundColor: "#000",
  },
  headerDark: {
    backgroundColor: "#397E00",
  },
  settingsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
})
