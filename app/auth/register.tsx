import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
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

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    setError('');
    // Simulate registration API call
    setTimeout(() => {
      if (email === '' || password === '' || confirmPassword === '') {
        setError('Please fill in all fields');
      } else if (password !== confirmPassword) {
        setError('Passwords do not match');
      } else {
        console.log('Registration successful', { email, password });
        // Navigate to next screen or handle auth here
      }
      setLoading(false);
    }, 1000);
  };

  const handleLoginRedirect = () => {
    console.log('Redirect to login');
    // Navigate to login screen
  };

  return (
    <View style={styles.container}>
      {/* Error Message */}
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color={Colors.text} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock-closed-outline" size={20} color={Colors.text} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Icon
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color={Colors.text}
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock-closed-outline" size={20} color={Colors.text} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.eyeIcon}
        >
          <Icon
            name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color={Colors.text}
          />
        </TouchableOpacity>
      </View>

      {/* Terms Text */}
      <Text style={styles.termsText}>
        By registering, you agree to our Terms and Conditions
      </Text>

      {/* Register Button */}
      <TouchableOpacity
        style={[styles.registerButton, styles.buttonBase]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      {/* Login Link */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={handleLoginRedirect}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.l,
    backgroundColor: '#FFFFFF',
  },
  errorContainer: {
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.m,
    backgroundColor: `${Colors.error}20`, // Hex with opacity
  },
  errorText: {
    color: Colors.error,
    fontSize: theme.fontSizes.m,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: theme.borderRadius.m,
    paddingHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.m,
    backgroundColor: Colors.white,
  },
  inputIcon: {
    marginRight: theme.spacing.m,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: theme.fontSizes.m,
    color: Colors.text,
  },
  eyeIcon: {
    padding: theme.spacing.s,
  },
  termsText: {
    fontSize: theme.fontSizes.s,
    color: Colors.subtext,
    marginBottom: theme.spacing.l,
    textAlign: 'center',
  },
  registerButton: {
    marginBottom: theme.spacing.l,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: theme.fontSizes.m,
    color: Colors.subtext,
  },
  loginLink: {
    fontSize: theme.fontSizes.m,
    color: Colors.primary,
    fontWeight: '600',
    marginLeft: theme.spacing.xs,
  },
  // Additional styles for button
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

export default RegisterScreen;