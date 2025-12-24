import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <Link to={`/product/${product.id}`} className="productCard">
            <div className="productImageWrap">
                <img
                    className="productImage"
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                />
            </div>

            <div className="productBody">
                <h3 className="productTitle">{product.title}</h3>
                <p className="productPrice">€{Number(product.price).toFixed(2)}</p>
            </div>
        </Link>
    );
}
