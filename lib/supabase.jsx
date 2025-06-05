import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"
import { SUPABASE_CONFIG, PLATFORM_CONFIG } from "../constants"

// Use the configuration from constants
const supabaseUrl = SUPABASE_CONFIG.url
const supabaseAnonKey = SUPABASE_CONFIG.anonKey

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: PLATFORM_CONFIG.isWeb ? undefined : AsyncStorage,
    autoRefreshToken: SUPABASE_CONFIG.auth.autoRefreshToken,
    persistSession: SUPABASE_CONFIG.auth.persistSession,
    detectSessionInUrl: SUPABASE_CONFIG.auth.detectSessionInUrl,
  },
})

// Log de inicialização do Supabase
console.log(`Supabase inicializado para ${PLATFORM_CONFIG.isWeb ? "web" : "mobile"}`)
