import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProductById } from "../api/fakeStore";

export default function ProductDetailPage() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setLoading(true);
            setError(null);
            setProduct(null);

            try {
                const res = await fetchProductById(id);
                if (!res.ok) throw new Error(`Product request failed: ${res.status} ${res.statusText}`);
                const data = await res.json();
                if (!cancelled) setProduct(data);
            } catch (err) {
                if (!cancelled) setError(err?.message || "Failed to load product");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [id]);

    if (loading) return <div className="page"><p>Loading product...</p></div>;
    if (error) return <div className="page"><p style={{ color: "crimson" }}>{error}</p></div>;
    if (!product) return null;

    return (
        <div className="page productDetail">
            <h1 className="productDetailTitle">{product.title}</h1>

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
