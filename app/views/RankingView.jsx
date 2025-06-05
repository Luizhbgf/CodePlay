"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, StatusBar, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"

const { width } = Dimensions.get("window")

const RankingView = () => {
  const [activeTab, setActiveTab] = useState("week")
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchRankingData()
  }, [activeTab])

  const fetchRankingData = () => {
    // Simulando dados de ranking
    const rankingData = [
      {
        id: 1,
        name: "João Silva",
        username: "joaosilva",
        avatar: null,
        xp: 1250,
        streak: 15,
        rank: 1,
      },
      {
        id: 2,
        name: "Maria Oliveira",
        username: "mariaoliveira",
        avatar: null,
        xp: 980,
        streak: 10,
        rank: 2,
      },
      {
        id: 3,
        name: "Pedro Santos",
        username: "pedrosantos",
        avatar: null,
        xp: 870,
        streak: 8,
        rank: 3,
      },
      {
        id: 4,
        name: "Ana Costa",
        username: "anacosta",
        avatar: null,
        xp: 750,
        streak: 12,
        rank: 4,
      },
      {
        id: 5,
        name: "Lucas Ferreira",
        username: "lucasferreira",
        avatar: null,
        xp: 680,
        streak: 7,
        rank: 5,
      },
      {
        id: 6,
        name: "Juliana Lima",
        username: "julianalima",
        avatar: null,
        xp: 620,
        streak: 9,
        rank: 6,
      },
      {
        id: 7,
        name: "Rafael Souza",
        username: "rafaelsouza",
        avatar: null,
        xp: 590,
        streak: 6,
        rank: 7,
      },
      {
        id: 8,
        name: "Carla Mendes",
        username: "carlamendes",
        avatar: null,
        xp: 540,
        streak: 5,
        rank: 8,
      },
      {
        id: 9,
        name: "Bruno Alves",
        username: "brunoalves",
        avatar: null,
        xp: 510,
        streak: 4,
        rank: 9,
      },
      {
        id: 10,
        name: "Fernanda Dias",
        username: "fernandadias",
        avatar: null,
        xp: 480,
        streak: 3,
        rank: 10,
      },
    ]

    // Adicionar usuário atual (você) na posição 5 para demonstração
    const currentUser = {
      id: 999,
      name: "Você",
      username: "você",
      avatar: null,
      xp: 680,
      streak: 7,
      rank: 5,
      isCurrentUser: true,
    }

    // Substituir o usuário na posição 5 pelo usuário atual
    rankingData[4] = currentUser

    setUsers(rankingData)
  }

  const renderUserItem = ({ item, index }) => {
    const isTopThree = index < 3
    const medalColors = ["#FFD700", "#C0C0C0", "#CD7F32"]

    return (
      <TouchableOpacity
        style={[styles.userCard, item.isCurrentUser && styles.currentUserCard, isTopThree && styles.topThreeCard]}
      >
        <View style={styles.rankContainer}>
          {isTopThree ? (
            <View style={[styles.medalIcon, { backgroundColor: medalColors[index] }]}>
              <Text style={styles.medalText}>{index + 1}</Text>
            </View>
          ) : (
            <Text style={styles.rankText}>{index + 1}</Text>
          )}
        </View>

        <View style={styles.avatarContainer}>
          {item.avatar ? (
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarPlaceholder, item.isCurrentUser && styles.currentUserAvatar]}>
              <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>
          )}
        </View>

        <View style={styles.userInfo}>
          <Text style={[styles.userName, item.isCurrentUser && styles.currentUserText]}>{item.name}</Text>
          <Text style={styles.userUsername}>@{item.username}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.statValue}>{item.xp}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="flame" size={16} color="#FF6B35" />
            <Text style={styles.statValue}>{item.streak}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
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
        <Text style={styles.headerTitle}>Ranking</Text>
        <Text style={styles.headerSubtitle}>Veja quem está no topo!</Text>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "week" && styles.activeTab]}
            onPress={() => setActiveTab("week")}
          >
            <Text style={[styles.tabText, activeTab === "week" && styles.activeTabText]}>Semana</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "month" && styles.activeTab]}
            onPress={() => setActiveTab("month")}
          >
            <Text style={[styles.tabText, activeTab === "month" && styles.activeTabText]}>Mês</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "alltime" && styles.activeTab]}
            onPress={() => setActiveTab("alltime")}
          >
            <Text style={[styles.tabText, activeTab === "alltime" && styles.activeTabText]}>Todos os tempos</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.usersList}
        showsVerticalScrollIndicator={false}
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
    paddingBottom: 20,
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
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#FFFFFF",
  },
  tabText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "600",
    fontSize: 14,
  },
  activeTabText: {
    color: "#4CAF50",
  },
  usersList: {
    padding: 20,
    paddingBottom: 100,
  },
  userCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
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
  currentUserCard: {
    backgroundColor: "#F0FFF0",
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  topThreeCard: {
    borderLeftWidth: 5,
    borderLeftColor: "#FFD700",
  },
  rankContainer: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  rankText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
  },
  medalIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  medalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  currentUserAvatar: {
    backgroundColor: "#4CAF50",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  currentUserText: {
    color: "#4CAF50",
  },
  userUsername: {
    fontSize: 14,
    color: "#999",
  },
  statsContainer: {
    flexDirection: "row",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    marginLeft: 4,
  },
})

export default RankingView
