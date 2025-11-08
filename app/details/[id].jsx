import React, { useEffect, useState } from "react";
import {
    View,
    Image,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { fetchMovieDetails, fetchSimilarMovies } from "../../services/tmdbApi";
import ThemedView from "../../component/ThemedView";
import ThemedText from "../../component/ThemedText";
import { useThemeContext } from "../../context/themeContext";
import MovieRow from "../../component/MovieRow";

export default function MovieDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { colors } = useThemeContext();
    const [movie, setMovie] = useState(null);
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMovie = async () => {
            try {
                const details = await fetchMovieDetails(id);
                const related = await fetchSimilarMovies(id);
                setMovie(details);
                setSimilar(related);
            } catch (error) {
                console.error("Error loading movie details:", error);
            } finally {
                setLoading(false);
            }
        };
        loadMovie();
    }, [id]);

    if (loading)
        return (
            <ThemedView style={styles.loading}>
                <ActivityIndicator size="large" color="#E50914" />
            </ThemedView>
        );

    if (!movie)
        return (
            <ThemedView style={styles.centered}>
                <ThemedText style={{ color: colors.text }}>
                    Movie not found 😢
                </ThemedText>
            </ThemedView>
        );

    return (
        <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Back button */}
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </TouchableOpacity>

                {/* Poster */}
                <Image
                    source={{
                        uri: movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "https://via.placeholder.com/500x750?text=No+Image",
                    }}
                    style={styles.poster}
                />

                {/* Details */}
                <View style={styles.details}>
                    <ThemedText style={styles.title}>{movie.title}</ThemedText>
                    <ThemedText style={styles.subText}>
                        ⭐ {movie.vote_average?.toFixed(1)} | 🎬 {movie.release_date?.slice(0, 4)}
                    </ThemedText>
                    <ThemedText style={styles.overview}>{movie.overview}</ThemedText>
                </View>

                {/* Similar Movies */}
                {similar.length > 0 && (
                    <View style={{ marginTop: 20 }}>
                        <MovieRow title="🎞 Similar Movies" data={similar} />
                    </View>
                )}
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backButton: {
        position: "absolute",
        top: 40,
        left: 15,
        zIndex: 2,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 25,
        padding: 8,
    },
    poster: {
        width: "100%",
        height: 500,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    details: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 8,
    },
    subText: {
        fontSize: 15,
        opacity: 0.8,
        marginBottom: 10,
    },
    overview: {
        fontSize: 15,
        lineHeight: 22,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
