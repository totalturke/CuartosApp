import React from 'react';
import { Tabs } from 'expo-router';
import {
  Home,
  Search,
  Calendar,
  Heart,
  User
} from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{
        title: 'Inicio',
        tabBarIcon: ({ color, size }) => (
          <Home size={size} color={color} />
        ),
      }} />

      <Tabs.Screen name="search" options={{
        title: 'Explorar',
        tabBarIcon: ({ color, size }) => (
          <Search size={size} color={color} />
        ),
      }} />

      <Tabs.Screen name="bookings" options={{
        title: 'Viajes',
        tabBarIcon: ({ color, size }) => (
          <Calendar size={size} color={color} />
        ),
      }} />

      <Tabs.Screen name="favorites" options={{
        title: 'Guardados',
        tabBarIcon: ({ color, size }) => (
          <Heart size={size} color={color} />
        ),
      }} />

      <Tabs.Screen name="profile" options={{
        title: 'Perfil',
        tabBarIcon: ({ color, size }) => (
          <User size={size} color={color} />
        ),
      }} />
    </Tabs>
  );
}
