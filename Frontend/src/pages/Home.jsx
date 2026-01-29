import { motion } from "framer-motion"
import MainImage from "../assets/MainImage.avif"

function Home() {

  return (
    <>
      <div className='flex justify-center'>
        {/* hero Section */}
        <motion.div
        className='relative w-full h-[45vh] md:h-[55vh] lg:h-[70vh] mx-4 md:mx-6 lg:mx-10 my-6 md:my-10 lg:my-15 overflow-hidden rounded-lg'
        initial={{ opacity: 0}}
        animate={{ opacity:1 }}
        transition={{ duration: 2 }}
        >
          <img src={MainImage} alt="image" className='w-full h-full object-cover' />
          <motion.div 
          className='w-full'
          initial={{ opacity: 0}}
          animate={{ opacity:1 }}
          transition={{ duration: 1, delay:2 }}
          >
            <div className='w-full absolute bottom-0 p-5 md:p-8 lg:p-15 bg-gradient-to-t from-black/70 via-black/30 to-transparent'>
              <h1 className='text-3xl md:text-4xl lg:text-6xl text-center md:text-right py-4 md:py-6 lg:py-8 text-white font-bold'>Effortlessly selling</h1>
              <p className='text-sm md:text-base lg:text-lg text-center md:text-right font-sans text-white opacity-[80%] font-bold'>Discover quality products with fast shipping and secure checkout.</p>
            </div>
            
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export default Home;