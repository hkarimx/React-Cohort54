export default function ProductCard({ product }) {
    console.log("IMAGE:", product.image);

    return (
        <div className="productCard">
            <img className="tinyIcon" src={product.image} alt={product.title} />
            <span className="rowTitle">{product.title}</span>
        </div>
    );
}
