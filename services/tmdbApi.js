import { TMDB_API_KEY, TMDB_API_BASE_URL } from "@env";
export const fetchPopularMovies = async () => {
    try {
        const response = await fetch(
            `${TMDB_API_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();
        return data.results; // return just the array of movies
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};

export const searchMovies = async (query) => {
    if (!query.trim()) return [];

    try {
        const response = await fetch(
            `${TMDB_API_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(
                query
            )}&page=1`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error searching movies:", error);
        throw error;
    }
};