import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming an icon library for DollarSign and Bed

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

const EditScreen = () => {
  const [title, setTitle] = useState('Sample Property');
  const [description, setDescription] = useState('A cozy house with great views.');
  const [price, setPrice] = useState('1500');
  const [bedrooms, setBedrooms] = useState('2');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate fetching initial data for editing
    console.log('Fetching property data for editing');
  }, []);

  const handleSave = () => {
    setLoading(true);
    // Simulate API call to save changes
    setTimeout(() => {
      console.log('Property updated', { title, description, price, bedrooms });
      setLoading(false);
      // Navigate back or show success message
    }, 1000);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Title Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter property title"
        />
      </View>

      {/* Description Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe tu propiedad, sus características y lo que la hace especial..."
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* Price Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Precio por noche (MXN)</Text>
        <View style={styles.priceInputContainer}>
          <Icon
            name="cash-outline" // Placeholder for DollarSign
            size={20}
            color={Colors.subtext}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.priceInput}
            value={price}
            onChangeText={setPrice}
            placeholder="0"
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Property Details Section */}
      <Text style={styles.sectionTitle}>Detalles de la Propiedad</Text>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Habitaciones</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setBedrooms(String(Math.max(1, Number(bedrooms) - 1)))}
            >
              <Text style={styles.counterButtonText}>-</Text>
            </TouchableOpacity>
            <View style={styles.counterValueContainer}>
              <Icon
                name="bed-outline" // Placeholder for Bed
                size={16}
                color={Colors.text}
                style={styles.counterIcon}
              />
              <Text style={styles.counterValue}>{bedrooms}</Text>
            </View>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setBedrooms(String(Number(bedrooms) + 1))}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.submitButton, styles.buttonBase]}
        onPress={handleSave}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Save Changes'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.l,
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    marginBottom: theme.spacing.l,
  },
  label: {
    fontSize: theme.fontSizes.m,
    color: Colors.text,
    marginBottom: theme.spacing.s,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    fontSize: theme.fontSizes.m,
    color: Colors.text,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: theme.borderRadius.m,
    paddingHorizontal: theme.spacing.m,
  },
  inputIcon: {
    marginRight: theme.spacing.m,
  },
  priceInput: {
    flex: 1,
    height: 50,
    fontSize: theme.fontSizes.m,
    color: Colors.text,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.l,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: theme.spacing.m,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.l,
  },
  detailItem: {
    flex: 1,
    marginRight: theme.spacing.m,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.s,
  },
  counterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: theme.borderRadius.m,
  },
  counterButtonText: {
    fontSize: theme.fontSizes.m,
    color: Colors.text,
    fontWeight: '600',
  },
  counterValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterIcon: {
    marginRight: theme.spacing.xs,
  },
  counterValue: {
    fontSize: theme.fontSizes.m,
    color: Colors.text,
  },
  submitButton: {
    marginBottom: theme.spacing.xxl,
  },
  buttonBase: {
    paddingVertical: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  buttonText: {
    color: Colors.white,
    fontSize: theme.fontSizes.m,
    fontWeight: '600',
  },
});

export default EditScreen;