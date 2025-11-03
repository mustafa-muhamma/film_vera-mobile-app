import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useAppContext } from '../context/appContext';

export default function Home() {
    const { movies, loading, error } = useAppContext();

    if (loading)
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#E50914" />
            </View>
        );

    if (error)
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>⚠️ Error: {error.message}</Text>
            </View>
        );

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.header}>🎬 Movie Explorer</Text>

            <MovieRow title="🔥 Popular Movies" data={movies.slice(0, 10)} />
            <MovieRow title="⭐ Top Rated" data={movies.slice(10, 20)} />
            <MovieRow title="🎥 Now Playing" data={movies.slice(5, 15)} />
            <MovieRow title="🧭 Discover More" data={movies.slice(15, 25)} />

            <View style={{ height: 80 }} />
        </ScrollView>
    );
}

const MovieRow = ({ title, data }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <View style={styles.movieCard}>
                    <Image
                        source={{
                            uri: item.poster_path
                                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                : 'https://via.placeholder.com/120x180?text=No+Image',
                        }}
                        style={styles.poster}
                    />
                    <Text numberOfLines={1} style={styles.movieTitle}>
                        {item.title}
                    </Text>
                </View>
            )}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        paddingTop: 50,
        paddingHorizontal: 10,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#E50914',
        fontSize: 16,
        fontWeight: '500',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 25,
        textAlign: 'center',
        letterSpacing: 1,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 12,
        marginLeft: 5,
    },
    movieCard: {
        marginRight: 10,
        alignItems: 'center',
        width: 120,
    },
    poster: {
        width: 120,
        height: 180,
        borderRadius: 10,
    },
    movieTitle: {
        color: '#fff',
        marginTop: 6,
        fontSize: 13,
        textAlign: 'center',
        width: 120,
    },
});
