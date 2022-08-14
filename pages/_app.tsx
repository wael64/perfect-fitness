import { useState, useEffect } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Head from 'next/head'

import { useRouter } from 'next/router'

import LoaderScreen from '../components/core/LoaderScreen'

import Nav from '../components/core/nav/Nav'
import Footer from '../components/pages/home/Footer'

import { MantineProvider } from '@mantine/core'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true)
    }

    const handleRouteChangeComplete = () => {
      setLoading(false)
    }

    const handleRouteChangeError = () => {
      setLoading(false)
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouteChangeError)
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeError', handleRouteChangeError)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <link rel='shortcut icon' href='/static/icons/favicon.ico' />
      </Head>
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
                primary: [
                  '#A9FE86',
                  '#A9FE86',
                  '#A9FE86',
                  '#A9FE86',
                  '#A9FE86',
                  '#A9FE86',
                  '#A9FE86',
                  '#A9FE86',
                  '#A9FE86',
                  '#A9FE86',
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
            {loading ? <LoaderScreen /> : null}
            <div className='flex flex-col justify-between min-h-screen min-w-screen'>
              <Nav />
              <div className='pt-20 md:pt-24 flex-1 relative'>
                <Component {...pageProps} />
              </div>
              <Footer />
            </div>
          </MantineProvider>
        </SessionProvider>
      </div>
    </>
  )
}

export default MyApp
