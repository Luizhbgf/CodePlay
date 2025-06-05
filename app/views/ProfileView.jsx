"use client"

import { useState, useEffect } from "react"
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { supabase } from "../../lib/supabase"
import * as ImagePicker from "expo-image-picker"
import { Ionicons } from "@expo/vector-icons"

const { width } = Dimensions.get("window")

const ProfileView = ({ navigation, route }) => {
  const { session } = route.params
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [website, setWebsite] = useState("")
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [streak, setStreak] = useState(0)
  const [xp, setXp] = useState(0)
  const [completedLessons, setCompletedLessons] = useState(0)
  const [achievements, setAchievements] = useState([])

  useEffect(() => {
    if (session) getProfile()
    fetchAchievements()
  }, [session])

  const getProfile = async () => {
    try {
      setLoading(true)

      const { user } = session

      const { data, error } = await supabase
        .from("profiles")
        .select("username, website, avatar_url, streak, xp, completed_lessons")
        .eq("id", user.id)
        .single()

      if (error) throw error

      if (data) {
        setUsername(data.username || "")
        setWebsite(data.website || "")
        setAvatarUrl(data.avatar_url)
        setStreak(data.streak || 0)
        setXp(data.xp || 0)
        setCompletedLessons(data.completed_lessons || 0)
      }
    } catch (error) {
      Alert.alert("Erro ao carregar perfil", error.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchAchievements = () => {
    // Simulando dados de conquistas
    setAchievements([
      {
        id: 1,
        title: "Primeiro Login",
        description: "Bem-vindo ao CodePlay!",
        icon: "ribbon",
        color: "#4CAF50",
        unlocked: true,
      },
      {
        id: 2,
        title: "Streak de 7 dias",
        description: "Mantenha o ritmo por uma semana",
        icon: "flame",
        color: "#FF6B35",
        unlocked: false,
        progress: 5,
        total: 7,
      },
      {
        id: 3,
        title: "100 XP",
        description: "Acumule 100 pontos de experiência",
        icon: "star",
        color: "#FFD700",
        unlocked: false,
        progress: 65,
        total: 100,
      },
      {
        id: 4,
        title: "Primeiro Curso",
        description: "Complete seu primeiro curso",
        icon: "school",
        color: "#9C27B0",
        unlocked: false,
      },
    ])
  }

  const updateProfile = async ({ username, website, avatar_url }) => {
    try {
      setLoading(true)

      const { user } = session
      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      const { error } = await supabase.from("profiles").upsert(updates)

      if (error) throw error
      Alert.alert("Sucesso!", "Perfil atualizado com sucesso!")
    } catch (error) {
      Alert.alert("Erro ao atualizar perfil", error.message)
    } finally {
      setLoading(false)
    }
  }

  const uploadAvatar = async () => {
    try {
      setLoading(true)

      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (status !== "granted") {
        Alert.alert("Permissão necessária", "Precisamos de acesso às suas fotos")
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        exif: false,
      })

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return
      }

      const image = result.assets[0]

      if (!image.uri) {
        throw new Error("Nenhuma imagem selecionada!")
      }

      const arraybuffer = await fetch(image.uri).then((res) => res.arrayBuffer())
      const fileExt = image.uri.split(".").pop()?.toLowerCase() || "jpeg"
      const filePath = `${session.user.id}-${Date.now()}.${fileExt}`

      const { data, error: uploadError } = await supabase.storage.from("avatars").upload(filePath, arraybuffer, {
        contentType: image.mimeType || "image/jpeg",
      })

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(data.path)

      setAvatarUrl(publicUrl)
      updateProfile({ username, website, avatar_url: publicUrl })
    } catch (error) {
      Alert.alert("Erro ao fazer upload", error.message)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      Alert.alert("Erro ao sair", error.message)
    }
  }

  const goToSettings = () => {
    navigation.navigate("Settings")
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
          <Text style={styles.headerTitle}>Meu Perfil</Text>
          <TouchableOpacity style={styles.settingsButton} onPress={goToSettings}>
            <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <TouchableOpacity onPress={uploadAvatar} style={styles.avatarContainer}>
              {avatarUrl ? (
                <Image source={{ uri: avatarUrl }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarPlaceholderText}>{username ? username.charAt(0).toUpperCase() : "?"}</Text>
                </View>
              )}
              <View style={styles.avatarOverlay}>
                <Text style={styles.avatarOverlayText}>Alterar</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.username}>{username || "Seu Nome"}</Text>
            <Text style={styles.email}>{session?.user?.email}</Text>
          </View>

          {/* Stats Section */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{streak}</Text>
              <Text style={styles.statLabel}>Dias</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{xp}</Text>
              <Text style={styles.statLabel}>XP</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{completedLessons}</Text>
              <Text style={styles.statLabel}>Lições</Text>
            </View>
          </View>
        </View>

        {/* Edit Profile Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Editar Perfil</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome de usuário</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu nome de usuário"
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Website</Text>
            <TextInput
              style={styles.input}
              placeholder="https://seusite.com"
              placeholderTextColor="#999"
              value={website}
              onChangeText={setWebsite}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={[styles.updateButton, loading && styles.buttonDisabled]}
            onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
            disabled={loading}
          >
            <LinearGradient
              colors={["#FF6B35", "#F7931E"]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.updateButtonText}>{loading ? "Salvando..." : "Atualizar Perfil"}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Achievements Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conquistas</Text>

          {achievements.map((achievement) => (
            <View
              key={achievement.id}
              style={[
                styles.achievementCard,
                achievement.unlocked ? styles.achievementUnlocked : styles.achievementLocked,
              ]}
            >
              <View
                style={[
                  styles.achievementIconContainer,
                  { backgroundColor: achievement.unlocked ? achievement.color : "#CCC" },
                ]}
              >
                <Ionicons name={achievement.icon} size={24} color={achievement.unlocked ? "#FFF" : "#999"} />
              </View>
              <View style={styles.achievementInfo}>
                <Text
                  style={[
                    styles.achievementTitle,
                    achievement.unlocked ? styles.achievementTitleUnlocked : styles.achievementTitleLocked,
                  ]}
                >
                  {achievement.title}
                </Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
                {achievement.progress !== undefined && (
                  <View style={styles.achievementProgressContainer}>
                    <View style={styles.achievementProgressBar}>
                      <View
                        style={[
                          styles.achievementProgress,
                          {
                            width: `${(achievement.progress / achievement.total) * 100}%`,
                            backgroundColor: achievement.color,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.achievementProgressText}>
                      {achievement.progress}/{achievement.total}
                    </Text>
                  </View>
                )}
              </View>
              {achievement.unlocked && (
                <View style={styles.achievementBadge}>
                  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
          <Text style={styles.signOutButtonText}>Sair da Conta</Text>
        </TouchableOpacity>

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
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
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
  avatarSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#4CAF50",
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#4CAF50",
  },
  avatarPlaceholderText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#999",
  },
  avatarOverlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FF6B35",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  avatarOverlayText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingTop: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#F8F9FA",
    color: "#333",
  },
  updateButton: {
    height: 50,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 10,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  achievementCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  achievementUnlocked: {
    backgroundColor: "#F0FFF0",
  },
  achievementLocked: {
    backgroundColor: "#F8F8F8",
  },
  achievementIconContainer: {
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
    marginBottom: 5,
  },
  achievementTitleUnlocked: {
    color: "#333",
  },
  achievementTitleLocked: {
    color: "#999",
  },
  achievementDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  achievementProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  achievementProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    marginRight: 10,
    overflow: "hidden",
  },
  achievementProgress: {
    height: "100%",
    borderRadius: 3,
  },
  achievementProgressText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  achievementBadge: {
    marginLeft: 10,
  },
  signOutButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  signOutButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
})

export default ProfileView
