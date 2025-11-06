// src/theme/colors.js

const lightColors = {
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#1A1A1A',
    subtitle: '#4A4A4A',
    primary: '#E50914', // Netflix red
    secondary: '#FF6B81',
    accent: '#F5C518', // like IMDb yellow
    border: '#E0E0E0',
    card: '#FFFFFF',
    success: '#22C55E',
    warning: '#FACC15',
    error: '#DC2626',
};

const darkColors = {
    background: '#0D0D0D', // deep black background
    surface: '#1A1A1A',
    text: '#FFFFFF',
    subtitle: '#B3B3B3',
    primary: '#E50914',
    secondary: '#FF6B81',
    accent: '#F5C518',
    border: '#292929',
    card: '#121212',
    success: '#22C55E',
    warning: '#FACC15',
    error: '#F87171',
};

export const theme = {
    light: lightColors,
    dark: darkColors,
};

export default theme;