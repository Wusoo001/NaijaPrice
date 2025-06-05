import React from 'react'
import { FaMapMarkedAlt, FaChartLine, FaClock, FaChartBar } from "react-icons/fa";

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Why Use NaijaMarket?
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore the features that make our food price tracking platform a must-have for Nigerians across all 36 states.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Feature 1 */}
          <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <FaMapMarkedAlt className="text-3xl text-green-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">36-State Coverage</h3>
            <p className="text-gray-600 text-sm">Get local market prices from every state in Nigeria — updated regularly.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <FaChartLine className="text-3xl text-green-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Live Price Trends</h3>
            <p className="text-gray-600 text-sm">Track how prices change daily or weekly to make smarter buying decisions.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <FaClock className="text-3xl text-green-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Updated in Real-Time</h3>
            <p className="text-gray-600 text-sm">Our database reflects the most recent information for maximum accuracy.</p>
          </div>

          {/* Feature 4 */}
          <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <FaChartBar className="text-3xl text-green-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Analytics & Insights</h3>
            <p className="text-gray-600 text-sm">View charts, analytics and summaries to understand price movement across Nigeria.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
