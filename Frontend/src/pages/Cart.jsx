import { useCart } from "../context/CartContext"
import { motion } from "framer-motion"
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

function Cart() {
    const navigate = useNavigate()
    const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart()

    const subtotal = getCartTotal()
    const shipping = subtotal > 500 ? 0 : 50
    const total = subtotal + shipping

    const handleCheckout = () => {
        navigate("/checkout")
    }

    return (
        <div className="min-h-screen px-4 md:px-10 py-8">
            {/* Back Button */}
            <motion.button
                onClick={() => navigate("/products")}
                className="flex items-center gap-2 mb-6 text-gray-700 hover:text-black transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: -5 }}
            >
                <ArrowLeft size={20} />
                <span>Continue Shopping</span>
            </motion.button>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Shopping Cart</h1>
                <p className="text-gray-600">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
            </motion.div>

            {cart.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                >
                    <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                    <p className="text-gray-500 mb-6">Add some products to get started!</p>
                    <button
                        onClick={() => navigate("/products")}
                        className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
                    >
                        Browse Products
                    </button>
                </motion.div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
                            >
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* Product Image Placeholder */}
                                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <ShoppingCart size={32} className="text-gray-400" />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                                        <p className="text-xl font-semibold text-gray-900 mb-3">
                                            ₹{item.price.toLocaleString()}
                                        </p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                                className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                disabled={item.quantity >= (item.stock || 100)}
                                                className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                            >
                                                <Plus size={16} />
                                            </button>
                                            <span className="text-sm text-gray-500 ml-2">
                                                ({item.stock || 100} available)
                                            </span>
                                        </div>
                                    </div>

                                    {/* Remove Button & Subtotal */}
                                    <div className="flex md:flex-col items-end justify-between md:justify-start gap-4">
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="text-red-600 hover:text-red-800 transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                        <p className="text-lg font-bold">
                                            ₹{(item.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 sticky top-8">
                            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Shipping</span>
                                    <span className="font-semibold">
                                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                                    </span>
                                </div>
                                {shipping === 0 && (
                                    <p className="text-sm text-green-600">🎉 You qualify for free shipping!</p>
                                )}
                                {shipping > 0 && (
                                    <p className="text-sm text-gray-500">
                                        Add ₹{(500 - subtotal).toLocaleString()} more for free shipping
                                    </p>
                                )}
                                <div className="border-t pt-3 flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors"
                            >
                                Proceed to Checkout
                            </button>

                            <div className="mt-4 space-y-2 text-sm text-gray-600">
                                <p>• Secure checkout</p>
                                <p>• 7-day return policy</p>
                                <p>• Cash on delivery available</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}

export default Cart
