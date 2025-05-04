import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import login from './app/login';
import home from './app/home';
import curso from './app/curso';
import profile from './app/profile';
import lissao from './app/lissao';
import quiz from './app/quiz';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={login} />
        <Stack.Screen name="Home" component={home} />
        <Stack.Screen name="Curso" component={curso} />
        <Stack.Screen name="Profile" component={profile} />
        <Stack.Screen name="Lissao" component={lissao} />
        <Stack.Screen name="Quiz" component={quiz} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}