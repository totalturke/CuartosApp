import React from 'react';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import * as Icons from 'lucide-react-native';
import Colors from '@/constants/colors';
import theme from '@/constants/theme';

interface Property {
  id: string;
  title: string;
  location: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  price_per_night: number;
  rating: number;
  image_url: string;
}

interface PropertyCardProps {
  property: Property;
}

const CARD_WIDTH = 300; // Assumed constant for card width

export default function PropertyCard({ property }: PropertyCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/property/${property.id}`);
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image
        source={{ uri: property.image_url }}
        style={styles.image}
        contentFit="cover"
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {property.title}
          </Text>
          <View style={styles.ratingContainer}>
            <Icons.Star size={16} color={Colors.text} fill={Colors.text} />
            <Text style={styles.rating}>{property.rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={styles.location}>{property.location}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.details}>
            {property.guests} guests · {property.bedrooms} bedrooms · {property.beds} beds · {property.bathrooms} bathrooms
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${property.price_per_night}</Text>
          <Text style={styles.night}> / night</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: Colors.white,
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
    marginRight: theme.spacing.m,
  },
  image: {
    width: '100%',
    height: CARD_WIDTH * 0.75,
  },
  content: {
    padding: theme.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  title: {
    fontSize: theme.fontSizes.l,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: theme.fontSizes.s,
    fontWeight: '600',
    color: Colors.text,
  },
  location: {
    fontSize: theme.fontSizes.s,
    color: Colors.subtext,
    marginBottom: theme.spacing.xs,
  },
  detailsRow: {
    marginBottom: theme.spacing.s,
  },
  details: {
    fontSize: theme.fontSizes.s,
    color: Colors.subtext,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: theme.fontSizes.l,
    fontWeight: '600',
    color: Colors.text,
  },
  night: {
    fontSize: theme.fontSizes.s,
    color: Colors.subtext,
  },
});