import api from "./axios"


// Create order (checkout)
export const createOrder = (data) =>
  api.post("/orders", data)

// Get logged-in user's orders
export const getMyOrders = () =>
  api.get("/orders/my")

// Get single order (user)
export const getOrderById = (orderId) =>
  api.get(`/orders/${orderId}`)



// Get orders that contain vendor products
export const getVendorOrders = () =>
  api.get("/vendor/orders")

// Update order status (vendor side)
export const updateOrderStatus = (orderId, data) =>
  api.patch(`/vendor/orders/${orderId}`, data)



// Get all orders (admin)
export const getAllOrders = () =>
  api.get("/admin/orders")

// Update any order (admin)
export const adminUpdateOrder = (orderId, data) =>
  api.patch(`/admin/orders/${orderId}`, data)
