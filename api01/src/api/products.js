import api from "./index";

export const getProducts = async () => {
    const response = await api.get('/products')
    // const data = await response.data
    // return data
    return response.data
}

export const getProduct = async (id) => {
    const response = await api.get(`/products/${id}`)
    return response.data
}

export const getCategories = async () => {
    const response = await api.get('/products/categpries')
    return response.data
}

export const getProductsByCategory = async (category) => {
    const response = await api.get(`/products/category/${category}`)
    return response.data
}