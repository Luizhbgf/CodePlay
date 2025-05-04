import { View, Text, StyleSheet, Platform } from "react-native" // Adicionado Platform aqui
import { StatusBar } from "expo-status-bar"

export default function AppTest() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>Teste de Renderização</Text>
      <Text style={styles.subText}>Se você está vendo esta tela, o React Native está funcionando!</Text>
      <Text style={styles.platformText}>Plataforma atual: {Platform.OS}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#58CC02", // Verde Duolingo
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  subText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  platformText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
})
