import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Upload } from "lucide-react"
import { createProduct } from "../api/products"
import toast from "react-hot-toast"

function AddProduct() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)

            const productData = {
                name: formData.name.trim(),
                description: formData.description.trim(),
                price: Number(formData.price),
                stock: Number(formData.stock)
            }

            await createProduct(productData)

            toast.success("Product added successfully!")

            // Reset form
            setFormData({
                name: "",
                description: "",
                price: "",
                stock: ""
            })

            // Navigate to products page after a short delay
            setTimeout(() => {
                navigate("/vendor/products")
            }, 1000)

        } catch (error) {
            console.error("Error creating product:", error)
            toast.error(error.response?.data?.message || "Failed to add product")
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        navigate("/vendor/products")
    }

    return (
        <div className="min-h-screen px-4 md:px-10 py-8">
            {/* Back Button */}
            <motion.button
                onClick={handleCancel}
                className="flex items-center gap-2 mb-6 text-gray-700 hover:text-black transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: -5 }}
            >
                <ArrowLeft size={20} />
                <span>Back to Products</span>
            </motion.button>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Add New Product</h1>
                <p className="text-gray-600">Fill in the details to add a product to your inventory</p>
            </motion.div>

            {/* Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-3xl mx-auto"
            >
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg">
                    {/* Product Name */}
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                            Product Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., Premium Wireless Headphones"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                            Description *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your product in detail..."
                            rows="5"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                            required
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            {formData.description.length} characters
                        </p>
                    </div>

                    {/* Price and Stock */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                                Price (₹) *
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0"
                                min="0"
                                step="0.01"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                required
                            />
                        </div>

                        {/* Stock */}
                        <div>
                            <label htmlFor="stock" className="block text-sm font-semibold text-gray-700 mb-2">
                                Stock Quantity *
                            </label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="0"
                                min="0"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                required
                            />
                        </div>
                    </div>

                    {/* Image Upload Placeholder */}
                    <div className="mb-8">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Product Image
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <Upload size={48} className="mx-auto text-gray-400 mb-3" />
                            <p className="text-gray-600 mb-2">Image upload coming soon</p>
                            <p className="text-sm text-gray-500">For now, we'll use a placeholder image</p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                        >
                            {loading ? "Adding Product..." : "Add Product"}
                        </motion.button>

                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={loading}
                            className="flex-1 sm:flex-none px-8 py-3 border-2 border-gray-300 rounded-full font-semibold hover:border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default AddProduct
