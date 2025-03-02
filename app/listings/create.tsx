import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
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

const CreateScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]); // Array of image URIs
  const [loading, setLoading] = useState(false);

  const handleAddImage = () => {
    // Simulate image picker (replace with actual image picker logic)
    const newImage = 'https://via.placeholder.com/100'; // Placeholder image
    setImages((prev) => [...prev, newImage]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simulate API call to submit the form
    setTimeout(() => {
      if (title === '' || description === '') {
        console.log('Please fill in all fields');
      } else {
        console.log('Form submitted', { title, description, images });
        // Reset form or navigate away
        setTitle('');
        setDescription('');
        setImages([]);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Title Input */}
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />

      {/* Description Input */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Image Upload Section */}
      <Text style={styles.label}>Images</Text>
      <View style={styles.imagesContainer}>
        {images.map((uri, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri }} style={styles.image} />
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={() => handleRemoveImage(index)}
            >
              <Icon name="close" size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addImageButton} onPress={handleAddImage}>
          <Icon name="add" size={24} color={Colors.subtext} />
          <Text style={styles.addImageText}>Add Image</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, styles.buttonBase]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Text style={styles.buttonText}>Create</Text>
        )}
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
    marginBottom: theme.spacing.l,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.l,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius.m,
    marginRight: theme.spacing.s,
    marginBottom: theme.spacing.s,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: theme.borderRadius.m,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.error,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius.m,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  addImageText: {
    fontSize: theme.fontSizes.xs,
    color: Colors.subtext,
    marginTop: theme.spacing.xs,
  },
  submitButton: {
    marginTop: theme.spacing.l,
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

export default CreateScreen;