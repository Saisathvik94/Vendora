import api from "./axios"


// Get all products (home, shop)
export const getProducts = (params) =>
  api.get("/products", { params })

// Get single product
export const getProductById = (productId) =>
  api.get(`/products/${productId}`)



// Create product
export const createProduct = (data) =>
  api.post("/vendor/products", data)

// Get vendor's products
export const getVendorProducts = () =>
  api.get("/vendor/products")

// Update product
export const updateVendorProduct = (productId, data) =>
  api.patch(`/vendor/product/${productId}`, data)

// Delete product
export const deleteVendorProduct = (productId) =>
  api.delete(`/vendor/product/${productId}`)