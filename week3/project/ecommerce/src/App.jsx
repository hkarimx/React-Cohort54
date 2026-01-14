import { Routes, Route, Navigate } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import FavouritesPage from "./pages/FavouritesPage";
import NavBar from "./components/NavBar";
import "./index.css";

export default function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<ProductListPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/favourites" element={<FavouritesPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
}
