import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import ThemedView from './ThemedView'
import ThemedText from './ThemedText'

export default function MovieRow({ title, data }) {
    return (
        <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionTitle} title={true}>{title}</ThemedText>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ThemedView style={styles.movieCard}>
                        <Image
                            source={{
                                uri: item.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                    : 'https://via.placeholder.com/120x180?text=No+Image',
                            }}
                            style={styles.poster}
                        />
                        <ThemedText numberOfLines={1} style={styles.movieTitle}>
                            {item.title}
                        </ThemedText>
                    </ThemedView>
                )}
            />
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
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
        marginTop: 6,
        fontSize: 13,
        textAlign: 'center',
        width: 120,
    },
})
