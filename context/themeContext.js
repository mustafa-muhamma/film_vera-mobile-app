import { createContext, useState, useContext } from 'react';
import { Appearance } from 'react-native';
import { theme } from '../constants/colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const colorScheme = Appearance.getColorScheme(); // get system preference
    const [mode, setMode] = useState(colorScheme || 'dark');

    const toggleTheme = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));

    };

    const colors = mode === 'dark' ? theme.dark : theme.light;

    return (
        <ThemeContext.Provider value={{ mode, colors, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);
