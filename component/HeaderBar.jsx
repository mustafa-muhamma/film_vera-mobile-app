import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeContext } from '../context/themeContext';
import { usePathname } from 'expo-router';
import ThemedText from './ThemedText';
import ThemedView from './ThemedView';

export default function Header() {
    const { mode, toggleTheme, colors } = useThemeContext();
    const pathname = usePathname();

    const getTitle = () => {
        if (pathname === '/' || pathname.includes('index')) return 'Movie Explorer';
        if (pathname.includes('favourites')) return 'My Wishlist';
        if (pathname.includes('search')) return 'Discover Movies';
        if (pathname.includes('details')) return 'Movie Details';
        return 'FilmVera';
    };

    return (
        <ThemedView style={[styles.header, { backgroundColor: colors.background }]}>
            <ThemedText style={[styles.logo, { color: colors.text }]}>{getTitle()}</ThemedText>

            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
                    <Ionicons
                        name={mode === 'light' ? 'moon' : 'sunny'}
                        size={22}
                        color={mode === 'light' ? '#E50914' : '#FFD369'}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => console.log('Search pressed')}
                    style={styles.iconButton}
                >
                    <Ionicons name="search" size={22} color={colors.text} />
                </TouchableOpacity>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 10,
    },
    logo: {
        fontSize: 22,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    iconButton: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 25,
        padding: 8,
    },
});
