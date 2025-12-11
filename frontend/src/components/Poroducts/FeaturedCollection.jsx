import React from 'react'
import { Link } from 'react-router-dom'
import featured from '../../assets/featured.webp'

function FeaturedCollection() {
  return (
    <section className='flex py-16 px-4 lg:px-0 '>
    <div className="container flex flex-col-reverse sm:flex-row lg:flex-row items-center bg-green-50 rounded-3xl">
      <div className="lg:w-1/2 p-8 text-center lg:text-left">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Confort and Style
      </h2>
      <h2 className="text-4xl lg:text-5xl font-bold mb-6 ">
        Apparel made for your every day life
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Discover high quality, Comfortable clothing that effortlessly blends fashion amd function. Designed to make you look and feel great every day
      </p>
      <Link to='/collections/all' className='bg-black text-white rounded-lg px-6 py-2 text-sm hover:bg-gray-800'>
      Shop Now</Link>
      </div>
      <div className="lg:w-1/2 ">
      <img src={featured} alt="" className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl'/></div>
    </div>
    </section>
  )
}

export default FeaturedCollection
