import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import { Amenity } from '@/types';
import Colors from '@/constants/colors';
import theme from '@/constants/theme';

// Interface for AmenityItem props
interface AmenityItemProps {
  amenity: Amenity;
}

// Translation of amenity names
const translateAmenityName = (name: string): string => {
  const translations: Record<string, string> = {
    'WiFi': 'WiFi',
    'Air Conditioning': 'Aire Acondicionado',
    'Kitchen': 'Cocina',
    'Pool': 'Piscina',
    'Hot Tub': 'Jacuzzi',
    'Free Parking': 'Estacionamiento Gratuito',
    'TV': 'TV',
    'Washer': 'Lavadora',
    'Dryer': 'Secadora',
    'Workspace': 'Espacio de Trabajo',
    'Pets Allowed': 'Mascotas Permitidas'
  };
  
  return translations[name] || name;
};

export default function AmenityItem({ amenity }: AmenityItemProps) {
  // Dynamically get the icon component
  const IconComponent = (Icons as any)[amenity.icon.charAt(0).toUpperCase() + amenity.icon.slice(1)] || Icons.Check;
  
  return (
    <View style={styles.container}>
      <IconComponent size={20} color={Colors.text} />
      <Text style={styles.text}>{translateAmenityName(amenity.name)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.xs,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: Colors.card,
    borderRadius: theme.borderRadius.m,
  },
  text: {
    marginLeft: theme.spacing.s,
    fontSize: theme.fontSizes.m,
    color: Colors.text,
  },
});