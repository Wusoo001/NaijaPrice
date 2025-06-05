import React from 'react'

const CTA = () => {
  return (
    <section className="bg-green-600 text-white py-20 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-6">
          Ready to Track Food Prices Smarter?
        </h2>
        <p className="text-lg mb-8">
          Join thousands of Nigerians using NaijaMarket to make informed decisions every day.
        </p>
        <div className="flex justify-center gap-6 flex-wrap">

          <a href="/signup"><button className="bg-white text-green-600 font-semibold py-3 px-8 rounded-lg shadow hover:bg-green-100 transition">
            Sign Up Now
          </button></a>
          <button className="border border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-green-600 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTA
