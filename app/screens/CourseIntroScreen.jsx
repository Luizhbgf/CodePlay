import React from "react"
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import BottomTabBar from "../components/BottomTabBar"

export default function CourseIntroScreen({ navigation, route }) {
  const module = route.params?.module || {
    id: "html",
    title: "HTML",
    description: "Aprenda a estrutura básica da web",
    icon: "logo-html5",
    iconColor: "#E44D26",
    backgroundColor: "#FFF4F2",
    lessons: [
      { id: "html1", title: "Introdução", completed: true },
      { id: "html2", title: "Tags Básicas", completed: true },
      { id: "html3", title: "Formulários", completed: false },
      { id: "html4", title: "Tabelas", completed: false },
      { id: "html5", title: "Semântica", completed: false },
    ],
  }

  const handleLessonPress = (lesson) => {
    navigation.navigate("Lesson", { lesson, moduleTitle: module.title })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { backgroundColor: module.iconColor }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{module.title}</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.moduleIntro}>
          <View style={[styles.moduleIconContainer, { backgroundColor: module.iconColor }]}>
            <Ionicons name={module.icon} size={40} color="white" />
          </View>
          <Text style={styles.moduleTitle}>{module.title}</Text>
          <Text style={styles.moduleDescription}>{module.description}</Text>
        </View>

        <View style={styles.lessonsContainer}>
          <Text style={styles.sectionTitle}>Lições</Text>

          {module.lessons.map((lesson, index) => (
            <TouchableOpacity
              key={lesson.id}
              style={[
                styles.lessonCard,
                lesson.completed ? styles.lessonCompleted : {},
                index === 0 || module.lessons[index - 1].completed ? {} : styles.lessonLocked,
              ]}
              onPress={() => handleLessonPress(lesson)}
              disabled={index !== 0 && !module.lessons[index - 1].completed}
            >
              <View
                style={[
                  styles.lessonNumber,
                  { backgroundColor: lesson.completed ? "#58CC02" : index === 0 || module.lessons[index - 1].completed ? "#FFC800" : "#E0E0E0" },
                ]}
              >
                <Text style={styles.lessonNumberText}>{index + 1}</Text>
              </View>

              <View style={styles.lessonInfo}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonSubtitle}>
                  {lesson.completed ? "Concluído" : index === 0 || module.lessons[index - 1].completed ? "Disponível" : "Bloqueado"}
                </Text>
              </View>

              {lesson.completed ? (
                <Ionicons name="checkmark-circle" size={24} color="#58CC02" />
              ) : index === 0 || module.lessons[index - 1].completed ? (
                <Ionicons name="play-circle" size={24} color="#FFC800" />
              ) : (
                <Ionicons name="lock-closed" size={24} color="#AFAFAF" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.skillsContainer}>
          <Text style={styles.sectionTitle}>O que você vai aprender</Text>

          <View style={styles.skillCard}>
            <Ionicons name="code-slash" size={24} color="#58CC02" style={styles.skillIcon} />
            <Text style={styles.skillText}>Estrutura básica de documentos</Text>
          </View>

          <View style={styles.skillCard}>
            <Ionicons name="list" size={24} color="#58CC02" style={styles.skillIcon} />
            <Text style={styles.skillText}>Organização de conteúdo</Text>
          </View>

          <View style={styles.skillCard}>
            <Ionicons name="link" size={24} color="#58CC02" style={styles.skillIcon} />
            <Text style={styles.skillText}>Criação de links e navegação</Text>
          </View>

          <View style={styles.skillCard}>
            <Ionicons name="image" size={24} color="#58CC02" style={styles.skillIcon} />
            <Text style={styles.skillText}>Incorporação de mídia</Text>
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      <BottomTabBar navigation={navigation} activeScreen="Home" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  scrollView: {
    flex: 1,
  },
  moduleIntro: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  moduleIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  moduleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  moduleDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  lessonsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  lessonCard: {
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
  lessonCompleted: {
    borderLeftWidth: 4,
    borderLeftColor: "#58CC02",
  },
  lessonLocked: {
    opacity: 0.7,
  },
  lessonNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  lessonNumberText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  lessonSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  skillsContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  skillCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    marginBottom: 10,
    padding: 15,
  },
  skillIcon: {
    marginRight: 15,
  },
  skillText: {
    fontSize: 16,
    color: "#333",
  },
  spacer: {
    height: 80,
  },
})

