import React from 'react';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import theme from '@/constants/theme';

interface Location {
  id: string;
  name: string;
  state: string;
  image_url?: string;
}

interface LocationCardProps {
  location: Location;
}

const CARD_WIDTH = 200; // Assumed constant for card width

export default function LocationCard({ location }: LocationCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/location/${location.id}`);
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: location.image_url || 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=1000' }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.overlay} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{location.name}</Text>
        <Text style={styles.state}>{location.state}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.2,
    marginRight: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: theme.borderRadius.m,
  },
  textContainer: {
    position: 'absolute',
    bottom: theme.spacing.m,
    left: theme.spacing.m,
    right: theme.spacing.m,
  },
  name: {
    fontSize: theme.fontSizes.l,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 2,
  },
  state: {
    fontSize: theme.fontSizes.s,
    color: Colors.white,
    opacity: 0.9,
  },
});