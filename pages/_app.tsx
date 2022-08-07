import { useState } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Nav from '../components/core/nav/Nav'
import Footer from '../components/pages/home/Footer'

import { MantineProvider } from '@mantine/core'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <div className='bg-secondary-dark '>
      <SessionProvider session={session}>
        <MantineProvider
          withNormalizeCSS
          theme={{
            fontFamily: 'Work Sans, Segoe UI, Roboto, Oxygen',
            colors: {
              secondary: [
                '#212940',
                '#212940',
                '#212940',
                '#212940',
                '#212940',
                '#212940',
                '#212940',
              ],
            },
            breakpoints: {
              xxs: 280,
              xs: 400,
              sm: 600,
              md: 900,
              lg: 1280,
              xl: 1500,
            },
          }}
        >
          <div className='flex flex-col justify-between min-h-screen min-w-screen'>
            <Nav />
            <div className='pt-20 md:pt-24'>
              <Component {...pageProps} />
            </div>
            <Footer />
          </div>
        </MantineProvider>
      </SessionProvider>
    </div>
  )
}

export default MyApp
