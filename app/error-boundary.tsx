import React, { Component, ErrorInfo, ReactNode } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

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

interface ErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Something went wrong</Text>
            <Text style={styles.subtitle}>{this.state.error?.message}</Text>
            {Platform.OS !== 'web' && (
              <Text style={styles.description}>
                Please check your device logs for more details.
              </Text>
            )}
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.l, // Adjusted to use theme
  },
  title: {
    fontSize: theme.fontSizes.xl, // Adjusted to use theme (replacing 36)
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: theme.spacing.s, // Adjusted to use theme
    color: Colors.text, // Added color from Colors object
  },
  subtitle: {
    fontSize: theme.fontSizes.m, // Adjusted to use theme (replacing 14)
    color: Colors.subtext, // Adjusted to use Colors (replacing #666)
    marginBottom: theme.spacing.m, // Adjusted to use theme
    textAlign: 'center',
  },
  description: {
    fontSize: theme.fontSizes.m, // Adjusted to use theme (replacing 14)
    color: Colors.subtext, // Adjusted to use Colors (replacing #666)
    textAlign: 'center',
    marginTop: theme.spacing.s, // Adjusted to use theme
  },
});

export default ErrorBoundary;