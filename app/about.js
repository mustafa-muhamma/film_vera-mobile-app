import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useAppContext } from '../context/appContext';

export default function Home() {
    const { movies, loading, error } = useAppContext();

    if (loading) return <ActivityIndicator size="large" color="#fff" style={{ flex: 1, backgroundColor: '#290509' }} />;
    if (error) return <Text style={{ color: 'red' }}>Error: {error.message}</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎬 Popular Movies</Text>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.movieCard}>
                        <Image
                            source={{ uri: 'https://image.tmdb.org/t/p/w500${item.poster_path}' }}
                            style={styles.poster}
                        />
                        <Text style={styles.movieTitle}>{item.title}</Text>
                    </View>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#290509', paddingTop: 50, paddingLeft: 10 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 15 },
    movieCard: { marginRight: 10, alignItems: 'center' },
    poster: { width: 120, height: 180, borderRadius: 10 },
    movieTitle: { color: '#fff', marginTop: 5, fontSize: 14, textAlign: 'center', width: 120 },
});
