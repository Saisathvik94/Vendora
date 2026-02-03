import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

import { motion } from "framer-motion"


import { useState } from "react"
import toast from "react-hot-toast"

function Footer() {
    const [email, setEmail] = useState("")

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (!email) return
        toast.success("Thanks for subscribing to our newsletter!")
        setEmail("")
    }

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-black text-white pt-16 pb-8"
        >
            <div className="max-w-7xl mx-auto px-4 md:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
                >
                    {/* Brand Info */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Vendora</h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Your one-stop destination for quality products. We connect unique vendors with customers who value excellence and style.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">Shop</Link>
                            </li>
                            <li>
                                <Link to="/aboutus" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
                            </li>
                            <li>
                                <Link to="/support" className="text-gray-400 hover:text-white transition-colors">Support</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400">
                                <MapPin className="shrink-0 mt-1" size={18} />
                                <span>Hyderabad, India</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Phone size={18} />
                                <span>+91 1234567890</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Mail size={18} />
                                <span>support@vendora.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Newsletter</h3>
                        <p className="text-gray-400 mb-4">Subscribe to get updates on new products and special offers.</p>
                        <form onSubmit={handleSubscribe} className="space-y-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white text-white placeholder-gray-500"
                            />
                            <button type="submit" className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                Subscribe <ArrowRight size={18} />
                            </button>
                        </form>
                    </div>
                </motion.div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Vendora. All rights reserved.</p>
                </div>
            </div>
        </motion.footer>
    )
}

export default Footer
