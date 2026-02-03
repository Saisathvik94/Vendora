import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, ShoppingCart, Package, Minus, Plus } from "lucide-react"
import { getProductById } from "../api/products"
import Loader from "../components/Loader.jsx"
import toast from "react-hot-toast"
import { useCart } from "../context/CartContext.jsx"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function ProductDetails() {
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        fetchProduct()
    }, [id])

    const fetchProduct = async () => {
        try {
            setLoading(true)
            const response = await getProductById(id)
            setProduct(response.data)
        } catch (error) {
            console.error("Error fetching product:", error)
            toast.error("Failed to load product details")
            navigate("/products")
        } finally {
            setLoading(false)
        }
    }

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity)
        }
    }

    const handleAddToCart = () => {
        if (!user) {
            toast.error("Please login to add items to cart")
            navigate("/login", { state: { from: `/products/${id}` } })
            return
        }

        addToCart(product, quantity)
        toast.success("Added to cart")
        setQuantity(1)
    }

    if (loading) {
        return <Loader message="Loading product details..." />
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl text-gray-600">Product not found</p>
            </div>
        )
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
                <span>Back to Products</span>
            </motion.button>

            {/* Product Details Grid */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Product Image */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-12 flex items-center justify-center aspect-square"
                >
                    <Package size={120} className="text-gray-400" />
                </motion.div>

                {/* Product Info */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col justify-center"
                >
                    {/* Product Name */}
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>

                    {/* Price */}
                    <div className="mb-6">
                        <span className="text-4xl font-bold text-gray-900">
                            ₹{product.price.toLocaleString()}
                        </span>
                    </div>

                    {/* Stock Status */}
                    {product.stock > 0 ? (
                        <div className="mb-6">
                            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                In Stock ({product.stock} available)
                            </span>
                        </div>
                    ) : (
                        <div className="mb-6">
                            <span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                                Out of Stock
                            </span>
                        </div>
                    )}

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-3">Description</h3>
                        <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    </div>

                    {/* Quantity Selector */}
                    {product.stock > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity <= 1}
                                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="text-2xl font-semibold w-12 text-center">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    disabled={quantity >= product.stock}
                                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Add to Cart Button */}
                    {product.stock > 0 ? (
                        <motion.button
                            onClick={handleAddToCart}
                            className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <ShoppingCart size={24} />
                            Add to Cart
                        </motion.button>
                    ) : (
                        <button
                            disabled
                            className="w-full bg-gray-300 text-gray-500 py-4 rounded-full font-semibold text-lg cursor-not-allowed"
                        >
                            Out of Stock
                        </button>
                    )}

                    {/* Additional Info */}
                    <div className="mt-8 space-y-2 text-sm text-gray-600">
                        <p>• Free shipping on orders over ₹500</p>
                        <p>• 7-day return policy</p>
                        <p>• Secure checkout</p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default ProductDetails
