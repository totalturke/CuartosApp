import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-context';
import StatusBar from 'expo-status-bar';
import { useFavoritesStore } from '@/store/favorites-store';
import Colors from '@/constants/colors';
import theme from '@/constants/theme';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites } = useFavoritesStore();
  const [selectedFavorite, setSelectedFavorite] = useState<string | null>(null);

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.container}>
        {!favorites.length && (
          <View style={styles.emptyState}>
            <Text>Ningún favorito encontrado</Text>
          </View>
        )}

        {favorites.map((favorite) => (
          <View key={favorite.id} style={styles.favoriteItem}>
            <View style={styles.actionButton}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setSelectedFavorite(favorite.id)}
              >
                <Image source={{ uri: favorite.imageUrl }} style={styles.icon} />
              </TouchableOpacity>
              
              {selectedFavorite === favorite.id && (
                <Text status="success">Añadido a favoritos</Text>
              )}
              
              <Button
                type="secondary"
                onPress={() => {
                  if (selectedFavorite === favorite.id) {
                    setSelectedFavorite(null);
                  } else {
                    setSelectedFavorite(favorite.id);
                  }
                }}
              >
                {selectedFavorite === favorite.id ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              </Button>
            </View>

            <Text style={styles.title}>{favorite.title}</Text>
            <Text style={styles.subtitle}>{favorite.subtitle}</Text>
          </View>
        ))}
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

  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.medium,
  },

  favoriteItem: {
    backgroundColor: Colors.card,
    borderRadius: theme.radius.small,
    marginHorizontal: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    padding: theme.spacing.medium,
  },

  actionButton: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: theme.spacing.medium,
  },

  button: {
    backgroundColor: Colors.background,
    borderRadius: theme.radius.small,
    padding: theme.spacing.medium,
  },

  icon: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },

  title: {
    fontSize: theme.fontSize.s + 2,
    fontWeight: '600',
    color: Colors.text,
  },

  subtitle: {
    fontSize: theme.fontSize.m - 1,
    color: Colors.subtext,
  },
});
