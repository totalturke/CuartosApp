import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming an icon library is used

// Theme and Colors (consistent with previous examples, expanded as needed)
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
  black: '#000000', // Added for shadow
};

type Listing = {
  id: string;
  title: string;
  image: string;
  price: string;
};

const MyListingsScreen = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user's listings
    setLoading(true);
    setTimeout(() => {
      const mockListings: Listing[] = [
        { id: '1', title: 'Cozy Cabin', image: 'https://via.placeholder.com/150', price: '$100' },
        { id: '2', title: 'Beach House', image: 'https://via.placeholder.com/150', price: '$200' },
      ];
      setListings(mockListings); // Replace with empty array to test empty state
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateListing = () => {
    console.log('Navigate to create listing screen');
    // Navigate to CreateScreen
  };

  const handleEditListing = (id: string) => {
    console.log('Edit listing', id);
    // Navigate to EditScreen with id
  };

  const renderListingItem = ({ item }: { item: Listing }) => (
    <View style={styles.listingItem}>
      <Image source={{ uri: item.image }} style={styles.listingImage} />
      <View style={styles.listingDetails}>
        <Text style={styles.listingTitle}>{item.title}</Text>
        <Text style={styles.listingPrice}>{item.price} / night</Text>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleEditListing(item.id)}>
          <Icon name="pencil-outline" size={16} color={Colors.white} />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {listings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Listings Yet</Text>
          <Text style={styles.emptyText}>
            Start by creating your first listing to share with the world!
          </Text>
          <TouchableOpacity style={[styles.createButton, styles.buttonBase]} onPress={handleCreateListing}>
            <Text style={styles.buttonText}>Create Listing</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={listings}
          renderItem={renderListingItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity style={styles.floatingButton} onPress={handleCreateListing}>
          <Icon name="add" size={24} color={Colors.white} />
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
  listContainer: {
    padding: theme.spacing.l,
  },
  listingItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.m,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
  },
  listingImage: {
    width: 100,
    height: 100,
  },
  listingDetails: {
    flex: 1,
    padding: theme.spacing.m,
  },
  listingTitle: {
    fontSize: theme.fontSizes.m,
    color: Colors.text,
    fontWeight: '600',
  },
  listingPrice: {
    fontSize: theme.fontSizes.s,
    color: Colors.subtext,
    marginVertical: theme.spacing.s,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.s,
    borderRadius: theme.borderRadius.m,
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: theme.fontSizes.s,
    fontWeight: '500',
    marginLeft: theme.spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: theme.spacing.m,
  },
  emptyText: {
    fontSize: theme.fontSizes.m,
    color: Colors.subtext,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  createButton: {
    minWidth: 200,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: theme.spacing.l,
    right: theme.spacing.l,
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default MyListingsScreen;