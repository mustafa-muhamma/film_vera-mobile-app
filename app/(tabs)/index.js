import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import ThemedView from '../../component/ThemedView';
import MovieRow from '../../component/MovieRow';
import ThemedText from '../../component/ThemedText';
import { useAppContext } from '../../context/appContext';

export default function Home() {
    const { popular, trending, topRated, loading, error } = useAppContext();

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
                <MovieRow title="🔥 Popular Movies" data={popular} />
                <MovieRow title="⭐ Top Rated" data={topRated} />
                <MovieRow title="🎥 Now Playing" data={trending} />
                <MovieRow title="🧭 Discover More" data={popular.slice(15, 25)} />
            </ScrollView>
        </ThemedView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
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
