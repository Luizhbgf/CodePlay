import { registerRootComponent } from "expo"
import App from "./App"
import { Platform } from "react-native"
import { isDev } from "./constants" // Import __DEV__ from a constants file or declare it

// Configuração para lidar com erros não capturados
if (Platform.OS !== "web" && isDev) {
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
  console.log("Inicializando aplicativo na web...")

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
}

// Registra o componente raiz
registerRootComponent(App)
