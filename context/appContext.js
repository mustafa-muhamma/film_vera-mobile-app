import { createContext, useState, useContext, useEffect } from "react";
import {
    fetchPopularMovies,
    fetchTrendingMovies,
    fetchTopRatedMovies,
} from "../services/tmdbApi";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [popular, setPopular] = useState([]);
    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const [popularData, trendingData, topRatedData] = await Promise.all([
                    fetchPopularMovies(),
                    fetchTrendingMovies(),
                    fetchTopRatedMovies(),
                ]);

                setPopular(popularData);
                setTrending(trendingData);
                setTopRated(topRatedData);
            } catch (error) {
                console.error("Error loading movies:", error);
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, []);

    return (
        <AppContext.Provider
            value={{
                popular,
                trending,
                topRated,
                loading,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
