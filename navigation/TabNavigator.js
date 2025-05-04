import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';
import { AppContext } from '../context/AppContext';

// Importar telas
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CourseIntroScreen from '../screens/CourseIntroScreen';
import LessonScreen from '../screens/LessonScreen';
import QuizScreen from '../screens/QuizScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';

// Criar navegadores
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const AchievementsStack = createNativeStackNavigator();
const LeaderboardStack = createNativeStackNavigator();

// Navegador da tela inicial
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="CourseIntro" component={CourseIntroScreen} />
      <HomeStack.Screen name="Lesson" component={LessonScreen} />
      <HomeStack.Screen name="Quiz" component={QuizScreen} />
    </HomeStack.Navigator>
  );
};

// Navegador do perfil
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    </ProfileStack.Navigator>
  );
};

// Navegador de conquistas
const AchievementsStackNavigator = () => {
  return (
    <AchievementsStack.Navigator screenOptions={{ headerShown: false }}>
      <AchievementsStack.Screen name="AchievementsMain" component={AchievementsScreen} />
    </AchievementsStack.Navigator>
  );
};

// Navegador de classificação
const LeaderboardStackNavigator = () => {
  return (
    <LeaderboardStack.Navigator screenOptions={{ headerShown: false }}>
      <LeaderboardStack.Screen name="LeaderboardMain" component={LeaderboardScreen} />
    </LeaderboardStack.Navigator>
  );
};

// Componente personalizado para a barra de abas
const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { userPoints } = useContext(AppContext);
  
  return (
    <View style={[styles.tabContainer, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Definir ícone com base na rota
        let iconName;
        let IconComponent = Ionicons;
        
        if (route.name === 'Home') {
          iconName = isFocused ? 'home' : 'home-outline';
        } else if (route.name === 'Achievements') {
          iconName = isFocused ? 'trophy' : 'trophy-outline';
          IconComponent = FontAwesome5;
        } else if (route.name === 'Leaderboard') {
          iconName = isFocused ? 'podium' : 'podium-outline';
        } else if (route.name === 'Profile') {
          iconName = isFocused ? 'person' : 'person-outline';
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabButton}
            activeOpacity={0.7}
          >
            <View style={[
              styles.iconContainer, 
              isFocused && { backgroundColor: theme.primary + '20' }
            ]}>
              <IconComponent 
                name={iconName} 
                size={24} 
                color={isFocused ? theme.primary : theme.placeholder} 
              />
            </View>
            <Text style={[
              styles.tabLabel, 
              { color: isFocused ? theme.primary : theme.placeholder }
            ]}>
              {label}
            </Text>
            
            {route.name === 'Profile' && (
              <View style={[styles.pointsBadge, { backgroundColor: theme.accent }]}>
                <Text style={styles.pointsText}>{userPoints} XP</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Navegador principal de abas
const TabNavigator = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: theme.card,
          borderTopColor: theme.border,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.placeholder,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStackNavigator} 
        options={{
          tabBarLabel: 'Início',
        }}
      />
      <Tab.Screen 
        name="Achievements" 
        component={AchievementsStackNavigator} 
        options={{
          tabBarLabel: 'Conquistas',
        }}
      />
      <Tab.Screen 
        name="Leaderboard" 
        component={LeaderboardStackNavigator} 
        options={{
          tabBarLabel: 'Ranking',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStackNavigator} 
        options={{
          tabBarLabel: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    borderTopWidth: 1,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  iconContainer: {
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  pointsBadge: {
    position: 'absolute',
    top: 0,
    right: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  pointsText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default TabNavigator;