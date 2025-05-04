import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { View, Text, TouchableOpacity } from "react-native"

// Importações diretas para evitar problemas com require
import LoginScreen from "./screens/LoginScreen"

// Importações condicionais para os outros componentes
let HomeScreen, CourseIntroScreen, ProfileScreen, LessonScreen, QuizScreen, LeaderboardScreen, PracticeScreen

// Componente de fallback para quando as telas não podem ser carregadas
const FallbackScreen = ({ navigation, route }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
    <Text style={{ fontSize: 18, textAlign: "center", marginBottom: 20 }}>Erro ao carregar a tela: {route.name}</Text>
    <Text style={{ fontSize: 16, color: "#666", textAlign: "center", marginBottom: 30 }}>
      Verifique se o arquivo existe e está exportando corretamente o componente.
    </Text>
    <TouchableOpacity
      style={{
        backgroundColor: "#58CC02",
        padding: 15,
        borderRadius: 10,
      }}
      onPress={() => navigation.navigate("Login")}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>Voltar para Login</Text>
    </TouchableOpacity>
  </View>
)

// Tentativa de importar os outros componentes
try {
  HomeScreen = require("./screens/HomeScreen").default || FallbackScreen
} catch (error) {
  console.log("Erro ao importar HomeScreen:", error.message)
  HomeScreen = FallbackScreen
}

try {
  CourseIntroScreen = require("./screens/CourseIntroScreen").default || FallbackScreen
} catch (error) {
  console.log("Erro ao importar CourseIntroScreen:", error.message)
  CourseIntroScreen = FallbackScreen
}

try {
  ProfileScreen = require("./screens/ProfileScreen").default || FallbackScreen
} catch (error) {
  console.log("Erro ao importar ProfileScreen:", error.message)
  ProfileScreen = FallbackScreen
}

try {
  LessonScreen = require("./screens/LessonScreen").default || FallbackScreen
} catch (error) {
  console.log("Erro ao importar LessonScreen:", error.message)
  LessonScreen = FallbackScreen
}

try {
  QuizScreen = require("./screens/QuizScreen").default || FallbackScreen
} catch (error) {
  console.log("Erro ao importar QuizScreen:", error.message)
  QuizScreen = FallbackScreen
}

try {
  LeaderboardScreen = require("./screens/LeaderboardScreen").default || FallbackScreen
} catch (error) {
  console.log("Erro ao importar LeaderboardScreen:", error.message)
  LeaderboardScreen = FallbackScreen
}

try {
  PracticeScreen = require("./screens/PracticeScreen").default || FallbackScreen
} catch (error) {
  console.log("Erro ao importar PracticeScreen:", error.message)
  PracticeScreen = FallbackScreen
}

const Stack = createNativeStackNavigator()

export default function App() {
  console.log("App renderizado")
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CourseIntro" component={CourseIntroScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Lesson" component={LessonScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
        <Stack.Screen name="Practice" component={PracticeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
