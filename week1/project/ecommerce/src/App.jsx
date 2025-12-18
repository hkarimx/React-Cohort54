import { useMemo, useState } from "react";
import "./index.css";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";
import allProducts from "./fake-data/all-products";
import allCategories from "./fake-data/all-categories";

function normalizeCategory(value) {
    return String(value ?? "")
        .trim()
        .toLowerCase()
        .replace(/^fake:\s*/i, "");
}

export default function App() {
    const [activeCategory, setActiveCategory] = useState(null);

    const filteredProducts = useMemo(() => {

        if (!activeCategory) return allProducts;

        const activeKey = normalizeCategory(activeCategory);

        return allProducts.filter((p) => normalizeCategory(p.category) === activeKey);
    }, [activeCategory]);

    function handleSelectCategory(category) {
        setActiveCategory((prev) => (prev === category ? null : category));
    }

    return (
        <div className="page">
            <h1 className="title">Products</h1>

            <CategoryList
                categories={allCategories}
                activeCategory={activeCategory}
                onSelectCategory={handleSelectCategory}
            />

            <ProductList products={filteredProducts} />
        </div>
    );
}
