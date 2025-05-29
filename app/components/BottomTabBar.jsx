import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function BottomTabBar({ navigation, activeScreen }) {
  const screens = [
    { name: "Home", icon: "home", label: "Início" },
    { name: "Leaderboard", icon: "trophy", label: "Ranking" },
    { name: "Practice", icon: "barbell", label: "Praticar" },
    { name: "Profile", icon: "person", label: "Perfil" },
  ]

  return (
    <View style={styles.tabBar}>
      {screens.map((screen) => (
        <TouchableOpacity
          key={screen.name}
          style={styles.tabItem}
          onPress={() => {
            try {
              navigation.navigate(screen.name)
            } catch (error) {
              console.log(`Erro ao navegar para ${screen.name}:`, error)
              // Fallback para Home se a tela não existir
              if (screen.name !== "Home") {
                navigation.navigate("Home")
              }
            }
          }}
        >
          <Ionicons name={screen.icon} size={24} color={activeScreen === screen.name ? "#58CC02" : "#AFAFAF"} />
          <Text
            style={[
              styles.tabLabel,
              {
                color: activeScreen === screen.name ? "#58CC02" : "#AFAFAF",
                fontWeight: activeScreen === screen.name ? "bold" : "normal",
              },
            ]}
          >
            {screen.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    height: 60,
    paddingBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
  },
})
