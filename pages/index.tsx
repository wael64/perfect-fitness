import type { NextPage } from 'next'

import Hero from '../components/pages/home/Hero'
import Locations from '../components/pages/home/locations/Locations'
import Plans from '../components/pages/home/Plans'
import WhyUs from '../components/pages/home/WhyUs'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Hero />
      <WhyUs />
      <Locations />
      <Plans />
    </>
  )
}

export default Home
