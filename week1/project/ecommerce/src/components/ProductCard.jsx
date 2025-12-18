export default function ProductCard({ product }) {
    return (
        <div className="productCard">
            <img className="tinyIcon" src={product.image} alt={product.title} />
            <span className="rowTitle">{product.title}</span>
        </div>
    );
}
