import React from 'react';
import Navbar from "../components/Navbar"
import { motion } from "framer-motion"
import MainImage from "../assets/MainImage.avif"

function Home() {

  return (
    <>
      <div className='flex justify-center'>
        {/* hero Section */}
        <motion.div
        className='relative w-full h-[70vh] mx-10 my-15 overflow-hidden rounded-lg'
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
            <div className='w-full absolute bottom-0 p-15 bg-gradient-to-t from-black/70 via-black/30 to-transparent'>
              <h1 className='text-6xl text-right py-8 text-white font-bold'>Effortlessly selling</h1>
              <p className='text-lg text-right font-sans text-white opacity-[80%] font-bold'>Discover quality products with fast shipping and secure checkout.</p>
            </div>
            
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export default Home;