export default function CategoryList({ categories, activeCategory, onSelectCategory }) {
    return (
        <nav className="categories">
            {categories.map((cat) => (
                <button
                    key={cat}
                    type="button"
                    className={`categoryBtn ${cat === activeCategory ? "active" : ""}`}
                    onClick={() => onSelectCategory(cat)}
                >
                    {cat}
                </button>
            ))}
        </nav>
    );
}
