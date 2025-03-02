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

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setError('');
    // Simulate login API call
    setTimeout(() => {
      if (email === '' || password === '') {
        setError('Please fill in all fields');
      } else {
        console.log('Login successful', { email, password });
        // Navigate to next screen or handle auth here
      }
      setLoading(false);
    }, 1000);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Navigate to forgot password screen
  };

  const handleRegister = () => {
    console.log('Register clicked');
    // Navigate to register screen
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

      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.loginButton, styles.buttonBase]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.divider} />
      </View>

      {/* Register Button */}
      <TouchableOpacity
        style={[styles.registerButton, styles.buttonBase, styles.buttonSecondary]}
        onPress={handleRegister}
      >
        <Text style={[styles.buttonText, { color: Colors.primary }]}>Register</Text>
      </TouchableOpacity>
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
    backgroundColor: `${Colors.error}20`, // Hex with opacity
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.m,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.l,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: theme.fontSizes.m,
  },
  loginButton: {
    marginBottom: theme.spacing.l,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: theme.spacing.m,
    color: Colors.subtext,
    fontSize: theme.fontSizes.m,
  },
  registerButton: {
    marginBottom: theme.spacing.l,
  },
  // Additional styles for buttons
  buttonBase: {
    paddingVertical: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    alignItems: 'center',
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  buttonText: {
    color: Colors.white,
    fontSize: theme.fontSizes.m,
    fontWeight: '600',
  },
});

export default LoginScreen;