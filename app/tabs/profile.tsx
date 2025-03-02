import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming an icon library is used

// Theme and Colors (assumed from previous context and expanded)
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
};

const Colors = {
  text: '#000000',
  subtext: '#666666',
  border: '#e0e0e0',
  primary: '#007AFF',
  white: '#FFFFFF',
  error: '#FF3B30',
};

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    notifications: 3,
  });

  useEffect(() => {
    // Simulate fetching profile data
    console.log('Profile data loaded');
  }, []);

  const handleSignOut = () => {
    console.log('User signed out');
    // Add sign-out logic here (e.g., auth.signOut())
  };

  const handleSave = () => {
    console.log('Profile saved');
    // Add save logic here
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.menuText}>{profileData.name}</Text>
        <Text style={styles.menuText}>{profileData.email}</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.menuText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="notifications-outline" size={20} color={Colors.text} style={styles.menuIcon} />
          <Text style={styles.menuText}>Notifications</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{profileData.notifications}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="settings-outline" size={20} color={Colors.text} style={styles.menuIcon} />
          <Text style={styles.menuText}>Account Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="help-circle-outline" size={20} color={Colors.text} style={styles.menuIcon} />
          <Text style={styles.menuText}>Help & Support</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Icon name="log-out-outline" size={20} color={Colors.error} style={styles.signOutIcon} />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  saveButton: {
    marginTop: theme.spacing.m,
  },
  section: {
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.m,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.l,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: theme.spacing.m,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.m,
  },
  menuIcon: {
    marginRight: theme.spacing.m,
  },
  menuText: {
    fontSize: theme.fontSizes.m,
    color: Colors.text,
    flex: 1,
  },
  badge: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.white,
    fontSize: theme.fontSizes.xs,
    fontWeight: '600',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.l,
    marginVertical: theme.spacing.l,
    marginHorizontal: theme.spacing.l,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  signOutIcon: {
    marginRight: theme.spacing.s,
  },
  signOutText: {
    fontSize: theme.fontSizes.m,
    color: Colors.error,
    fontWeight: '600',
  },
});

export default ProfileScreen;