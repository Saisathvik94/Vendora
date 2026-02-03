import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, MapPin, CreditCard } from "lucide-react"
import { useCart } from "../context/CartContext"
import toast from "react-hot-toast"
import api from "../api/axios"

function Checkout() {
    const navigate = useNavigate()
    const { cart, getCartTotal, clearCart } = useCart()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        paymentMethod: "COD"
    })

    const subtotal = getCartTotal()
    const shippingCost = subtotal > 500 ? 0 : 50
    const total = subtotal + shippingCost

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (cart.length === 0) {
            toast.error("Your cart is empty")
            return
        }

        setLoading(true)

        try {
            const orderData = {
                items: cart.map(item => ({
                    productId: item._id,
                    quantity: item.quantity
                })),
                shippingAddress: {
                    fullName: formData.fullName,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode
                },
                paymentMethod: formData.paymentMethod
            }


            const response = await api.post("/orders", orderData)

            toast.success("Order placed successfully!")
            clearCart()
            navigate("/orders")
        } catch (error) {
            console.error("Error placing order:", error)
            toast.error(error.response?.data?.message || "Failed to place order")
        } finally {
            setLoading(false)
        }
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen px-4 md:px-10 py-8">
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                    <button
                        onClick={() => navigate("/products")}
                        className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
                    >
                        Browse Products
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen px-4 md:px-10 py-8">
            {/* Back Button */}
            <motion.button
                onClick={() => navigate("/cart")}
                className="flex items-center gap-2 mb-6 text-gray-700 hover:text-black transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: -5 }}
            >
                <ArrowLeft size={20} />
                <span>Back to Cart</span>
            </motion.button>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Checkout</h1>
                <p className="text-gray-600">Complete your order</p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Checkout Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Shipping Address */}
                        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin size={24} />
                                <h2 className="text-2xl font-bold">Shipping Address</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        pattern="[0-9]{10}"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2">Address *</label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        rows="3"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">State *</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2">Pincode *</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        required
                                        pattern="[0-9]{6}"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                            <div className="flex items-center gap-2 mb-4">
                                <CreditCard size={24} />
                                <h2 className="text-2xl font-bold">Payment Method</h2>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-black transition-colors">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="COD"
                                        checked={formData.paymentMethod === "COD"}
                                        onChange={handleChange}
                                        className="w-4 h-4"
                                    />
                                    <span className="font-medium">Cash on Delivery (COD)</span>
                                </label>
                                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-black transition-colors">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Online"
                                        checked={formData.paymentMethod === "Online"}
                                        onChange={handleChange}
                                        className="w-4 h-4"
                                    />
                                    <span className="font-medium">Online Payment (Coming Soon)</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Placing Order..." : "Place Order"}
                        </button>
                    </form>
                </motion.div>

                {/* Order Summary */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-1"
                >
                    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 sticky top-8">
                        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            {cart.map((item) => (
                                <div key={item._id} className="flex justify-between text-sm">
                                    <span className="text-gray-700">
                                        {item.name} x {item.quantity}
                                    </span>
                                    <span className="font-semibold">
                                        ₹{(item.price * item.quantity).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-3">
                            <div className="flex justify-between text-gray-700">
                                <span>Subtotal</span>
                                <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Shipping</span>
                                <span className="font-semibold">
                                    {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                                </span>
                            </div>
                            <div className="border-t pt-3 flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Checkout
