import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Package } from "lucide-react"

function ProductCard({ product }) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/products/${product._id}`)
    }

    return (
        <motion.div
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            whileHover={{ y: -5 }}
            onClick={handleClick}
        >
            {/* Product Image Placeholder */}
            <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <Package size={64} className="text-gray-400" />
            </div>

            {/* Product Info */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                    {product.name}
                </h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">
                        ₹{product.price.toLocaleString()}
                    </span>

                    {product.stock > 0 ? (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                            In Stock ({product.stock})
                        </span>
                    ) : (
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                            Out of Stock
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard
