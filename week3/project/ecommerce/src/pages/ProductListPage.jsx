import { useMemo, useState } from "react";
import CategoryList from "../components/CategoryList";
import ProductList from "../components/ProductList";
import { fetchCategories, fetchProducts } from "../api/fakeStore";
import useFetch from "../hooks/useFetch";

function normalizeCategory(value) {
    return String(value ?? "").trim().toLowerCase();
}

export default function ProductListPage() {
    const [activeCategory, setActiveCategory] = useState(null);

    const {
        data: categoriesData,
        loading: loadingCategories,
        error: errorCategories,
    } = useFetch(async () => {
        const data = await fetchCategories();
        return Array.isArray(data) ? data : [];
    }, []);

    const {
        data: productsData,
        loading: loadingProducts,
        error: errorProducts,
    } = useFetch(async () => {
        const data = await fetchProducts(activeCategory);
        return Array.isArray(data) ? data : [];
    }, [activeCategory]);

    const categories = useMemo(() => (Array.isArray(categoriesData) ? categoriesData : []), [categoriesData]);
    const products = Array.isArray(productsData) ? productsData : [];

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
            {errorCategories && <p style={{ color: "crimson" }}>Error loading categories: {errorCategories}</p>}

            {!loadingCategories && !errorCategories && (
                <CategoryList
                    categories={categories}
                    activeCategory={activeCategory}
                    onSelectCategory={handleSelectCategory}
                />
            )}

            {loadingProducts && <p>Loading products...</p>}
            {errorProducts && <p style={{ color: "crimson" }}>Error loading products: {errorProducts}</p>}

            {!loadingProducts && !errorProducts && <ProductList products={products} />}
        </div>
    );
}
