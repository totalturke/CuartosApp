import React, { useState } from 'react';
import { Pressable, View, TextInput, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import Colors from '@/constants/colors';
import theme from '@/constants/theme';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (text: string) => void;
}

export default function SearchBar({ placeholder = 'Where are you going?', onSearch }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handlePress = () => {
    setIsFocused(true);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchText);
    }
    setIsFocused(false);
  };

  const handleBlur = () => {
    if (!searchText) {
      setIsFocused(false);
    }
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      {isFocused ? (
        <View style={styles.placeholderContainer}>
          <Icons.Search size={16} color={Colors.subtext} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={Colors.subtext}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            autoCapitalize="none"
            returnKeyType="search"
            autoFocus={true}
            onBlur={handleBlur}
          />
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          <Icons.MapPin size={16} color={Colors.subtext} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={Colors.subtext}
            editable={false}
          />
          <Icons.Users size={16} color={Colors.subtext} style={styles.icon} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: theme.borderRadius.l,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginHorizontal: theme.spacing.m,
    marginVertical: theme.spacing.s,
  },
  searchIconContainer: {
    marginRight: theme.spacing.s,
  },
  placeholderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: theme.fontSizes.m,
    color: Colors.text,
  },
  icon: {
    marginHorizontal: theme.spacing.xs,
  },
});