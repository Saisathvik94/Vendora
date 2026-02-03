import { motion } from "framer-motion"

function Loader({ message = "Loading..." }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <motion.div
                className="w-16 h-16 border-4 border-black border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            {message && (
                <motion.p
                    className="mt-4 text-lg text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {message}
                </motion.p>
            )}
        </div>
    )
}

export default Loader;
