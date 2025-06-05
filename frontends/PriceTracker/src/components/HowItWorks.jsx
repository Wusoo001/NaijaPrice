import React from 'react'
import { FaSearch, FaMapMarkerAlt, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Search for a Product",
    description:
      "Look up any food item like tomatoes, rice, or yam easily in our search bar.",
    icon: FaSearch,
  },
  {
    id: 2,
    title: "Choose Your State or Market",
    description:
      "Select from Nigeria’s 36 states to get localized and accurate price data.",
    icon: FaMapMarkerAlt,
  },
  {
    id: 3,
    title: "View Prices & Trends",
    description:
      "Access up-to-date prices, historical trends, and market insights at your fingertips.",
    icon: FaChartLine,
  },
];


const HowItWorks = () => {
  return (
   <section className="py-20 bg-green-50 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map(({ id, title, description, icon: Icon }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: id * 0.2, duration: 0.6 }}
              className="bg-white rounded-xl p-6 shadow hover:shadow-md transition"
            >
              <div className="text-green-600 font-bold text-4xl mb-4 mx-auto">
                <Icon />
              </div>
              <div className="text-green-600 font-bold text-2xl mb-4">{id}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
