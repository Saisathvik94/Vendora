import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Package, Search, Filter } from "lucide-react"
import toast from "react-hot-toast"
import { getUserOrders } from "../api/orders.js"
import Loader from "../components/Loader.jsx"

function Orders() {
    const [searchQuery, setSearchQuery] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [expandedOrder, setExpandedOrder] = useState(null);

    const toggleDetails = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const response = await getUserOrders();
            setOrders(response.data.orders || [])
        } catch (error) {
            console.error("Error fetching orders:", error)
            toast.error("Failed to load orders")
        } finally {
            setLoading(false)
        }
    }

    const getStatusColor = (status) => {
        const colors = {
            Delivered: "bg-green-100 text-green-700 border-green-200",
            Shipped: "bg-blue-100 text-blue-700 border-blue-200",
            Processing: "bg-yellow-100 text-yellow-700 border-yellow-200",
            Pending: "bg-gray-100 text-gray-700 border-gray-200",
            Cancelled: "bg-red-100 text-red-700 border-red-200"
        }
        return colors[status] || colors.Pending
    }

    // Filter orders
    const filteredOrders = orders
        .filter(order => {
            const matchesSearch = order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
            const matchesStatus = filterStatus === "all" || order.status.toLowerCase() === filterStatus.toLowerCase()
            return matchesSearch && matchesStatus
        })

    if (loading) {
        return <Loader message="Loading your orders..." />
    }

    return (
        <div className="min-h-screen px-4 md:px-10 py-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-2">My Orders</h1>
                <p className="text-gray-600">Track and manage your orders</p>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-8 flex flex-col md:flex-row gap-4"
            >
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by order ID or product..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                {/* Status Filter */}
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
                >
                    <option value="all">All Orders</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </motion.div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center py-20"
                >
                    <Package size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                        No orders found
                    </h3>
                    <p className="text-gray-500">
                        {searchQuery || filterStatus !== "all"
                            ? "Try adjusting your filters"
                            : "Start shopping to see your orders here"}
                    </p>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                >
                    {filteredOrders.map((order, index) => (
                        <motion.div
                            key={order._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                        >
                            {/* Order Header */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 pb-4 border-b">
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Order #{order._id.slice(-8)}</h3>
                                    <p className="text-sm text-gray-600">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span className={`mt-2 md:mt-0 px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>

                            {/* Order Details */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Products</h4>
                                    <ul className="space-y-1">
                                        {order.items.map((item, idx) => (
                                            <li key={idx} className="text-gray-800">• {item.product.name} (x{item.quantity})</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Order Info</h4>
                                    <div className="space-y-1">
                                        <p className="text-gray-800">
                                            <span className="font-semibold">Total:</span> ₹{order.totalAmount.toLocaleString()}
                                        </p>
                                        <p className="text-gray-800">
                                            <span className="font-semibold">Tracking ID:</span> {order._id.slice(-8)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Actions */}
                            <div className="mt-4 pt-4 border-t flex flex-wrap gap-3">
                                <button
                                    onClick={() => toast("Coming Soon")}
                                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                                >
                                    Track Order
                                </button>
                                <button
                                onClick={() => toggleDetails(order._id)}
                                className="px-2 py-1 text-sm border rounded"
                                >
                                    {expandedOrder === order._id ? "Hide Details" : "View Details"}
                                </button>
                                {order.status === "Delivered" && (
                                    <button
                                        onClick={() => toast.success("Thank you for your feedback!")}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:border-black transition-colors text-sm font-medium"
                                    >
                                        Write Review
                                    </button>
                                )}
                            </div>
                            {/* Expanded Details */}
                            {expandedOrder === order._id && (
                                <div className="mt-4 text-sm text-gray-700 border-t pt-4 space-y-2">
                                <p><strong>Products:</strong></p>
                                <ul className="list-disc ml-5">
                                    {order.items.map((item, idx) => (
                                    <li key={idx}>
                                        {item.product.name} x {item.quantity} - ₹{item.priceAtPurchase}
                                    </li>
                                    ))}
                                </ul>
                                <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                                <p><strong>Payment Method:</strong> {order.payment?.method || "COD"}</p>
                                <p><strong>Status:</strong> {order.status}</p>
                                <p><strong>Placed on:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* Results count */}
            {filteredOrders.length > 0 && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 text-center text-gray-600"
                >
                    Showing {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}
                </motion.p>
            )}
        </div>
    )
}

export default Orders
