import { registerRootComponent } from "expo"
import App from "./App"
import { Platform } from "react-native"
import { __DEV__ } from "./constants" // Import __DEV__ from a constants file or declare it

// Configuração para lidar com erros não capturados
if (Platform.OS !== "web" && __DEV__) {
  const originalConsoleError = console.error
  console.error = (...args) => {
    // Evitar que erros de ciclo de vida do React Native quebrem o app
    if (args[0] && typeof args[0] === "string" && args[0].includes("Warning:")) {
      return
    }
    originalConsoleError(...args)
  }
}

// Configuração específica para web
if (Platform.OS === "web") {
  console.log("Inicializando aplicativo CodePlay na web com Supabase...")

  // Adicionar tratamento global de erros para web
  window.addEventListener("error", (event) => {
    console.error("Erro global capturado:", event.error)
    // Evitar que o erro quebre completamente o aplicativo
    event.preventDefault()
  })

  // Adicionar tratamento para promessas não tratadas
  window.addEventListener("unhandledrejection", (event) => {
    console.error("Promessa não tratada:", event.reason)
    // Evitar que o erro quebre completamente o aplicativo
    event.preventDefault()
  })

  // Configuração específica para Supabase na web
  if (typeof window !== "undefined") {
    // Garantir que o localStorage está disponível para o Supabase
    if (!window.localStorage) {
      console.warn("localStorage não disponível, usando fallback")
    }

    // Configurar headers específicos para web se necessário
    window.__SUPABASE_WEB__ = true
  }
}

// Configuração específica para mobile (Expo Go)
if (Platform.OS !== "web") {
  console.log("Inicializando aplicativo CodePlay no mobile com Supabase...")

  // Configurações específicas para mobile
  global.__SUPABASE_MOBILE__ = true

  // Tratamento de deep links para autenticação
  import("expo-linking")
    .then((Linking) => {
      const handleDeepLink = (url) => {
        console.log("Deep link recebido:", url)
        // O tratamento específico será feito no componente Auth
      }

      // Escutar mudanças de URL para deep links
      Linking.addEventListener("url", handleDeepLink)
    })
    .catch((error) => {
      console.warn("Erro ao configurar deep linking:", error)
    })
}

// Configuração global para Supabase
global.__SUPABASE_CONFIG__ = {
  platform: Platform.OS,
  isDev: __DEV__,
  timestamp: new Date().toISOString(),
}

// Log de inicialização
console.log(`CodePlay iniciando em ${Platform.OS} - ${__DEV__ ? "Desenvolvimento" : "Produção"}`)

// Registra o componente raiz
registerRootComponent(App)
