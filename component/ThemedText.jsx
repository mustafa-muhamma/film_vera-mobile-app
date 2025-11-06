import { Text } from 'react-native';
import { useThemeContext } from '../context/themeContext';

export default function ThemedText({ style, children, title = false, ...props }) {
    const { colors } = useThemeContext();
    const textColor = title ? colors.text : colors.text;

    return (
        <Text
            style={[{ color: textColor }, style]}
            {...props}
        >
            {children}
        </Text>
    );
}
