"use client"

import { useEffect, useRef } from "react"
import { Text, StyleSheet, Animated, Easing } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { StatusBar } from "expo-status-bar"

const SplashView = ({ navigation }) => {
  const scaleValue = useRef(new Animated.Value(0.8)).current
  const opacityValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 800,
          easing: Easing.elastic(1),
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1000),
    ]).start(() => {
      navigation.replace("Auth")
    })
  }, [scaleValue, opacityValue, navigation])

  return (
    <LinearGradient
      colors={["#4CAF50", "#45a049", "#2E7D32"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar style="light" backgroundColor="#4CAF50" />
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: scaleValue }],
            opacity: opacityValue,
          },
        ]}
      >
        <Text style={styles.logoEmoji}>🚀</Text>
        <Text style={styles.logoText}>CodePlay</Text>
        <Text style={styles.tagline}>Aprenda programação jogando</Text>
      </Animated.View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logoEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  tagline: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.9)",
  },
})

export default SplashView
