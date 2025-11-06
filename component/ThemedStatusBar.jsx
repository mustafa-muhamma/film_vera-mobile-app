import { StatusBar } from 'expo-status-bar';
import { useThemeContext } from '../context/themeContext';

export default function ThemedStatusBar() {
    const { mode, colors } = useThemeContext();

    return (
        <StatusBar
            style={mode === 'dark' ? 'light' : 'dark'}
            backgroundColor={colors.background}
            translucent={false}
        />
    );
}
