import React, { useState, useRef, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import BottomTabBar from "../components/BottomTabBar"
import * as ImagePicker from 'expo-image-picker';
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'


export default function ProfileScreen({ navigation }) {
  const { darkMode } = useContext(ThemeContext)
  const [streakDays, setStreakDays] = useState(5)
  const [totalXP, setTotalXP] = useState(430)
  const [level, setLevel] = useState(4)
  const [settingsVisible, setSettingsVisible] = useState(false)
  const slideAnim = useRef(new Animated.Value(300)).current // começa fora da tela (painel tem 250px + margem)
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (settingsVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [settingsVisible])

  // Dados das conquistas

  const pickImage = async () => {
    // Solicita permissão
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos da permissão para acessar as fotos!');
      return;
    }

    // Abre a galeria
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

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
    <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? '#121212' : '#fff' }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
        <TouchableOpacity onPress={() => setSettingsVisible(true)}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarLetter}>J</Text>
            )}
          </TouchableOpacity>
          <Text style={[styles.userName, { color: darkMode ? '#fff' : '#333' }]}>João</Text>
          <View style={styles.levelContainer}>
            <Text style={styles.levelText} >Nível {level}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="flame" size={24} color="#FF9500" />
              <Text style={[styles.statValue, { color: darkMode ? '#fff' : '#333' }]}>{streakDays}</Text>
              <Text style={[styles.statLabel, { color: darkMode ? '#fff' : '#333' }]}>Dias</Text>
            </View>

            <View style={styles.statItem}>
              <Ionicons name="star" size={24} color="#FFCC00" />
              <Text style={[styles.statValue, { color: darkMode ? '#fff' : '#333' }]}>{totalXP}</Text>
              <Text style={[styles.statLabel, { color: darkMode ? '#fff' : '#333' }]}>XP Total</Text>
            </View>

            <View style={styles.statItem}>
              <Ionicons name="trophy" size={24} color="#58CC02" />
              <Text style={[styles.statValue, { color: darkMode ? '#fff' : '#333' }]}>{achievements.filter((a) => a.unlocked).length}</Text>
              <Text style={[styles.statLabel, { color: darkMode ? '#fff' : '#333' }]}>Conquistas</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: darkMode ? '#fff' : '#333' }]}>Conquistas</Text>

          {achievements.map((achievement) => (
            <View
              key={achievement.id}
              style={[
                styles.achievementCard,
                {
                  opacity: achievement.unlocked ? 1 : 0.7,
                  backgroundColor: darkMode ? '#333' : 'white',
                },
              ]}
            >
              <View style={[styles.achievementIcon, { backgroundColor: achievement.color }]}>
                <Ionicons name={achievement.icon} size={24} color="white" />
              </View>

              <View style={styles.achievementInfo}>
                <Text style={[styles.achievementTitle, { color: darkMode ? '#fff' : '#333' }]}>
                  {achievement.title}
                  {achievement.unlocked && <Ionicons name="checkmark-circle" size={16} color="#58CC02" style={{ marginLeft: 5 }} />}
                </Text>
                <Text style={[styles.achievementDescription, { color: darkMode ? '#fff' : '#333' }]}>{achievement.description}</Text>

                {!achievement.unlocked && achievement.progress && (
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFilled, { width: `${achievement.progress * 100}%` }]} />
                  </View>
                )}
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => {
              console.log("Navegando para AchievementsScreen...")
              navigation.navigate("Achievements")
            }}
          >
            <Text style={styles.viewAllText}>Ver todas as conquistas</Text>
            <Ionicons name="chevron-forward" size={20} color="#58CC02" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estatísticas</Text>

          <View style={[styles.statsCard, { backgroundColor: darkMode ? '#333' : 'white' }]}>
            <View style={styles.statRow}>
              <Text style={[styles.statTitle, { color: darkMode ? '#fff' : '#333' }]}>Dias de sequência atual</Text>
              <Text style={[styles.statNumber, { color: darkMode ? '#fff' : '#333' }]}>{streakDays}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={[styles.statTitle, { color: darkMode ? '#fff' : '#333' }]}>Maior sequência</Text>
              <Text style={[styles.statNumber, { color: darkMode ? '#fff' : '#333' }]}>7</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={[styles.statTitle, { color: darkMode ? '#fff' : '#333' }]}>Lições completadas</Text>
              <Text style={[styles.statNumber, { color: darkMode ? '#fff' : '#333' }]}>12</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={[styles.statTitle, { color: darkMode ? '#fff' : '#333' }]}>Exercícios perfeitos</Text>
              <Text style={[styles.statNumber, { color: darkMode ? '#fff' : '#333' }]}>8</Text>
            </View>
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      <BottomTabBar navigation={navigation} activeScreen="Profile" />
      {settingsVisible && (
        <View style={[styles.overlay, { display: settingsVisible ? "flex" : "flex" }]}>
          <TouchableOpacity style={styles.overlayBackground} onPress={() => setSettingsVisible(false)} />
          <Animated.View style={[styles.settingsPanel, { transform: [{ translateX: slideAnim }] }]}>
            <Text style={styles.settingsTitle}>Configurações</Text>

            <TouchableOpacity style={styles.settingsItem}>
              <Ionicons name="language" size={20} color="#333" style={styles.settingsIcon} />
              <Text style={styles.settingsText}>Idioma</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsItem}>
              <Ionicons name="color-palette" size={20} color="#333" style={styles.settingsIcon} />
              <Text style={styles.settingsText}>Tema</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsItem} onPress={() => {
              console.log("Sair clicado");
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            }}>
              <Ionicons name="log-out" size={20} color="#333" style={styles.settingsIcon} />
              <Text style={styles.settingsText}>Sair</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
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
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
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
     width: 80,
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
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    zIndex: 10,
  },
  overlayBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  settingsPanel: {
    width: 250,
    backgroundColor: "#fff",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingsIcon: {
    marginRight: 15,
  },
  settingsText: {
    fontSize: 16,
    color: "#333",
  },
})

