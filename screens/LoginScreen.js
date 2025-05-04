"use client"

import { useState } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    try {
      console.log("Tentando fazer login...")

      // Simulação de login bem-sucedido (sem verificação real)
      // Em um app real, você faria a verificação de credenciais aqui

      // Navegação direta para a tela Home
      console.log("Navegando para Home...")
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      Alert.alert("Erro de Login", "Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.", [
        { text: "OK" },
      ])
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.logoContainer}>
          <Ionicons name="school" size={60} color="white" />
        </View>
        <Text style={styles.title}>Bem-vindo ao CodePlay</Text>
        <Text style={styles.subtitle}>Aprenda programação de forma divertida</Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.label}>Usuário</Text>
        <TextInput style={styles.input} placeholder="Digite seu usuário" value={username} onChangeText={setUsername} />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Substituindo Button por TouchableOpacity para mais controle */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.7}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: Platform.OS === "web" ? "row" : "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#58CC02",
  },
  left: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Platform.OS === "web" ? 0 : 24,
  },
  right: {
    flex: 1,
    maxWidth: 400,
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginTop: 8,
  },
  label: {
    marginTop: 12,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 6,
    backgroundColor: "white",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#4CD964",
    borderRadius: 6,
    padding: 14,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
})
