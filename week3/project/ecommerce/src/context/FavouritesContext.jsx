import { createContext, useContext, useMemo, useState } from "react";

const FavouritesContext = createContext(null);

export function FavouritesProvider({ children }) {
    const [favouriteIds, setFavouriteIds] = useState([]);

    const value = useMemo(() => {
        function isFavourite(id) {
            const numericId = Number(id);
            return favouriteIds.includes(numericId);
        }

        function toggleFavourite(id) {
            const numericId = Number(id);
            setFavouriteIds((prev) =>
                prev.includes(numericId)
                    ? prev.filter((x) => x !== numericId)
                    : [...prev, numericId]
            );
        }

        return { favouriteIds, isFavourite, toggleFavourite };
    }, [favouriteIds]);

    return (
        <FavouritesContext.Provider value={value}>
            {children}
        </FavouritesContext.Provider>
    );
}

export function useFavourites() {
    const ctx = useContext(FavouritesContext);
    if (!ctx) throw new Error("useFavourites must be used inside FavouritesProvider");
    return ctx;
}
