import type { NextPage } from 'next'

import Image from 'next/image'
import Hero from '../components/pages/home/Hero'
import Locations from '../components/pages/home/Location'
import Plans from '../components/pages/home/Plans'
import WhyUs from '../components/pages/home/WhyUs'

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <WhyUs />
      <Locations />
      <Plans />
    </>
  )
}

export default Home
