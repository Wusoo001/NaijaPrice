import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 font-bold text-lg text-white">
          NaijaMarket &copy; 2025
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition">
            Home
          </a>
          <a href="#" className="hover:text-white transition">
            Features
          </a>
          <a href="#" className="hover:text-white transition">
            About
          </a>
          <a href="#" className="hover:text-white transition">
            Contact
          </a>
        </div>
        <div className="mt-4 md:mt-0 text-sm">
          Contact: <a href="mailto:support@naijamarket.com" className="underline hover:text-white">support@naijamarket.com</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
