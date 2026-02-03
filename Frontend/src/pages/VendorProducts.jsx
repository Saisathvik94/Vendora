import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Package, Search, Edit2, Trash2, AlertTriangle } from "lucide-react"
import { Link } from "react-router-dom"
import { getVendorProducts, deleteVendorProduct, updateVendorProduct } from "../api/products.js"
import Loader from "../components/Loader.jsx"
import toast from "react-hot-toast"

function VendorProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [editingId, setEditingId] = useState(null)
    const [editForm, setEditForm] = useState({})

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const response = await getVendorProducts()
            setProducts(response.data.products || [])
        } catch (error) {
            console.error("Error fetching products:", error)
            toast.error("Failed to load products")
            setProducts([])
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (productId, productName) => {
        if (!confirm(`Are you sure you want to delete "${productName}"?`)) {
            return
        }

        try {
            await deleteVendorProduct(productId)
            setProducts(products.filter(p => p._id !== productId))
            toast.success("Product deleted successfully!")
        } catch (error) {
            console.error("Error deleting product:", error)
            toast.error("Failed to delete product")
        }
    }

    const handleEditStart = (product) => {
        setEditingId(product._id)
        setEditForm({
            name: product.name,
            price: product.price,
            stock: product.stock,
            description: product.description
        })
    }

    const handleEditCancel = () => {
        setEditingId(null)
        setEditForm({})
    }

    const handleEditSave = async (productId) => {
        try {
            await updateVendorProduct(productId, editForm)
            setProducts(products.map(p =>
                p._id === productId ? { ...p, ...editForm } : p
            ))
            setEditingId(null)
            setEditForm({})
            toast.success("Product updated successfully!")
        } catch (error) {
            console.error("Error updating product:", error)
            toast.error("Failed to update product")
        }
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (loading) {
        return <Loader message="Loading your products..." />
    }

    return (
        <div className="min-h-screen px-4 md:px-10 py-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">My Products</h1>
                    <p className="text-gray-600">Manage your product inventory</p>
                </div>
                <Link
                    to="/vendor/products/add"
                    className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
                >
                    + Add New Product
                </Link>
            </motion.div>

            {/* Search */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
            >
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
            </motion.div>

            {/* Products Table/List */}
            {filteredProducts.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center py-20"
                >
                    <Package size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                        {searchQuery ? "No products found" : "No products yet"}
                    </h3>
                    <p className="text-gray-500 mb-6">
                        {searchQuery ? "Try adjusting your search" : "Start adding products to your inventory"}
                    </p>
                    {!searchQuery && (
                        <Link
                            to="/vendor/products/add"
                            className="inline-block px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
                        >
                            Add Your First Product
                        </Link>
                    )}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Product</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Stock</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product._id} className="border-b hover:bg-gray-50 transition-colors">
                                        {editingId === product._id ? (
                                            <>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="text"
                                                        value={editForm.name}
                                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                        className="w-full px-2 py-1 border rounded"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="number"
                                                        value={editForm.price}
                                                        onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                                                        className="w-24 px-2 py-1 border rounded"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="number"
                                                        value={editForm.stock}
                                                        onChange={(e) => setEditForm({ ...editForm, stock: Number(e.target.value) })}
                                                        className="w-20 px-2 py-1 border rounded"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${editForm.stock > 10 ? 'bg-green-100 text-green-700' :
                                                        editForm.stock > 0 ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-red-100 text-red-700'
                                                        }`}>
                                                        {editForm.stock > 10 ? 'In Stock' : editForm.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleEditSave(product._id)}
                                                        className="px-3 py-1 bg-green-600 text-white rounded mr-2 hover:bg-green-700"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={handleEditCancel}
                                                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                                                    >
                                                        Cancel
                                                    </button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{product.name}</p>
                                                        <p className="text-sm text-gray-500 truncate max-w-xs">{product.description}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-semibold">₹{product.price.toLocaleString()}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-medium">{product.stock}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.stock > 10 ? 'bg-green-100 text-green-700' :
                                                        product.stock > 0 ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-red-100 text-red-700'
                                                        }`}>
                                                        {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleEditStart(product)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-2"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product._id, product.name)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden divide-y">
                        {filteredProducts.map((product) => (
                            <div key={product._id} className="p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">{product.name}</h3>
                                        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                                    </div>
                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${product.stock > 10 ? 'bg-green-100 text-green-700' :
                                        product.stock > 0 ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                        {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low' : 'Out'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-xl font-bold">₹{product.price.toLocaleString()}</p>
                                        <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEditStart(product)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id, product.name)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Results count */}
            {filteredProducts.length > 0 && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 text-center text-gray-600"
                >
                    Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </motion.p>
            )}
        </div>
    )
}

export default VendorProducts
