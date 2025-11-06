import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useAppContext } from '../context/appContext';
import ThemeToggle from '../component/ThemeToggle';
import ThemedView from '../component/ThemedView';
import MovieRow from '../component/MovieRow';
import ThemedText from '../component/ThemedText';

export default function Home() {
    const { movies, loading, error } = useAppContext();

    if (loading)
        return (
            <ThemedView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#E50914" />
            </ThemedView>
        );

    if (error)
        return (
            <ThemedView style={styles.errorContainer}>
                <ThemedText style={styles.errorText}>⚠️ Error: {error.message}</ThemedText>
            </ThemedView>
        );

    return (
        <ThemedView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <ThemeToggle />
                <ThemedText style={styles.header} title={true}>🎬 Movie Explorer</ThemedText>

                <MovieRow title="🔥 Popular Movies" data={movies.slice(0, 10)} />
                <MovieRow title="⭐ Top Rated" data={movies.slice(10, 20)} />
                <MovieRow title="🎥 Now Playing" data={movies.slice(5, 15)} />
                <MovieRow title="🧭 Discover More" data={movies.slice(15, 25)} />

                <View style={{ height: 80 }} />
            </ScrollView>
        </ThemedView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        fontWeight: '500',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
        letterSpacing: 1,
    },

});
