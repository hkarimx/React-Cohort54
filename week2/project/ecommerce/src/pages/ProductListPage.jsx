import { useEffect, useMemo, useState } from "react";
import CategoryList from "../components/CategoryList";
import ProductList from "../components/ProductList";
import { fetchCategories, fetchProducts } from "../api/fakeStore";

function normalizeCategory(value) {
    return String(value ?? "").trim().toLowerCase();
}

async function fetchJson(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    return res.json();
}

export default function ProductListPage() {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);

    const [products, setProducts] = useState([]);

    const [loadingCategories, setLoadingCategories] = useState(false);
    const [errorCategories, setErrorCategories] = useState(null);

    const [loadingProducts, setLoadingProducts] = useState(false);
    const [errorProducts, setErrorProducts] = useState(null);

    useEffect(() => {
        let cancelled = false;

        void (async () => {
            try {
                setLoadingCategories(true);
                setErrorCategories(null);

                const data = await fetchCategories();
                if (!cancelled) setCategories(Array.isArray(data) ? data : []);
            } catch (err) {
                if (!cancelled) setErrorCategories(err?.message || "Failed to load categories");
            } finally {
                if (!cancelled) setLoadingCategories(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        let cancelled = false;

        void (async () => {
            try {
                setLoadingProducts(true);
                setErrorProducts(null);

                const data = await fetchProducts(activeCategory);
                if (!cancelled) setProducts(Array.isArray(data) ? data : []);
            } catch (err) {
                if (!cancelled) setErrorProducts(err?.message || "Failed to load products");
            } finally {
                if (!cancelled) setLoadingProducts(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [activeCategory]);

    const uiCategories = useMemo(() => categories, [categories]);

    function handleSelectCategory(category) {
        setActiveCategory((prev) => {
            if (!category) return null;
            return normalizeCategory(prev) === normalizeCategory(category) ? null : category;
        });
    }

    return (
        <div className="page">
            <h1 className="title">Products</h1>

            {loadingCategories && <p>Loading categories...</p>}
            {errorCategories && (
                <p style={{ color: "crimson" }}>Error loading categories: {errorCategories}</p>
            )}

            {!loadingCategories && !errorCategories && (
                <CategoryList
                    categories={uiCategories}
                    activeCategory={activeCategory}
                    onSelectCategory={handleSelectCategory}
                />
            )}

            {loadingProducts && <p>Loading products...</p>}
            {errorProducts && (
                <p style={{ color: "crimson" }}>Error loading products: {errorProducts}</p>
            )}

            {!loadingProducts && !errorProducts && <ProductList products={products} />}
        </div>
    );
}
