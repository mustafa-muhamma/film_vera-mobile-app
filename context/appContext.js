import { createContext, useState, useContext, useEffect } from 'react';
import { fetchPopularMovies } from '../services/tmdbApi';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await fetchPopularMovies();
            setMovies(data);
            setLoading(false);
        };
        load();
    }, []);

    return (
        <AppContext.Provider value={{ movies, loading }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);