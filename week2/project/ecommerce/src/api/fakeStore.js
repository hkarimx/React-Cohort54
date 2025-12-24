const BASE_URL = "https://fakestoreapi.com";

async function request(path) {
    const res = await fetch(`${BASE_URL}${path}`);
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }
    return res.json();
}

export function fetchCategories() {
    return request("/products/categories");
}

export function fetchProducts(category) {
    if (!category) return request("/products");
    return request(`/products/category/${encodeURIComponent(category)}`);
}

export function fetchProductById(id) {
    return request(`/products/${id}`);
}
