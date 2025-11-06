import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ✅ Expo's icon pack
import { useThemeContext } from '../context/themeContext';

export default function ThemeToggle() {
  const { mode, toggleTheme, colors } = useThemeContext();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          backgroundColor: colors.surface,
          shadowColor: colors.text,
        },
      ]}
    >
      <View>
        {mode === 'dark' ? (
          <Ionicons name="sunny" size={24} color={colors.accent} />
        ) : (
          <Ionicons name="moon" size={24} color={colors.primary} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 50,
    right: 20,
    borderRadius: 30,
    padding: 10,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    zIndex: 999,
  },
});
