import {
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWishlist } from '../../context/wishListContext';
import { useThemeContext } from '../../context/themeContext';
import ThemedView from '../../component/ThemedView';
import ThemedText from '../../component/ThemedText';

export default function Favourites() {
    const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
    const { colors } = useThemeContext();

    const handleClearAll = () => {
        if (!wishlist?.length) return;
        Alert.alert(
            'Clear Wishlist',
            'Are you sure you want to remove all movies from your wishlist?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Clear All', style: 'destructive', onPress: clearWishlist },
            ]
        );
    };

    if (!wishlist?.length) {
        return (
            <ThemedView style={styles.emptyContainer}>
                <Ionicons name="heart-outline" size={70} color={colors.primary} />
                <ThemedText style={[styles.emptyTitle, { color: colors.primary }]}>
                    No Favorites Yet
                </ThemedText>
                <ThemedText style={[styles.emptySubtitle, { color: colors.subtitle }]}>
                    Tap the ❤️ icon on a movie to add it here.
                </ThemedText>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data={wishlist}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ThemedView style={[styles.card, { backgroundColor: colors.card }]}>
                        <Image
                            source={{
                                uri: item.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                    : 'https://via.placeholder.com/200x300?text=No+Image',
                            }}
                            style={styles.image}
                        />
                        <TouchableOpacity
                            style={styles.removeBtn}
                            onPress={() => toggleWishlist(item)}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="heart-dislike" size={18} color="#fff" />
                        </TouchableOpacity>

                        <ThemedText
                            numberOfLines={1}
                            style={[styles.movieTitle, { color: colors.text }]}
                        >
                            {item.title}
                        </ThemedText>
                    </ThemedView>
                )}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 14,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        position: 'relative',
    },
    header: {
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    clearButton: {
        position: 'absolute',
        right: 0,
        padding: 5,
    },
    row: {
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        borderRadius: 14,
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 6,
    },
    image: {
        width: '100%',
        height: 240,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },
    movieTitle: {
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'center',
        paddingVertical: 10,
    },
    removeBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 15,
        padding: 6,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginTop: 12,
    },
    emptySubtitle: {
        fontSize: 15,
        opacity: 0.7,
        marginTop: 6,
        textAlign: 'center',
    },
});
