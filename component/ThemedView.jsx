import { View } from 'react-native';
import { useThemeContext } from '../context/themeContext';

export default function ThemedView({ style, children, ...props }) {
    const { colors } = useThemeContext();

    return (
        <View
            style={[{ backgroundColor: colors.background }, style]}
            {...props}
        >
            {children}
        </View>
    );
}
