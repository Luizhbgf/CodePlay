import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function LoginScreen({ navigation }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // Animações
  const headerHeight = useRef(new Animated.Value(180)).current
  const logoSize = useRef(new Animated.Value(36)).current

  const handleLogin = () => {
    try {
      console.log("Tentando fazer login...")

      // Navegação direta para a tela Home
      console.log("Navegando para Home...")
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      Alert.alert(
        "Erro de Login",
        "Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.",
        [{ text: "OK" }]
      )
    }
  }

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerHeight, {
        toValue: isSignUp ? 220 : 180,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(logoSize, {
        toValue: isSignUp ? 50 : 36,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start()
  }, [isSignUp])

  return (
    <View style={styles.container}>
      {/* Header animado */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.View>
          <Ionicons name="school" size={50} color="white" />
        </Animated.View>
        <Text style={styles.headerText}>CodePlay</Text>
        <Text style={styles.headerSubtext}>Aprenda programação com diversão!</Text>
      </Animated.View>

      {/* Formulário */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>{isSignUp ? "Cadastre-se" : "Entrar"}</Text>

        {isSignUp && (
          <>
            <TextInput style={styles.input} placeholder="Primeiro nome" placeholderTextColor="#999" />
            <TextInput style={styles.input} placeholder="Sobrenome" placeholderTextColor="#999" />
          </>
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#999"
        />

        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            secureTextEntry
            placeholderTextColor="#999"
          />
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={isSignUp ? () => {} : handleLogin}
        >
          <Text style={styles.buttonText}>{isSignUp ? "Cadastro" : "Entrar"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
          <Text style={styles.switchText}>
            {isSignUp
              ? "Já tem uma conta? Entrar"
              : "Não tem uma conta? Cadastre-se"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
  },
  header: {
    backgroundColor: "#58CC02",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 50,
  },
  headerText: {
    color: "#fff",
    fontSize: 26,
    marginTop: 8,
    fontWeight: "bold",
  },
  headerSubtext: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 40,
  },
  formContainer: {
    padding: 24,
    marginTop: -40,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#151515",
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#58CC02",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  switchText: {
    color: "#555",
    textAlign: "center",
  },
})
