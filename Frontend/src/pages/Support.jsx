import { motion } from "framer-motion"
import { Mail, MessageCircle, Phone, Send, MapPin } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

function Support() {
    const [openFaq, setOpenFaq] = useState(null)
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })

    const handleSubmit = (e) => {
        e.preventDefault()
        // Simulate API call
        toast.success("Message sent successfully! We'll get back to you soon.")
        setFormData({ name: "", email: "", subject: "", message: "" })
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const faqs = [
        {
            question: "How do I create a vendor account?",
            answer: "Click on 'Get Started' in the navigation bar, then select 'Sign Up as Vendor'. Fill in your business details and you'll be ready to start selling!"
        },
        {
            question: "What payment methods are accepted?",
            answer: "We accept all major credit/debit cards, UPI, net banking, and digital wallets for secure transactions."
        },
        {
            question: "How long does shipping take?",
            answer: "Shipping typically takes 3-7 business days depending on your location. You can track your order status from your dashboard."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 7-day return policy for most products. Items must be unused and in original packaging. Contact the vendor directly to initiate a return."
        }
    ]

    return (
        <div className="min-h-screen pb-20">
            {/* Hero Section */}
            <div className="bg-gray-900 text-white py-20 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">How can we help?</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Search our help center or contact our support team for assistance.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-10 -mt-10">
                {/* Contact Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-20">
                    {[
                        {
                            icon: Mail,
                            title: "Email Us",
                            info: "support@vendora.com",
                            sub: "Response within 24h",
                            // action: () => window.location.href = "mailto:support@vendora.com"
                        },
                        {
                            icon: Phone,
                            title: "Call Us",
                            info: "+91 1234567890",
                            sub: "Mon-Fri, 9am-6pm",
                        },
                        {
                            icon: MessageCircle,
                            title: "Live Chat",
                            info: "Start a Chat",
                            sub: "Available 24/7",
                        },
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={item.action}
                            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center cursor-pointer hover:shadow-xl transition-shadow group"
                        >
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-black group-hover:bg-black group-hover:text-white transition-colors">
                                <item.icon size={24} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                            <p className="text-blue-600 font-medium mb-1 group-hover:text-black transition-colors">{item.info}</p>
                            <p className="text-sm text-gray-500">{item.sub}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                    placeholder="How can we help?"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                    placeholder="Describe your issue..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full md:w-auto px-8 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                            >
                                Send Message <Send size={18} />
                            </button>
                        </form>
                    </motion.div>

                    {/* FAQ Accordion */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-xl overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="font-semibold text-gray-800">{faq.question}</span>
                                        <span className="text-gray-400 text-xl">
                                            {openFaq === index ? "−" : "+"}
                                        </span>
                                    </button>
                                    {openFaq === index && (
                                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Support
