"use client"

import { useState } from "react"
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { StatusBar } from "expo-status-bar"
import { supabase } from "../../lib/supabase"
import { REDIRECT_URLS, __DEV__ } from "../../constants"
import * as WebBrowser from "expo-web-browser"
import * as QueryParams from "expo-auth-session/build/QueryParams"

// Required for web browser auth
WebBrowser.maybeCompleteAuthSession()

const { width, height } = Dimensions.get("window")

const AuthView = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  // Get the redirect URL based on environment
  const redirectTo = __DEV__ ? REDIRECT_URLS.development : REDIRECT_URLS.production

  // Handle session from URL after OAuth or magic link authentication
  const createSessionFromUrl = async (url) => {
    try {
      const { params, errorCode } = QueryParams.getQueryParams(url)
      if (errorCode) throw new Error(errorCode)

      const { access_token, refresh_token } = params
      if (!access_token) return

      const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      })

      if (error) throw error
      return data.session
    } catch (error) {
      Alert.alert("Erro", error.message)
    }
  }

  // Sign in with email and password
  const handleSignIn = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
    } catch (error) {
      Alert.alert("Erro ao fazer login", error.message)
    } finally {
      setLoading(false)
    }
  }

  // Sign up with email and password
  const handleSignUp = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectTo,
        },
      })

      if (error) throw error
      Alert.alert("Verifique seu email", "Enviamos um link de confirmação!")
    } catch (error) {
      Alert.alert("Erro ao criar conta", error.message)
    } finally {
      setLoading(false)
    }
  }

  // Sign in with magic link
  const handleMagicLink = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
        },
      })

      if (error) throw error
      Alert.alert("Verifique seu email", "Enviamos um link mágico!")
    } catch (error) {
      Alert.alert("Erro", error.message)
    } finally {
      setLoading(false)
    }
  }

  // Sign in with OAuth (GitHub example)
  const handleOAuth = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo,
          skipBrowserRedirect: true,
        },
      })

      if (error) throw error

      if (Platform.OS === "web") {
        window.location.href = data?.url
      } else {
        const res = await WebBrowser.openAuthSessionAsync(data?.url ?? "", redirectTo)

        if (res.type === "success") {
          const { url } = res
          await createSessionFromUrl(url)
        }
      }
    } catch (error) {
      Alert.alert("Erro", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#4CAF50" />

      <LinearGradient
        colors={["#4CAF50", "#45a049", "#2E7D32"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>🚀</Text>
            </View>
            <Text style={styles.title}>CodePlay</Text>
            <Text style={styles.subtitle}>
              {isSignUp ? "Crie sua conta e comece a aprender!" : "Bem-vindo de volta!"}
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {/* Primary Action Button */}
            <TouchableOpacity
              style={[styles.primaryButton, loading && styles.buttonDisabled]}
              onPress={isSignUp ? handleSignUp : handleSignIn}
              disabled={loading}
            >
              <LinearGradient
                colors={["#FF6B35", "#F7931E"]}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.primaryButtonText}>
                  {loading ? "Carregando..." : isSignUp ? "Criar Conta" : "Entrar"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Toggle Sign Up/Sign In */}
            <TouchableOpacity style={styles.toggleButton} onPress={() => setIsSignUp(!isSignUp)}>
              <Text style={styles.toggleText}>
                {isSignUp ? "Já tem uma conta? " : "Não tem uma conta? "}
                <Text style={styles.toggleTextBold}>{isSignUp ? "Fazer Login" : "Criar Conta"}</Text>
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Magic Link Button */}
            <TouchableOpacity
              style={[styles.secondaryButton, loading && styles.buttonDisabled]}
              onPress={handleMagicLink}
              disabled={loading}
            >
              <Text style={styles.secondaryButtonText}>✨ Link Mágico</Text>
            </TouchableOpacity>

            {/* GitHub OAuth Button */}
            <TouchableOpacity
              style={[styles.githubButton, loading && styles.buttonDisabled]}
              onPress={handleOAuth}
              disabled={loading}
            >
              <Text style={styles.githubButtonText}>🐙 Continuar com GitHub</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Ao continuar, você concorda com nossos{"\n"}
              <Text style={styles.footerLink}>Termos de Uso</Text> e{" "}
              <Text style={styles.footerLink}>Política de Privacidade</Text>
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    lineHeight: 22,
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#F8F9FA",
    color: "#333",
  },
  primaryButton: {
    height: 56,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  buttonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleButton: {
    alignItems: "center",
    marginBottom: 24,
  },
  toggleText: {
    fontSize: 14,
    color: "#666",
  },
  toggleTextBold: {
    fontWeight: "bold",
    color: "#4CAF50",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: "#999",
  },
  secondaryButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  githubButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#24292e",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  githubButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  footer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    lineHeight: 18,
  },
  footerLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
})

export default AuthView
