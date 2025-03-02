// @/constants/theme.ts
import { Dimensions } from 'react-native';
import Colors from './colors';

const { width, height } = Dimensions.get('window');

export default {
  colors: Colors,
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    xxl: 32,
  },
  fontSizes: {
    xs: 12,
    s: 14,
    m: 16,
    l: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  dimensions: {
    width,
    height,
  },
};