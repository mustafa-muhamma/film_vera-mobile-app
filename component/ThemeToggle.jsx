import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeContext } from '../context/themeContext';

export default function ThemeToggle() {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.toggle}>
      <Ionicons
        name={mode === 'light' ? 'moon' : 'sunny'}
        size={22}
        color={mode === 'light' ? '#E50914' : '#FFD369'}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  toggle: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 25,
    padding: 10,
    elevation: 4,
  },
});
