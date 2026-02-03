import { useState, useEffect,useContext } from "react";
import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { ArrowRight, Star, Truck, Shield, Clock, Award } from "lucide-react"
import { getProducts } from "../api/products"
import MainImage from "../assets/MainImage.avif"

function Home() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts()
        console.log(response.data)
        // Take only first 4 products for featured section
        setProducts(response.data.slice(0, 4))
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fashion Designer",
      content: "Vendora has completely transformed how I source unique materials. The quality is consistently outstanding and delivery is super fast.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Tech Enthusiast",
      content: "Found some rare gadgets here that weren't available anywhere else. The secure payment process gave me total peace of mind.",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Home Decorator",
      content: "The variety of handcrafted items is amazing. I love supporting independent vendors through this platform.",
      rating: 4
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className='flex justify-center'>
        <motion.div
          className='relative w-full h-[45vh] md:h-[55vh] lg:h-[70vh] mx-4 md:mx-6 lg:mx-10 my-6 md:my-10 lg:my-15 overflow-hidden rounded-lg'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={MainImage} alt="image" className='w-full h-full object-cover' />
          <motion.div
            className='w-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className='w-full absolute bottom-0 p-5 md:p-8 lg:p-15 bg-gradient-to-t from-black/80 via-black/40 to-transparent'>
              <h1 className='text-3xl md:text-4xl lg:text-6xl text-center md:text-right py-4 md:py-6 lg:py-8 text-white font-bold'>Effortlessly selling</h1>
              <p className='text-sm md:text-base lg:text-lg text-center md:text-right font-sans text-white opacity-[80%] font-bold'>Discover quality products with fast shipping and secure checkout.</p>
              <Link
                to="/products"
                className="group hidden md:inline-flex items-center bg-white text-black px-5 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors overflow-hidden"
              >
                {/* Shop Now */}
                <span className="transition-transform duration-300 group-hover:translate-x-8">
                  Shop Now
                </span>

                {/* Arrow */}
                <div className="ml-2 flex items-center justify-center w-9 h-9 rounded-full bg-black text-white
                transition-transform duration-300 group-hover:-translate-x-24">
                  <ArrowRight size={18} />
                </div>
              </Link>

            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Why Vendora Section */}
      <section className="py-20 px-4 md:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Vendora?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We prioritize your shopping experience with top-notch services and guarantees.</p>
          </motion.div>

          {/* Demo Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Fast Delivery", desc: "Super smooth delivery to your doorstep within days." },
              { icon: Shield, title: "Secure Payment", desc: "100% secure payment gateways for carefree transactions." },
              { icon: Clock, title: "24/7 Support", desc: "Round-the-clock customer support for all your queries." },
              { icon: Award, title: "Top Quality", desc: "Curated products ensuring the beat quality standards." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray-600">Handpicked selections just for you</p>
            </div>
            <Link to="/products" className="flex items-center gap-2 font-semibold hover:underline">
              View All <ArrowRight size={20} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* 4 Products skeleton loading while fetching products */}
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <Link key={product._id} to={`/products/${product._id}`} className="group">
                  <div className="bg-gray-100 rounded-xl overflow-hidden mb-4 relative aspect-[4/5]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-gray-600 transition-colors truncate">{product.name}</h3>
                  <p className="text-gray-900 font-medium">₹{product.price.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-10 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-400">Trusted by thousands of happy shoppers worldwide.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-900 p-8 rounded-xl border border-gray-800"
              >
                <div className="flex gap-1 mb-4 text-yellow-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{review.content}"</p>
                <div>
                  <p className="font-bold">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;