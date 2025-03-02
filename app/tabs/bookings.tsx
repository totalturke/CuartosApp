import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-context';
import StatusBar from 'expo-status-bar';
import { useBookingsStore } from '@/store/bookings-store';
import { useAuthStore } from '@/store/auth-store';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import theme from '@/constants/theme';

export default function BookingScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { bookings, isLoading, fetchUserBookings, cancelBooking } = useBookingsStore();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    if (user) {
      fetchUserBookings(user.id);
    } else {
      router.push('/auth/login');
    }
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await cancelBooking(bookingId);
    } catch (error) {
      Alert.alert('Error', 'Failed to cancel booking');
    }
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.container}>
        {/* Loading state */}
        {isLoading && (
          <ActivityIndicator
            style={styles.loading}
            size="large"
          />
        )}

        {!isLoading && user && (
          <>
            {/* Header with tabs */}
            <View style={styles.tabHeader}>
              <FlatList
                data={[
                  { id: 'upcoming', label: 'Próximos' },
                  { id: 'past', label: 'Vendidos' },
                ]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.tabButton(item.id)}
                    onPress={() => setActiveTab(item.id as any)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.tabText(item.id),
                        activeTab === item.id && styles.activeTab
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />

              {/* Search bar */}
              <View style={styles.searchBar}>
                <Text placeholder="Buscar..." />
              </View>
            </View>

            {/* List of bookings */}
            <FlatList
              data={bookings}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.bookingItem(item.status)}>
                  <View style={styles.actionButton}>
                    <Text status="danger">Cancelar</Text>
                    <Button
                      onPress={() => handleCancelBooking(item.id)}
                      type="secondary"
                    >
                      Cancelar
                    </Button>
                  </View>

                  {/* Display details */}
                  <View style={styles.details}>
                    <Text style={styles.location}>{item.location}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                  </View>
                </View>
              )}
            />

            {/* Empty states */}
            {!bookings.length && (
              <View style={styles.emptyState}>
                <Text>Ningún booking encontrado</Text>
              </View>
            )}
          </>
        )}

        {/* Error state */}
        {!isLoading && !user && (
          <View style={styles.error}>
            <Alert title="Error" message="Debe ingresar para ver los bookings." />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.medium,
  },

  tabHeader: {
    width: '100%',
    paddingVertical: theme.spacing.medium,
    backgroundColor: Colors.background,
  },

  tabButton: (id: string) => ({
    justifyContent: 'center',
    borderRightColor: id === activeTab ? Colors.primary : Colors.border,
    borderRightWidth: 1,
  }),

  tabText: (id: string) => ({
    color: id === activeTab ? Colors.primary : Colors.subtext,
    fontSize: theme.fontSize.s,
  }),

  activeTab: {
    color: Colors.primary,
    fontSize: theme.fontSize.m + 2,
  },

  searchBar: {
    width: '100%',
    padding: theme.spacing.medium,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  },

  bookingItem: (status: string) => ({
    backgroundColor: Colors.card,
    borderRadius: theme.radius.small,
    padding: theme.spacing.medium,
    marginHorizontal: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
  }),

  actionButton: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: theme.spacing.medium,
  },

  details: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.medium,
  },

  locationText: {
    fontSize: theme.fontSize.s,
    color: Colors.subtext,
  },

  dateText: {
    fontSize: theme.fontSize.m - 1,
    color: Colors.subtext,
  },

  priceText: {
    fontSize: theme.fontSize.m + 2,
    fontWeight: '500',
    color: Colors.text,
  },

  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.medium,
  },

  error: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.medium,
    backgroundColor: Colors.error,
    borderRadius: theme.radius.medium,
  },
});
