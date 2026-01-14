import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
    return (
        <section className="productsGrid">
            {products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </section>
    );
}
