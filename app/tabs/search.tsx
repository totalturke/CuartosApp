import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
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
  },
  borderRadius: {
    m: 6, // Added for applyButton
    l: 8,
  },
};

const Colors = {
  text: '#000000',
  subtext: '#666666',
  primary: '#007AFF',
  white: '#FFFFFF',
  card: '#f0f0f0',
};

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate initial data fetch or setup
    console.log('Search screen mounted');
  }, []);

  const handleSearch = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        { id: '1', title: 'Result 1' },
        { id: '2', title: 'Result 2' },
        { id: '3', title: 'Result 3' },
      ];
      setResults(mockResults);
      setLoading(false);
    }, 1000);
  };

  const incrementGuests = () => setGuestCount((prev) => prev + 1);
  const decrementGuests = () => setGuestCount((prev) => (prev > 1 ? prev - 1 : 1));

  const renderResultItem = ({ item }) => (
    <View style={styles.resultItem}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Guest Selector */}
      <View style={styles.guestCountContainer}>
        <Icon name="person-outline" size={20} color={Colors.text} style={styles.guestIcon} />
        <Text style={styles.guestCount}>{guestCount} Guest{guestCount !== 1 ? 's' : ''}</Text>
        <View style={styles.guestControls}>
          <TouchableOpacity onPress={decrementGuests}>
            <Icon name="remove-circle-outline" size={24} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={incrementGuests}>
            <Icon name="add-circle-outline" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Apply Button */}
      <TouchableOpacity style={styles.applyButton} onPress={handleSearch}>
        <Icon name="search-outline" size={20} color={Colors.white} />
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>

      {/* Results */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Search Results</Text>
        {loading ? (
          <ActivityIndicator style={styles.loader} size="large" color={Colors.primary} />
        ) : (
          <FlatList
            data={results}
            renderItem={renderResultItem}
            keyExtractor={(item) => item.id}
            style={styles.resultsList}
            ListEmptyComponent={<Text>No results found</Text>}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    margin: theme.spacing.m,
    padding: theme.spacing.s,
    borderWidth: 1,
    borderColor: Colors.subtext,
    borderRadius: theme.borderRadius.m,
    fontSize: theme.fontSizes.m,
  },
  guestCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
  },
  guestIcon: {
    marginRight: theme.spacing.xs,
  },
  guestCount: {
    fontSize: theme.fontSizes.m,
    color: Colors.text,
    fontWeight: '500',
  },
  guestControls: {
    flexDirection: 'row',
    marginLeft: theme.spacing.m,
  },
  applyButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing.m,
  },
  applyButtonText: {
    color: Colors.white,
    fontWeight: '600',
    marginLeft: theme.spacing.xs,
  },
  resultsContainer: {
    flex: 1,
    padding: theme.spacing.m,
  },
  resultsTitle: {
    fontSize: theme.fontSizes.l,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: theme.spacing.m,
  },
  resultsList: {
    paddingBottom: theme.spacing.xxl,
  },
  loader: {
    marginTop: theme.spacing.xl,
  },
  resultItem: {
    padding: theme.spacing.s,
    backgroundColor: Colors.card,
    marginBottom: theme.spacing.s,
    borderRadius: theme.borderRadius.m,
  },
});

export default SearchScreen;