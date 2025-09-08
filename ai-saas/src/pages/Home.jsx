import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Plan from '../components/Plan'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import AiTools from '../components/AiTools'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <AiTools/>
        <Plan/>
        <Testimonials/>
        <Footer/>
    </div>
  )
}

export default Home