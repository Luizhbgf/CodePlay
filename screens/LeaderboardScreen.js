"use client"

import { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import BottomTabBar from "../components/BottomTabBar"

export default function LeaderboardScreen({ navigation }) {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [timeFrame, setTimeFrame] = useState("week") // 'day', 'week', 'month', 'all'
  const [userPoints, setUserPoints] = useState(820) // Pontos do usuário atual

  // Simular carregamento de dados do leaderboard
  useEffect(() => {
    const loadLeaderboard = async () => {
      setLoading(true)

      // Simular chamada de API
      setTimeout(() => {
        // Dados simulados de classificação
        const data = [
          { id: "1", name: "Maria Silva", points: 1250, avatar: require("../assets/images/avatar.png") },
          { id: "2", name: "João Santos", points: 980, avatar: require("../assets/images/avatar.png") },
          { id: "3", name: "Ana Oliveira", points: 875, avatar: require("../assets/images/avatar.png") },
          { id: "4", name: "Carlos Pereira", points: 820, avatar: require("../assets/images/avatar.png") },
          {
            id: "5",
            name: "Fulano",
            points: userPoints,
            avatar: require("../assets/images/avatar.png"),
            isCurrentUser: true,
          },
          { id: "6", name: "Beatriz Costa", points: 720, avatar: require("../assets/images/avatar.png") },
          { id: "7", name: "Rafael Souza", points: 690, avatar: require("../assets/images/avatar.png") },
          { id: "8", name: "Fernanda Lima", points: 650, avatar: require("../assets/images/avatar.png") },
          { id: "9", name: "Lucas Martins", points: 610, avatar: require("../assets/images/avatar.png") },
          { id: "10", name: "Juliana Alves", points: 580, avatar: require("../assets/images/avatar.png") },
        ]

        // Ordenar por pontos
        const sortedData = [...data].sort((a, b) => b.points - a.points)

        // Atribuir posições
        const rankedData = sortedData.map((user, index) => ({
          ...user,
          rank: index + 1,
        }))

        setLeaderboard(rankedData)
        setLoading(false)
      }, 1000)
    }

    loadLeaderboard()
  }, [timeFrame, userPoints])

  const renderItem = ({ item, index }) => {
    // Determinar estilo com base na posição
    let rankStyle = {}
    let medalIcon = null

    if (item.rank === 1) {
      rankStyle = styles.firstPlace
      medalIcon = <Ionicons name="medal" size={20} color="#FFD700" />
    } else if (item.rank === 2) {
      rankStyle = styles.secondPlace
      medalIcon = <Ionicons name="medal" size={20} color="#C0C0C0" />
    } else if (item.rank === 3) {
      rankStyle = styles.thirdPlace
      medalIcon = <Ionicons name="medal" size={20} color="#CD7F32" />
    }

    return (
      <View
        style={[
          styles.leaderboardItem,
          {
            backgroundColor: item.isCurrentUser ? "#58CC0220" : "white",
          },
        ]}
      >
        <View style={[styles.rankContainer, rankStyle]}>
          <Text style={styles.rankText}>{item.rank}</Text>
          {medalIcon}
        </View>

        <Image source={item.avatar} style={styles.avatar} />

        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {item.name}
            {item.isCurrentUser && <Text style={styles.currentUser}> (Você)</Text>}
          </Text>
        </View>

        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>{item.points}</Text>
          <Text style={styles.pointsLabel}>XP</Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Classificação</Text>

        <View style={styles.timeFrameContainer}>
          <TouchableOpacity
            style={[styles.timeFrameButton, timeFrame === "day" && styles.activeTimeFrame]}
            onPress={() => setTimeFrame("day")}
          >
            <Text style={[styles.timeFrameText, timeFrame === "day" && styles.activeTimeFrameText]}>Dia</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.timeFrameButton, timeFrame === "week" && styles.activeTimeFrame]}
            onPress={() => setTimeFrame("week")}
          >
            <Text style={[styles.timeFrameText, timeFrame === "week" && styles.activeTimeFrameText]}>Semana</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.timeFrameButton, timeFrame === "month" && styles.activeTimeFrame]}
            onPress={() => setTimeFrame("month")}
          >
            <Text style={[styles.timeFrameText, timeFrame === "month" && styles.activeTimeFrameText]}>Mês</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.timeFrameButton, timeFrame === "all" && styles.activeTimeFrame]}
            onPress={() => setTimeFrame("all")}
          >
            <Text style={[styles.timeFrameText, timeFrame === "all" && styles.activeTimeFrameText]}>Sempre</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#58CC02" />
          <Text style={styles.loadingText}>Carregando classificação...</Text>
        </View>
      ) : (
        <FlatList
          data={leaderboard}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}

      <BottomTabBar navigation={navigation} activeScreen="Leaderboard" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#58CC02",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  timeFrameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    padding: 5,
  },
  timeFrameButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  activeTimeFrame: {
    backgroundColor: "white",
  },
  timeFrameText: {
    color: "white",
    fontWeight: "bold",
  },
  activeTimeFrameText: {
    color: "#58CC02",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  listContent: {
    padding: 20,
    paddingBottom: 80,
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  rankContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  rankText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  firstPlace: {
    backgroundColor: "#FFD700",
  },
  secondPlace: {
    backgroundColor: "#C0C0C0",
  },
  thirdPlace: {
    backgroundColor: "#CD7F32",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  currentUser: {
    fontStyle: "italic",
    fontWeight: "normal",
    color: "#58CC02",
  },
  pointsContainer: {
    alignItems: "flex-end",
  },
  pointsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  pointsLabel: {
    fontSize: 12,
    color: "#666",
  },
})
