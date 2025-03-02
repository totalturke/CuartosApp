import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming an icon library is used

// Theme and Colors (consistent with previous examples)
const theme = {
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  fontSizes: {
    xs: 10,
    s: 12,
    m: 16,
    l: 20,
    xl: 24,
  },
  borderRadius: {
    m: 6,
    l: 8,
  },
};

const Colors = {
  text: '#000000',
  subtext: '#666666',
  border: '#e0e0e0',
  primary: '#007AFF',
  white: '#FFFFFF',
  error: '#FF3B30',
};

type Listing = {
  id: string;
  title: string;
  images: string[];
  description: string;
  price: string;
  bedrooms: number;
};

const ListingDetailScreen = ({ route }: { route: { params: { id: string } } }) => {
  const { id } = route.params; // Assuming this is passed via navigation
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [guestCount, setGuestCount] = useState(1);

  useEffect(() => {
    // Simulate fetching listing details by ID
    setLoading(true);
    setTimeout(() => {
      const mockListing: Listing = {
        id,
        title: 'Cozy Beach House',
        images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300'],
        description: 'A beautiful beach house with stunning ocean views and modern amenities.',
        price: '$200',
        bedrooms: 3,
      };
      setListing(mockListing);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleBook = () => {
    console.log('Booking listing', { id, guestCount });
    // Navigate to booking screen or handle booking logic
  };

  const incrementGuests = () => setGuestCount((prev) => prev + 1);
  const decrementGuests = () => setGuestCount((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading || !listing) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Image Gallery */}
        <ScrollView horizontal style={styles.imageGallery}>
          {listing.images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))}
        </ScrollView>

        {/* Title */}
        <Text style={styles.title}>{listing.title}</Text>

        {/* Description */}
        <Text style={styles.description}>{listing.description}</Text>

        {/* Bedrooms */}
        <View style={styles.detailRow}>
          <Icon name="bed-outline" size={20} color={Colors.text} style={styles.detailIcon} />
          <Text style={styles.detailText}>{listing.bedrooms} Bedroom{listing.bedrooms !== 1 ? 's' : ''}</Text>
        </View>

        {/* Guest Selector */}
        <TouchableOpacity style={styles.guestButton} onPress={() => {}}>
          <View style={styles.guestCountContainer}>
            <Icon name="person-outline" size={20} color={Colors.text} style={styles.guestIcon} />
            <Text style={styles.guestCount}>{guestCount} Guest{guestCount !== 1 ? 's' : ''}</Text>
          </View>
          <View style={styles.guestControls}>
            <TouchableOpacity onPress={decrementGuests}>
              <Icon name="remove-circle-outline" size={24} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={incrementGuests}>
              <Icon name="add-circle-outline" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer with Price and Book Button */}
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{listing.price}</Text>
          <Text style={styles.night}> / night</Text>
        </View>
        <TouchableOpacity style={[styles.bookButton, styles.buttonBase]} onPress={handleBook}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: theme.spacing.l,
  },
  imageGallery: {
    marginBottom: theme.spacing.m,
  },
  image: {
    width: 300,
    height: 200,
    marginRight: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
  },
  title: {
    fontSize: theme.fontSizes.xl,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: theme.spacing.m,
  },
  description: {
    fontSize: theme.fontSizes.m,
    color: Colors.subtext,
    marginBottom: theme.spacing.l,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  detailIcon: {
    marginRight: theme.spacing.s,
  },
  detailText: {
    fontSize: theme.fontSizes.m,
    color: Colors.text,
  },
  guestButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: theme.spacing.m,
  },
  guestButtonText: {
    fontSize: theme.fontSizes.l,
    color: Colors.text,
    fontWeight: '500',
  },
  guestCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.l,
  },
  guestIcon: {
    marginRight: theme.spacing.xs,
  },
  guestCount: {
    fontSize: theme.fontSizes.l,
    color: Colors.text,
    fontWeight: '500',
  },
  guestControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.m,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.white,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: theme.fontSizes.xl,
    fontWeight: '700',
    color: Colors.text,
  },
  night: {
    fontSize: theme.fontSizes.m,
    color: Colors.subtext,
  },
  bookButton: {
    minWidth: 150,
  },
  buttonBase: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    borderRadius: theme.borderRadius.m,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: theme.fontSizes.m,
    fontWeight: '600',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListingDetailScreen;