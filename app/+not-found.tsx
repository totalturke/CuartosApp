import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

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

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: '¡Ups!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Esta página no existe.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>¡Ir a la página principal!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.l, // Adjusted to use theme
  },
  title: {
    fontSize: theme.fontSizes.l, // Adjusted to use theme
    fontWeight: 'bold',
    color: Colors.text, // Added color from Colors object
  },
  link: {
    marginTop: theme.spacing.m, // Adjusted to use theme
    paddingVertical: theme.spacing.m, // Adjusted to use theme
  },
  linkText: {
    fontSize: theme.fontSizes.m, // Adjusted to use theme
    color: Colors.primary, // Adjusted to use Colors object (replacing #2e78b7)
  },
});