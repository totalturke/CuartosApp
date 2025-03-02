import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Assuming these are defined elsewhere (e.g., in a theme file)
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
    s: 12,
    m: 16,
    l: 20,
  },
  borderRadius: {
    l: 8,
  },
};

// Assuming Colors is a constant object defined elsewhere
const Colors = {
  text: '#000000',
  subtext: '#666666',
  card: '#f0f0f0',
};

const App = () => {
  useEffect(() => {
    // Example effect, could be used for initialization
    console.log('Component mounted');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Section Title</Text>
        <View style={styles.locationsList}>
          <Text>Location 1</Text>
          <Text>Location 2</Text>
        </View>
      </View>

      <View style={styles.experienceSection}>
        <Text style={styles.experienceText}>Experience Description</Text>
        <View style={styles.experienceTags}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Tag 1</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Tag 2</Text>
          </View>
        </View>
      </View>

      <View style={styles.propertiesContainer}>
        <Text>Centered Property</Text>
      </View>

      <View style={styles.loader}>
        <Text>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginVertical: theme.spacing.l,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.l,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
  },
  locationsList: {
    paddingHorizontal: theme.spacing.l,
  },
  propertiesContainer: {
    alignItems: 'center',
  },
  loader: {
    marginVertical: theme.spacing.xl,
  },
  experienceSection: {
    marginVertical: theme.spacing.l,
    paddingHorizontal: theme.spacing.l,
    paddingBottom: theme.spacing.xxl,
  },
  experienceText: {
    fontSize: theme.fontSizes.m,
    color: Colors.subtext,
    marginBottom: theme.spacing.m,
  },
  experienceTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: Colors.card,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.m,
    borderRadius: theme.borderRadius.l,
    marginRight: theme.spacing.s,
    marginBottom: theme.spacing.s,
  },
  tagText: {
    fontSize: theme.fontSizes.s,
    color: Colors.text,
  },
});

export default App;