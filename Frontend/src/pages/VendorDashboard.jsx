import { useContext, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Package, ShoppingCart, DollarSign, TrendingUp, Plus, AlertCircle } from "lucide-react"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { getVendorProducts } from "../api/products.js"
import { getVendorOrders } from "../api/orders.js"
import toast from "react-hot-toast"

function VendorDashboard() {
    const { user } = useContext(AuthContext)
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([]) // New state for orders
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDashboardData()
        const interval = setInterval(() => {
            fetchDashboardData()
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const fetchDashboardData = async () => {
        try {
            setLoading(true)

            console.log("Fetching vendor products & orders...")

            const productsPromise = getVendorProducts()
            const ordersPromise = getVendorOrders()

            const [productsRes, ordersRes] = await Promise.all([
                productsPromise,
                ordersPromise
            ])

            setProducts(productsRes.data.products || [])
            setOrders(ordersRes.data.orders || [])

        } catch (error) {
            console.error("Dashboard fetch failed:", error?.response || error)
            toast.error(error?.response?.data?.message || "Failed to load dashboard")
        } finally {
            setLoading(false)
        }
    }

    // Calculate real stats
    const stats = {
        totalProducts: products.length,
        totalRevenue: orders.reduce((sum, order) => {
            const vendorItems = order.items.filter(
            item => item.vendor?.toString() === user._id
            )

            const orderRevenue = vendorItems.reduce((itemSum, item) => {
            const price = Number(item.priceAtPurchase) || 0
            const qty = Number(item.quantity) || 0
            return itemSum + price * qty
            }, 0)

            return sum + orderRevenue
        }, 0),

        activeOrders: orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length,
        lowStockItems: products.filter(p => Number(p.stock) < 10).length
    }

    // Process recent orders for display
    const recentOrders = orders.slice(0, 5).map(order => {
        const vendorItems = order.items.filter(
            item => String(item.vendorId) === String(user._id)
        )

        const firstItem = vendorItems[0]

        return {
            id: order._id.slice(-6).toUpperCase(),
            customer: order.userId?.name || "Customer",
            product: firstItem
            ? `${firstItem.product?.name || "Product"}${
                vendorItems.length > 1
                    ? ` +${vendorItems.length - 1} more`
                    : ""
                }`
            : "No items",
            amount: vendorItems.reduce((sum, item) => {
                const price = Number(item.priceAtPurchase) || 0
                const qty = Number(item.quantity) || 0
                return sum + price * qty
            }, 0),
            status: order.status
        }
    })


    const lowStockProducts = products.filter(p => Number(p.stock) < 10).slice(0, 5)

    return (
        <div className="min-h-screen px-4 md:px-10 py-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Vendor Dashboard</h1>
                <p className="text-gray-600">Welcome back, {user?.name}!</p>
                {user?.businessName && (
                    <p className="text-lg font-semibold mt-1">{user.businessName}</p>
                )}
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <Package size={24} className="text-gray-700" />
                        </div>
                        <TrendingUp size={20} className="text-gray-400" />
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.totalProducts}</p>
                    <p className="text-gray-600 text-sm">Total Products</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <DollarSign size={24} className="text-gray-700" />
                        </div>
                        <TrendingUp size={20} className="text-gray-400" />
                    </div>
                    <p className="text-3xl font-bold mb-1">₹{stats.totalRevenue.toLocaleString()}</p>
                    <p className="text-gray-600 text-sm">Total Revenue</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <ShoppingCart size={24} className="text-gray-700" />
                        </div>
                        <TrendingUp size={20} className="text-gray-400" />
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.activeOrders}</p>
                    <p className="text-gray-600 text-sm">Active Orders</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <AlertCircle size={24} className="text-gray-700" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.lowStockItems}</p>
                    <p className="text-gray-600 text-sm">Low Stock Alerts</p>
                </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
            >
                <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link
                        to="/vendor/products/add"
                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center gap-3 hover:bg-gray-50"
                    >
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <Plus size={24} className="text-gray-700" />
                        </div>
                        <span className="font-semibold text-center">Add Product</span>
                    </Link>

                    <Link
                        to="/vendor/products"
                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center gap-3 hover:bg-gray-50"
                    >
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <Package size={24} className="text-gray-700" />
                        </div>
                        <span className="font-semibold text-center">My Products</span>
                    </Link>

                    <button
                        onClick={() => toast("Orders feature coming soon!")}
                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center gap-3 hover:bg-gray-50"
                    >
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <ShoppingCart size={24} className="text-gray-700" />
                        </div>
                        <span className="font-semibold text-center">View Orders</span>
                    </button>

                    <button
                        onClick={() => toast("Analytics feature coming soon!")}
                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center gap-3 hover:bg-gray-50"
                    >
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <TrendingUp size={24} className="text-gray-700" />
                        </div>
                        <span className="font-semibold text-center">Analytics</span>
                    </button>
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Low Stock Products */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <AlertCircle className="text-orange-500" />
                            Low Stock Alerts
                        </h2>

                        {lowStockProducts.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-600">All products are well stocked!</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {lowStockProducts.map((product) => (
                                    <div
                                        key={product._id}
                                        className="border border-orange-200 bg-orange-50 rounded-lg p-4"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-semibold">{product.name}</p>
                                                <p className="text-sm text-gray-600">₹{product.price}</p>
                                            </div>
                                            <span className="px-3 py-1 bg-orange-200 text-orange-700 rounded-full text-sm font-medium">
                                                {product.stock} left
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Recent Orders */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>

                        {recentOrders.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-600">No orders yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {recentOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="border border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-colors"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="font-semibold">{order.id}</p>
                                                <p className="text-sm text-gray-600">{order.customer}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                        'bg-blue-100 text-blue-800'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700 mb-1">{order.product}</p>
                                        <p className="font-bold">₹{order.amount.toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default VendorDashboard
