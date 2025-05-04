import React, { useContext } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';
import { AppContext } from '../context/AppContext';

export default function SettingsScreen({ navigation }) {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { logout } = useContext(AppContext);
  
  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: () => logout(),
          style: 'destructive',
        },
      ]
    );
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Configurações</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Aparência</Text>
          
          <View style={[styles.settingItem, { borderBottomColor: theme.border }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="moon" size={24} color={theme.text} style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: theme.text }]}>Modo Escuro</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: '#D1D1D6', true: theme.primary }}
              thumbColor={'#FFFFFF'}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Notificações</Text>
          
          <View style={[styles.settingItem, { borderBottomColor: theme.border }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications" size={24} color={theme.text} style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: theme.text }]}>Lembretes Diários</Text>
            </View>
            <Switch
              value={true}
              trackColor={{ false: '#D1D1D6', true: theme.primary }}
              thumbColor={'#FFFFFF'}
            />
          </View>
          
          <View style={[styles.settingItem, { borderBottomColor: theme.border }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="trophy" size={24} color={theme.text} style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: theme.text }]}>Conquistas</Text>
            </View>
            <Switch
              value={true}
              trackColor={{ false: '#D1D1D6', true: theme.primary }}
              thumbColor={'#FFFFFF'}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Conta</Text>
          
          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: theme.border }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="person" size={24} color={theme.text} style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: theme.text }]}>Editar Perfil</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.placeholder} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: theme.border }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="lock-closed" size={24} color={theme.text} style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: theme.text }]}>Alterar Senha</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.placeholder} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Sobre</Text>
          
          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: theme.border }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="information-circle" size={24} color={theme.text} style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: theme.text }]}>Sobre o App</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.placeholder} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: theme.border }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="help-circle" size={24} color={theme.text} style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: theme.text }]}>Ajuda</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.placeholder} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: theme.border }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="document-text" size={24} color={theme.text} style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: theme.text }]}>Termos de Uso</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.placeholder} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: theme.error + '20' }]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out" size={24} color={theme.error} style={styles.logoutIcon} />
          <Text style={[styles.logoutText, { color: theme.error }]}>Sair da Conta</Text>
        </TouchableOpacity>
        
        <Text style={[styles.versionText, { color: theme.placeholder }]}>
          Versão 1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 15,
  },
  settingText: {
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  versionText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 14,
  },
});