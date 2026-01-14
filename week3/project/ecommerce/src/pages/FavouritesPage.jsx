import { useMemo } from "react";
import ProductList from "../components/ProductList";
import { useFavourites } from "../context/FavouritesContext";
import useFetch from "../hooks/useFetch";
import { fetchProductById } from "../api/fakeStore";

export default function FavouritesPage() {
    const { favouriteIds } = useFavourites();

    const idsKey = useMemo(() => favouriteIds.join(","), [favouriteIds]);

    const { data, loading, error } = useFetch(async () => {
        if (favouriteIds.length === 0) return [];
        const items = await Promise.all(favouriteIds.map((id) => fetchProductById(id)));
        return Array.isArray(items) ? items : [];
    }, [idsKey]);

    const products = Array.isArray(data) ? data : [];

    return (
        <div className="page">
            <h1 className="title">Favourites</h1>

            {favouriteIds.length === 0 && <p>No favourites yet.</p>}

            {loading && <p>Loading favourites...</p>}
            {error && <p style={{ color: "crimson" }}>{error}</p>}

            {!loading && !error && favouriteIds.length > 0 && <ProductList products={products} />}
        </div>
    );
}
