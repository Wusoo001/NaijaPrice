import React from 'react'
import { motion } from 'framer-motion'
import Market from "../assets/marketImg.jpg"


const HeroSection = () => {
  return (
     <section className="bg-gradient-to-br from-green-50 to-white py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Animated Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Track Food Prices Across Nigeria’s 36 States
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl">
            Get timely insights into local food market prices, monitor trends, and make smarter decisions with NaijaMarket.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
              Get Started
            </button>
            <button className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Static Image (no animation) */}
        <div className="w-full md:w-1/2">
          <img
            src={Market}
            alt="Market scene"
            className="rounded-xl shadow-md"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
