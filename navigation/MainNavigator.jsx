import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

// Screens
import HomeView from "../app/views/HomeView"
import CoursesView from "../app/views/CoursesView"
import RankingView from "../app/views/RankingView"
import ProfileView from "../app/views/ProfileView"
import QuizView from "../app/views/QuizView"
import PracticeView from "../app/views/PracticeView"
import SettingsView from "../app/views/SettingsView"

// Icons - Updated for Expo SDK 53
import { Ionicons } from "@expo/vector-icons"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

// Stack navigators for each tab
const HomeStack = ({ route }) => {
  const { session } = route.params

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeView}
        initialParams={{ session }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizView}
        options={{
          headerTitle: "Quiz",
          headerStyle: { backgroundColor: "#4CAF50" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Practice"
        component={PracticeView}
        options={{
          headerTitle: "Praticar",
          headerStyle: { backgroundColor: "#4CAF50" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  )
}

const CoursesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="CoursesScreen" component={CoursesView} options={{ headerShown: false }} />
    <Stack.Screen
      name="Quiz"
      component={QuizView}
      options={{
        headerTitle: "Quiz",
        headerStyle: { backgroundColor: "#4CAF50" },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
  </Stack.Navigator>
)

const ProfileStack = ({ route }) => {
  const { session } = route.params

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileView}
        initialParams={{ session }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsView}
        options={{
          headerTitle: "Configurações",
          headerStyle: { backgroundColor: "#4CAF50" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  )
}

const MainNavigator = ({ route }) => {
  const { session } = route.params

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Cursos") {
            iconName = focused ? "book" : "book-outline"
          } else if (route.name === "Ranking") {
            iconName = focused ? "trophy" : "trophy-outline"
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E0E0E0",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} initialParams={{ session }} />
      <Tab.Screen name="Cursos" component={CoursesStack} />
      <Tab.Screen name="Ranking" component={RankingView} />
      <Tab.Screen name="Perfil" component={ProfileStack} initialParams={{ session }} />
    </Tab.Navigator>
  )
}

export default MainNavigator
