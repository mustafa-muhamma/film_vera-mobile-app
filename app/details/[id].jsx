import { useEffect, useState, useCallback } from "react";
import {
    View,
    Image,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
    Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
    fetchMovieDetails,
    fetchSimilarMovies,
    fetchMovieTrailer,
} from "../../services/tmdbApi";
import ThemedView from "../../component/ThemedView";
import ThemedText from "../../component/ThemedText";
import { useThemeContext } from "../../context/themeContext";
import MovieRow from "../../component/MovieRow";
import YoutubePlayer from "react-native-youtube-iframe";

const { width } = Dimensions.get("window");

export default function MovieDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { colors } = useThemeContext();
    const [movie, setMovie] = useState(null);
    const [similar, setSimilar] = useState([]);
    const [trailerKey, setTrailerKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showTrailer, setShowTrailer] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        const loadMovie = async () => {
            try {
                const [details, related, trailer] = await Promise.all([
                    fetchMovieDetails(id),
                    fetchSimilarMovies(id),
                    fetchMovieTrailer(id),
                ]);
                setMovie(details);
                setSimilar(related);
                setTrailerKey(trailer);
            } catch (error) {
                console.error("Error loading movie details:", error);
            } finally {
                setLoading(false);
            }
        };
        loadMovie();
    }, [id]);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setIsPlaying(false);
        }
    }, []);

    if (loading)
        return (
            <ThemedView style={styles.loading}>
                <ActivityIndicator size="large" color="#E50914" />
            </ThemedView>
        );

    if (!movie)
        return (
            <ThemedView style={styles.centered}>
                <ThemedText style={{ color: colors.text }}>Movie not found 😢</ThemedText>
            </ThemedView>
        );

    return (
        <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.posterContainer}>
                    <Image
                        source={{
                            uri: movie.backdrop_path
                                ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
                                : "https://via.placeholder.com/500x750?text=No+Image",
                        }}
                        style={styles.poster}
                    />
                    {trailerKey && (
                        <TouchableOpacity
                            style={styles.playButton}
                            onPress={() => setShowTrailer(true)}
                        >
                            <Ionicons name="play-circle" size={64} color="#E50914" />
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.details}>
                    <ThemedText style={styles.title}>{movie.title}</ThemedText>
                    <ThemedText style={styles.subText}>
                        ⭐ {movie.vote_average?.toFixed(1)} | 🎬 {movie.release_date?.slice(0, 4)}
                    </ThemedText>
                    <ThemedText style={styles.overview}>{movie.overview}</ThemedText>
                </View>

                {similar.length > 0 && (
                    <View style={{ marginTop: 20 }}>
                        <MovieRow title="🎞 Similar Movies" data={similar} />
                    </View>
                )}
            </ScrollView>

            <Modal visible={showTrailer} animationType="slide" transparent={true}>
                <View style={styles.modalBackground}>
                    {trailerKey ? (
                        <YoutubePlayer
                            height={250}
                            width={width}
                            play={isPlaying}
                            videoId={trailerKey}
                            onChangeState={onStateChange}
                        />
                    ) : (
                        <ThemedText style={{ color: "#fff", fontSize: 16 }}>
                            🎬 Trailer not available
                        </ThemedText>
                    )}
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setShowTrailer(false)}
                    >
                        <Ionicons name="close" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>
            </Modal>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backButton: {
        position: "absolute",
        top: 40,
        left: 15,
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.4)",
        borderRadius: 25,
        padding: 8,
    },
    posterContainer: {
        width: "100%",
        height: 250,
        backgroundColor: "#000",
    },
    poster: {
        width: "100%",
        height: "100%",
    },
    playButton: {
        position: "absolute",
        top: "40%",
        left: "42%",
        zIndex: 5,
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
    modalBackground: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    closeButton: {
        position: "absolute",
        top: 40,
        right: 20,
        backgroundColor: "rgba(0,0,0,0.6)",
        borderRadius: 25,
        padding: 6,
    },
});
