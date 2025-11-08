import { TMDB_API_KEY, TMDB_API_BASE_URL } from "@env";

export const fetchPopularMovies = async (page = 1) => {
    try {
        const response = await fetch(
            `${TMDB_API_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
        );
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching popular movies:", error);
        throw error;
    }
};


export const fetchTrendingMovies = async (timeWindow = "week") => {
    try {
        const response = await fetch(
            `${TMDB_API_BASE_URL}/trending/movie/${timeWindow}?api_key=${TMDB_API_KEY}`
        );
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching trending movies:", error);
        throw error;
    }
};


export const fetchTopRatedMovies = async (page = 1) => {
    try {
        const response = await fetch(
            `${TMDB_API_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
        );
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching top rated movies:", error);
        throw error;
    }
};


export const fetchMovieDetails = async (id) => {
    try {
        const response = await fetch(
            `${TMDB_API_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching details for movie ${id}:`, error);
        throw error;
    }
};


export const fetchSimilarMovies = async (id) => {
    try {
        const response = await fetch(
            `${TMDB_API_BASE_URL}/movie/${id}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(`Error fetching similar movies for ID ${id}:`, error);
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

export const fetchMovieTrailer = async (id) => {
    try {
        const response = await fetch(
            `${TMDB_API_BASE_URL}/movie/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const data = await response.json();
        const trailer = data.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        return trailer ? trailer.key : null; // returns YouTube video ID
    } catch (error) {
        console.error("Error fetching trailer:", error);
        return null;
    }
};