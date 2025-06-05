"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, StatusBar } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const SettingsView = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true)
  const [soundEffects, setSoundEffects] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)
  const [dailyReminder, setDailyReminder] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(true)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      // Aqui você carregaria as configurações do usuário do Supabase
      // Por enquanto, vamos usar valores padrão
    } catch (error) {
      console.error("Erro ao carregar configurações:", error)
    }
  }

  const saveSettings = async () => {
    try {
      // Aqui você salvaria as configurações no Supabase
      Alert.alert("Sucesso", "Configurações salvas com sucesso!")
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar as configurações")
    }
  }

  const handleDeleteAccount = () => {
    Alert.alert("Excluir Conta", "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            // Aqui você implementaria a exclusão da conta
            Alert.alert("Conta excluída", "Sua conta foi excluída com sucesso")
          } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir a conta")
          }
        },
      },
    ])
  }

  const handleResetProgress = () => {
    Alert.alert(
      "Resetar Progresso",
      "Tem certeza que deseja resetar todo o seu progresso? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Resetar",
          style: "destructive",
          onPress: async () => {
            try {
              // Aqui você implementaria o reset do progresso
              Alert.alert("Progresso resetado", "Seu progresso foi resetado com sucesso")
            } catch (error) {
              Alert.alert("Erro", "Não foi possível resetar o progresso")
            }
          },
        },
      ],
    )
  }

  const SettingItem = ({ icon, title, description, rightComponent, onPress }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={24} color="#4CAF50" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && <Text style={styles.settingDescription}>{description}</Text>}
      </View>
      {rightComponent}
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Notificações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificações</Text>

          <SettingItem
            icon="notifications-outline"
            title="Notificações Push"
            description="Receba lembretes e atualizações"
            rightComponent={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: "#E0E0E0", true: "#4CAF50" }}
                thumbColor="#FFFFFF"
              />
            }
          />

          <SettingItem
            icon="alarm-outline"
            title="Lembrete Diário"
            description="Lembrete para estudar todos os dias"
            rightComponent={
              <Switch
                value={dailyReminder}
                onValueChange={setDailyReminder}
                trackColor={{ false: "#E0E0E0", true: "#4CAF50" }}
                thumbColor="#FFFFFF"
              />
            }
          />

          <SettingItem
            icon="stats-chart-outline"
            title="Relatório Semanal"
            description="Receba um resumo do seu progresso"
            rightComponent={
              <Switch
                value={weeklyReport}
                onValueChange={setWeeklyReport}
                trackColor={{ false: "#E0E0E0", true: "#4CAF50" }}
                thumbColor="#FFFFFF"
              />
            }
          />
        </View>

        {/* Áudio e Visual */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Áudio e Visual</Text>

          <SettingItem
            icon="volume-high-outline"
            title="Efeitos Sonoros"
            description="Sons de feedback e interação"
            rightComponent={
              <Switch
                value={soundEffects}
                onValueChange={setSoundEffects}
                trackColor={{ false: "#E0E0E0", true: "#4CAF50" }}
                thumbColor="#FFFFFF"
              />
            }
          />

          <SettingItem
            icon="moon-outline"
            title="Modo Escuro"
            description="Interface com tema escuro"
            rightComponent={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: "#E0E0E0", true: "#4CAF50" }}
                thumbColor="#FFFFFF"
              />
            }
          />

          <SettingItem
            icon="play-outline"
            title="Reprodução Automática"
            description="Avançar automaticamente após resposta correta"
            rightComponent={
              <Switch
                value={autoPlay}
                onValueChange={setAutoPlay}
                trackColor={{ false: "#E0E0E0", true: "#4CAF50" }}
                thumbColor="#FFFFFF"
              />
            }
          />
        </View>

        {/* Conta */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conta</Text>

          <SettingItem
            icon="save-outline"
            title="Salvar Configurações"
            description="Salvar todas as alterações"
            rightComponent={<Ionicons name="chevron-forward" size={20} color="#CCC" />}
            onPress={saveSettings}
          />

          <SettingItem
            icon="refresh-outline"
            title="Resetar Progresso"
            description="Apagar todo o progresso e começar do zero"
            rightComponent={<Ionicons name="chevron-forward" size={20} color="#CCC" />}
            onPress={handleResetProgress}
          />

          <SettingItem
            icon="help-circle-outline"
            title="Ajuda e Suporte"
            description="Central de ajuda e contato"
            rightComponent={<Ionicons name="chevron-forward" size={20} color="#CCC" />}
            onPress={() => Alert.alert("Ajuda", "Em breve teremos uma central de ajuda completa!")}
          />

          <SettingItem
            icon="document-text-outline"
            title="Termos de Uso"
            description="Leia nossos termos e condições"
            rightComponent={<Ionicons name="chevron-forward" size={20} color="#CCC" />}
            onPress={() => Alert.alert("Termos", "Termos de uso em desenvolvimento")}
          />

          <SettingItem
            icon="shield-checkmark-outline"
            title="Política de Privacidade"
            description="Como protegemos seus dados"
            rightComponent={<Ionicons name="chevron-forward" size={20} color="#CCC" />}
            onPress={() => Alert.alert("Privacidade", "Política de privacidade em desenvolvimento")}
          />
        </View>

        {/* Zona de Perigo */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, styles.dangerTitle]}>Zona de Perigo</Text>

          <TouchableOpacity style={[styles.settingItem, styles.dangerItem]} onPress={handleDeleteAccount}>
            <View style={[styles.settingIcon, styles.dangerIcon]}>
              <Ionicons name="trash-outline" size={24} color="#FF6B35" />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, styles.dangerText]}>Excluir Conta</Text>
              <Text style={styles.settingDescription}>Esta ação não pode ser desfeita</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FF6B35" />
          </TouchableOpacity>
        </View>

        {/* Informações do App */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre</Text>

          <View style={styles.appInfo}>
            <Text style={styles.appName}>CodePlay</Text>
            <Text style={styles.appVersion}>Versão 1.0.0</Text>
            <Text style={styles.appDescription}>Aprenda programação de forma divertida e interativa</Text>
          </View>
        </View>

        {/* Spacing for bottom tabs */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  dangerTitle: {
    color: "#FF6B35",
  },
  settingItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dangerItem: {
    borderLeftWidth: 4,
    borderLeftColor: "#FF6B35",
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0FFF0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  dangerIcon: {
    backgroundColor: "#FFF0F0",
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  dangerText: {
    color: "#FF6B35",
  },
  settingDescription: {
    fontSize: 14,
    color: "#666",
  },
  appInfo: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 5,
  },
  appVersion: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  appDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
})

export default SettingsView
