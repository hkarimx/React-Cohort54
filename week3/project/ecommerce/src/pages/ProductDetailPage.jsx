import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/fakeStore";
import useFetch from "../hooks/useFetch";
import FavouriteButton from "../components/FavouriteButton";

export default function ProductDetailPage() {
    const { id } = useParams();

    const { data: product, loading, error } = useFetch(
        async () => fetchProductById(id),
        [id]
    );

    if (loading) return <div className="page"><p>Loading product...</p></div>;
    if (error) return <div className="page"><p style={{ color: "crimson" }}>{error}</p></div>;
    if (!product) return null;

    return (
        <div className="page productDetail">
            <div className="productDetailHeader">
                <h1 className="productDetailTitle">{product.title}</h1>
                <FavouriteButton productId={product.id} className="favOnDetail" />
            </div>

            <div className="productDetailBody">
                <div className="productDetailInfo">
                    <p className="productDetailDesc">{product.description}</p>
                </div>

                <div className="productDetailImageWrap">
                    <img className="productDetailImage" src={product.image} alt={product.title} />
                </div>
            </div>
        </div>
    );
}
