import { useState, useEffect } from "react";
import {
    View,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ThemedText from "../../component/ThemedText";
import ThemedView from "../../component/ThemedView";
import { useThemeContext } from "../../context/themeContext";
import { searchMovies } from "../../services/tmdbApi";

export default function SearchScreen() {
    const { colors } = useThemeContext();
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);

    const fetchMovies = async (text) => {
        setLoading(true);
        try {
            const movies = await searchMovies(text);
            setResults(movies);
        } catch (err) {
            console.error("Error fetching search results:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (typingTimeout) clearTimeout(typingTimeout);
        if (query.trim()) {
            const timeout = setTimeout(() => fetchMovies(query), 600);
            setTypingTimeout(timeout);
        } else {
            setResults([]);
        }
    }, [query]);

    return (
        <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.searchHeader, { backgroundColor: colors.card }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={22} color={colors.text} />
                </TouchableOpacity>

                <View style={[styles.searchBox]}>
                    <Ionicons name="search" size={20} color={colors.text} />
                    <TextInput
                        style={[styles.input, { color: colors.text }]}
                        placeholder="Search movies..."
                        placeholderTextColor={colors.text + "88"}
                        value={query}
                        onChangeText={setQuery}
                        autoFocus
                    />
                    {query.length > 0 && (
                        <TouchableOpacity onPress={() => setQuery("")}>
                            <Ionicons name="close" size={20} color={colors.text} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#E50914" style={{ marginTop: 40 }} />
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    contentContainerStyle={styles.grid}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.movieCard}>
                            <Image
                                source={{
                                    uri: item.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                        : "https://via.placeholder.com/150x220?text=No+Image",
                                }}
                                style={styles.poster}
                            />
                            <ThemedText numberOfLines={2} style={styles.title}>
                                {item.title}
                            </ThemedText>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        query && !loading ? (
                            <ThemedText style={{ textAlign: "center", marginTop: 50, opacity: 0.7 }}>
                                No results found.
                            </ThemedText>
                        ) : null
                    }
                />
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    searchHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 10,
        elevation: 2,
    },
    backButton: {
        marginRight: 8,
        padding: 6,
        borderRadius: 25,
    },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
    },
    grid: { paddingVertical: 10 },
    movieCard: {
        flex: 1 / 3,
        alignItems: "center",
        marginBottom: 15,
    },
    poster: { width: 110, height: 160, borderRadius: 8 },
    title: { fontSize: 12, textAlign: "center", marginTop: 6, width: 100 },
});
