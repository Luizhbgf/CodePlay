"use client"

import { useState, useEffect } from "react"
import { View, StyleSheet, ActivityIndicator } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { supabase } from "./lib/supabase"
import "react-native-url-polyfill/auto"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"

// Screens
import SplashView from "./app/views/SplashView"
import AuthView from "./app/views/AuthView"
import MainNavigator from "./navigation/MainNavigator"

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

const Stack = createNativeStackNavigator()

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make API calls, etc.
        await new Promise((resolve) => setTimeout(resolve, 1000))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
        await SplashScreen.hideAsync()
      }
    }

    prepare()
  }, [])

  useEffect(() => {
    // Set up the auth state listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    // Clean up the subscription
    return () => subscription.unsubscribe()
  }, [])

  if (!appIsReady || loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="light" backgroundColor="#4CAF50" />
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    )
  }

  return (
    <>
      <StatusBar style="light" backgroundColor="#4CAF50" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {session && session.user ? (
            <Stack.Screen name="Main" component={MainNavigator} initialParams={{ session }} />
          ) : (
            <>
              <Stack.Screen name="Splash" component={SplashView} />
              <Stack.Screen name="Auth" component={AuthView} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
})
