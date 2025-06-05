"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, TextInput, FlatList } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"

const CoursesView = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [categories, setCategories] = useState([
    { id: "all", name: "Todos", active: true },
    { id: "frontend", name: "Frontend", active: false },
    { id: "backend", name: "Backend", active: false },
    { id: "mobile", name: "Mobile", active: false },
    { id: "database", name: "Banco de Dados", active: false },
  ])
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])

  useEffect(() => {
    // Simulando dados de cursos
    const coursesData = [
      {
        id: 1,
        title: "JavaScript Básico",
        description: "Aprenda os fundamentos do JavaScript",
        lessons: 10,
        duration: "3 horas",
        level: "Iniciante",
        category: "frontend",
        icon: "logo-javascript",
        color: "#F7DF1E",
        students: 1245,
        rating: 4.8,
      },
      {
        id: 2,
        title: "HTML & CSS",
        description: "Construa sites responsivos",
        lessons: 8,
        duration: "2.5 horas",
        level: "Iniciante",
        category: "frontend",
        icon: "code-slash",
        color: "#E44D26",
        students: 1890,
        rating: 4.7,
      },
      {
        id: 3,
        title: "React Native",
        description: "Crie apps para iOS e Android",
        lessons: 12,
        duration: "4 horas",
        level: "Intermediário",
        category: "mobile",
        icon: "phone-portrait",
        color: "#61DAFB",
        students: 950,
        rating: 4.9,
      },
      {
        id: 4,
        title: "Node.js",
        description: "Construa APIs e servidores",
        lessons: 15,
        duration: "5 horas",
        level: "Intermediário",
        category: "backend",
        icon: "server",
        color: "#68A063",
        students: 780,
        rating: 4.6,
      },
      {
        id: 5,
        title: "MongoDB",
        description: "Banco de dados NoSQL",
        lessons: 8,
        duration: "3 horas",
        level: "Intermediário",
        category: "database",
        icon: "server",
        color: "#4DB33D",
        students: 650,
        rating: 4.5,
      },
      {
        id: 6,
        title: "React.js",
        description: "Biblioteca para interfaces",
        lessons: 14,
        duration: "4.5 horas",
        level: "Intermediário",
        category: "frontend",
        icon: "logo-react",
        color: "#61DAFB",
        students: 1120,
        rating: 4.8,
      },
    ]

    setCourses(coursesData)
    setFilteredCourses(coursesData)
  }, [])

  useEffect(() => {
    filterCourses()
  }, [searchQuery, categories])

  const filterCourses = () => {
    const activeCategory = categories.find((cat) => cat.active)

    let filtered = courses

    // Filter by category
    if (activeCategory && activeCategory.id !== "all") {
      filtered = filtered.filter((course) => course.category === activeCategory.id)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (course) => course.title.toLowerCase().includes(query) || course.description.toLowerCase().includes(query),
      )
    }

    setFilteredCourses(filtered)
  }

  const handleCategoryPress = (id) => {
    setCategories(
      categories.map((cat) => ({
        ...cat,
        active: cat.id === id,
      })),
    )
  }

  const handleCoursePress = (course) => {
    navigation.navigate("Quiz", { course })
  }

  const renderCourseItem = ({ item }) => (
    <TouchableOpacity style={styles.courseCard} onPress={() => handleCoursePress(item)}>
      <View style={[styles.courseIconContainer, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={30} color="#FFF" />
      </View>
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseDescription}>{item.description}</Text>
        <View style={styles.courseDetails}>
          <View style={styles.courseDetailItem}>
            <Ionicons name="book-outline" size={14} color="#666" />
            <Text style={styles.courseDetailText}>{item.lessons} lições</Text>
          </View>
          <View style={styles.courseDetailItem}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.courseDetailText}>{item.duration}</Text>
          </View>
          <View style={styles.courseDetailItem}>
            <Ionicons name="speedometer-outline" size={14} color="#666" />
            <Text style={styles.courseDetailText}>{item.level}</Text>
          </View>
        </View>
        <View style={styles.courseStats}>
          <View style={styles.courseStatItem}>
            <Ionicons name="people-outline" size={14} color="#4CAF50" />
            <Text style={styles.courseStatText}>{item.students}</Text>
          </View>
          <View style={styles.courseStatItem}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.courseStatText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      <LinearGradient
        colors={["#4CAF50", "#45a049", "#2E7D32"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Cursos</Text>
        <Text style={styles.headerSubtitle}>Explore e aprenda novas habilidades</Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar cursos..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </LinearGradient>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryButton, category.active && styles.categoryButtonActive]}
              onPress={() => handleCategoryPress(category.id)}
            >
              <Text style={[styles.categoryButtonText, category.active && styles.categoryButtonTextActive]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredCourses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.coursesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={50} color="#CCC" />
            <Text style={styles.emptyText}>Nenhum curso encontrado</Text>
          </View>
        }
      />
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
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  categoriesContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#F0F0F0",
  },
  categoryButtonActive: {
    backgroundColor: "#4CAF50",
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  categoryButtonTextActive: {
    color: "#FFFFFF",
  },
  coursesList: {
    padding: 20,
  },
  courseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
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
  courseDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  courseDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    marginBottom: 5,
  },
  courseDetailText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  courseStats: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  courseStatItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  courseStatText: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "bold",
    marginLeft: 4,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 10,
  },
})

export default CoursesView
