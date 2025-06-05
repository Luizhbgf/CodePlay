import { Platform } from "react-native"

// Definir __DEV__ baseado no ambiente - Updated for SDK 53
export const __DEV__ = typeof __DEV__ !== "undefined" ? __DEV__ : process.env.NODE_ENV === "development"

// Outras constantes úteis para o projeto
export const PLATFORM_CONFIG = {
  isWeb: Platform.OS === "web",
  isMobile: Platform.OS !== "web",
  isIOS: Platform.OS === "ios",
  isAndroid: Platform.OS === "android",
}

// Configurações específicas do Supabase
export const SUPABASE_CONFIG = {
  // Essas URLs serão substituídas pelas suas reais
  url: "https://sovxjamzjjteckdolwvs.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvdnhqYW16amp0ZWNrZG9sd3ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NzA1NDIsImV4cCI6MjA2NDE0NjU0Mn0.3wI8E-2QWGRDhTleWRHM6eEyfj1B5uUTp2xEE2UItoc", // Substitua pela sua chave real

  // Configurações de autenticação
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === "web",
  },

  // Configurações de storage
  storage: {
    buckets: {
      avatars: "avatars",
      uploads: "uploads",
    },
  },
}

// URLs de redirecionamento para autenticação
export const REDIRECT_URLS = {
  development: Platform.OS === "web" ? "http://localhost:8081" : "codeplay://",
  production: Platform.OS === "web" ? "https://your-domain.com" : "codeplay://",
}

// Configurações de deep linking
export const DEEP_LINK_CONFIG = {
  scheme: "codeplay",
  prefixes: ["codeplay://", "https://your-domain.com"],
}

export default {
  __DEV__,
  PLATFORM_CONFIG,
  SUPABASE_CONFIG,
  REDIRECT_URLS,
  DEEP_LINK_CONFIG,
}
