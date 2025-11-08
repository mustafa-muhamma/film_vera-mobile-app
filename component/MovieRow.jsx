import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedView from './ThemedView';
import ThemedText from './ThemedText';
import { useWishlist } from '../context/wishListContext';
import { useThemeContext } from '../context/themeContext';

export default function MovieRow({ title, data }) {
    const { wishlist, toggleWishlist } = useWishlist();
    const { colors } = useThemeContext();

    return (
        <ThemedView style={styles.section}>
            <ThemedText style={[styles.sectionTitle, { color: colors.text }]} title={true}>
                {title}
            </ThemedText>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    const isWishlisted = wishlist.some((movie) => movie.id === item.id);

                    return (
                        <View style={styles.movieCard}>
                            <Image
                                source={{
                                    uri: item.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                        : 'https://via.placeholder.com/120x180?text=No+Image',
                                }}
                                style={styles.poster}
                            />
                            <TouchableOpacity
                                onPress={() => toggleWishlist(item)}
                                style={styles.heartButton}
                                activeOpacity={0.8}
                            >
                                <Ionicons
                                    name={isWishlisted ? 'heart' : 'heart-outline'}
                                    size={22}
                                    color={isWishlisted ? '#E50914' : colors.text}
                                />
                            </TouchableOpacity>

                            <ThemedText numberOfLines={1} style={[styles.movieTitle, { color: colors.text }]}>
                                {item.title}
                            </ThemedText>
                        </View>
                    );
                }}
            />
        </ThemedView>
    );
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
        position: 'relative',
    },
    poster: {
        width: 120,
        height: 180,
        borderRadius: 10,
    },
    heartButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 10,
        backgroundColor: 'rgba(125, 125, 125, 0.4)',
        borderRadius: 20,
        padding: 4,
    },
    movieTitle: {
        marginTop: 6,
        fontSize: 13,
        textAlign: 'center',
        width: 120,
    },
});
