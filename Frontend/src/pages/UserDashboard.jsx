import { useContext, useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Package, ShoppingBag, Edit2, Save, X } from "lucide-react"
import { AuthContext } from "../context/AuthContext"
import { getUserOrders } from "../api/orders"
import { Link } from "react-router-dom"
import { updateUserProfile } from "../api/users.js"
import Loader from "../components/Loader"
import toast from "react-hot-toast"
import { useEffect } from "react"

function UserDashboard() {
    const { user, setUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const [recentOrders, setrecentOrders] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editedName, setEditedName] = useState(user?.name || "")


    useEffect(()=>{
        const recentOrders = async() => {
            try {
                setLoading(true)
                const response = await getUserOrders();
                setrecentOrders(response.data.orders || [])
            } catch (error) {
                console.error("Error fetching orders:", error)
                toast.error("Failed to load orders")
            } finally {
                setLoading(false)
            }
        }
        recentOrders();
    }, [])


    const stats = {
        totalOrders: recentOrders.length,
        activeOrders: recentOrders.filter(o => o.status !== "Delivered" && o.status !== "Cancelled").length,
        totalSpent: recentOrders.reduce((acc, order) => acc + (order.totalAmount || 0), 0)
    }


    const handleSaveProfile = async() => {
        try {
            if (!editedName.trim()) {
            toast.error("Name cannot be empty")
            return
            }

            setLoading(true)

            const response = await updateUserProfile({
            name: editedName
            })

            // Update global auth user
            setUser(response.data.UpdatedUser)

            toast.success("Profile updated successfully!")
            setIsEditing(false)
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "Failed to update profile")
        } finally {
            setLoading(false)
        }
    }

    const handleCancelEdit = () => {
        setEditedName(user?.name || "")
        setIsEditing(false)
    }

    const getStatusColor = (status) => {
        const colors = {
            Delivered: "bg-green-100 text-green-700",
            Shipped: "bg-blue-100 text-blue-700",
            Processing: "bg-yellow-100 text-yellow-700",
            Pending: "bg-gray-100 text-gray-700"
        }
        return colors[status] || colors.Pending
    }

    if (loading) {
        return <Loader message="Loading your dashboard..." />
    }


    return (
        <div className="min-h-screen px-4 md:px-10 py-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-2">My Dashboard</h1>
                <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <ShoppingBag size={24} className="text-gray-700" />
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Total Orders</p>
                            <p className="text-3xl font-bold">{stats.totalOrders}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <Package size={24} className="text-gray-700" />
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Active Orders</p>
                            <p className="text-3xl font-bold">{stats.activeOrders}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-gray-700 text-xl font-bold">₹</span>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Total Spent</p>
                            <p className="text-3xl font-bold">₹{stats.totalSpent.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-1"
                >
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Profile</h2>
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <Edit2 size={20} />
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSaveProfile}
                                        className="p-2 hover:bg-green-100 rounded-full transition-colors text-green-600"
                                    >
                                        <Save size={20} />
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="p-2 hover:bg-red-100 rounded-full transition-colors text-red-600"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            {/* Profile Picture */}
                            <div className="flex justify-center mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                                    <User size={48} className="text-gray-600" />
                                </div>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="text-sm text-gray-600 mb-1 block">Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                ) : (
                                    <p className="text-lg font-semibold">{user?.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-sm text-gray-600 mb-1 block">Email</label>
                                <p className="text-lg">{user?.email}</p>
                            </div>

                            {/* Role */}
                            <div>
                                <label className="text-sm text-gray-600 mb-1 block">Role</label>
                                <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm capitalize">
                                    {user?.role}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Recent Orders */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-2"
                >
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Recent Orders</h2>
                            <Link
                                to="/orders"
                                className="text-sm text-gray-600 hover:text-black transition-colors"
                            >
                                View All →
                            </Link>
                        </div>

                        {recentOrders.length === 0 ? (
                            <div className="text-center py-12">
                                <Package size={48} className="mx-auto text-gray-300 mb-3" />
                                <p className="text-gray-600">No orders yet</p>
                                <Link
                                    to="/products"
                                    className="inline-block mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                                >
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recentOrders.map((order) => (
                                    <div
                                        key={order._id}
                                        className="border border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-colors"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                {order.items.map((item) => (
                                                <p key={item._id} className="font-semibold text-lg">
                                                    {item.product?.name} × {item.quantity}
                                                </p>
                                                ))}

                                                <p className="text-sm text-gray-600">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-xl font-bold">₹{order.totalAmount.toLocaleString()}</p>
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

export default UserDashboard
