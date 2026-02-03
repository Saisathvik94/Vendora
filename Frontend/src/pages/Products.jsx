import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, SlidersHorizontal, Package } from "lucide-react"
import { getProducts } from "../api/products"
import ProductCard from "../components/ProductCard.jsx"
import Loader from "../components/Loader.jsx"
import toast from "react-hot-toast"

function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("newest")
    const [filterOpen, setFilterOpen] = useState(false)



    useEffect(()=>{
        const fetchProducts = async() =>{
            try{
                const response = await getProducts()
                if(response){
                    setProducts(response.data)
                }
            } catch(error){
                toast.error("Products not found")
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])


    // Filter and sort products
    const filteredProducts = products
        .filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortBy) {
                case "price-low":
                    return a.price - b.price
                case "price-high":
                    return b.price - a.price
                case "name":
                    return a.name.localeCompare(b.name)
                case "newest":
                default:
                    return new Date(b.createdAt) - new Date(a.createdAt)
            }
        })

    if (loading) {
        return <Loader message="Loading products..." />
    }

    return (
        <div className="min-h-screen px-4 md:px-10 py-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Our Products</h1>
                <p className="text-gray-600">Discover quality products with fast shipping</p>
            </motion.div>

            {/* Search and Filter Bar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8 flex flex-col md:flex-row gap-4"
            >
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                {/* Sort */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
                >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                </select>
            </motion.div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                >
                    <Package size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                        No products found
                    </h3>
                    <p className="text-gray-500">
                        {searchQuery ? "Try adjusting your search" : "Check back soon for new products"}
                    </p>
                </motion.div>
            ) : (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    {filteredProducts.map((product) => (
                        <motion.div
                            key={product._id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* Results count */}
            {filteredProducts.length > 0 && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 text-center text-gray-600"
                >
                    Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </motion.p>
            )}
        </div>
    )
}

export default Products;
