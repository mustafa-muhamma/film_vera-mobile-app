import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    const toggleWishlist = (movie) => {
        setWishlist((prev) => {
            const exists = prev.find((m) => m.id === movie.id);
            if (exists) {
                return prev.filter((m) => m.id !== movie.id); // remove
            } else {
                return [...prev, movie]; // add
            }
        });
    };
    const clearWishlist = () => setWishlist([]);

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
