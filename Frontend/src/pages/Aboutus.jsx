import { motion } from "framer-motion"
import { Package, Users, Zap, Shield, Target, Award } from "lucide-react"
import Saisathvik from "../assets/Saisathvik.jfif"
import SathvikGoud from "../assets/SathvikGoud.png"

function Aboutus() {
    const stats = [
        { label: "Active Users", value: "50k+" },
        { label: "Products Listed", value: "10k+" },
        { label: "Vendors", value: "500+" },
        { label: "Countries", value: "20+" }
    ]

    const team = [
        { name: "Sai Sathvik", role: "CEO & Founder", image: Saisathvik},
        { name: "Sathvik Goud", role: "Head of Operations", image: SathvikGoud}
    ]

    return (
        <div className="min-h-screen">
            {/* Header / Hero */}
            <div className="bg-black text-white py-20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Empowering Commerce</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        We're on a mission to democratize online selling, connecting unique vendors with customers worldwide.
                    </p>
                </motion.div>
            </div>

            <div className="px-4 md:px-10 py-16">
                {/* Stats Section */}
                <div className="max-w-6xl mx-auto mb-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-center p-6 bg-gray-50 rounded-2xl"
                            >
                                <h3 className="text-4xl font-bold mb-2 text-black">{stat.value}</h3>
                                <p className="text-gray-600 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Story Section */}
                <div className="max-w-6xl mx-auto mb-24">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                Founded in 2026, Vendora was created with one clear goal: to make selling physical products online simple and accessible for everyone.
                                </p>

                                <p>
                                We noticed that many small businesses and independent sellers struggled with complicated e-commerce tools and high setup costs. Vendora was built to remove that friction—offering an intuitive platform to list, manage, and sell real, tangible products with ease.
                                </p>

                                <p>
                                Today, Vendora supports growing brands and local sellers by providing the essential tools they need to run and scale their online stores in the digital marketplace.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-gray-100 rounded-2xl h-[400px] overflow-hidden"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                                alt="Team working"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Values Grid */}
                <div className="max-w-6xl mx-auto mb-24">
                    <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Target, title: "Innovation", desc: "We constantly push boundaries to create better selling tools." },
                            { icon: Users, title: "Community", desc: "We believe in the power of connection and mutual growth." },
                            { icon: Award, title: "Excellence", desc: "We maintain high standards in everything we build." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition-all"
                            >
                                <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center mb-6">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-12">Meet the Leadership</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {team.map((member, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group"
                            >
                                <div className="mb-4 overflow-hidden rounded-xl">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-xl font-bold">{member.name}</h3>
                                <p className="text-gray-500">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Aboutus
