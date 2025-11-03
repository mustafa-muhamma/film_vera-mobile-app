// import { TMDB_API_KEY, TMDB_API_BASE_URL } from "@env";

// export const fetchPopularMovies = async () => {
//     const url = `${TMDB_API_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
//     console.log("🔍 Fetching from:", url);

//     const res = await fetch(url);
//     console.log("Response status:", res.status);

//     const text = await res.text();
//     console.log("Response text:", text);

//     try {
//         return JSON.parse(text);
//     } catch (err) {
//         console.error("❌ JSON parse failed:", err);
//         throw err;
//     }
// };
// services/tmdbApi.js
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
