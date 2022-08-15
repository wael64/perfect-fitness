import { getProviders, getCsrfToken, signIn } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import Button from '../components/core/Button'

import Head from 'next/head'

export default function SignIn({
  providers,
  csrfToken,
}: {
  providers: any[]
  csrfToken: any
}) {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        {Object.values(providers)
          .filter((provider) => (provider.name === 'Email' ? false : true))
          .map((provider) => (
            <div key={provider.name}>
              <Button
                type='button'
                clickHandler={() => signIn(provider.id)}
                variant='filled'
                buttonType='submit'
                className='w-full'
              >
                <span className='block py-1'>Sign in with {provider.name}</span>
              </Button>
            </div>
          ))}
        <form
          method='post'
          action='/api/auth/signin/email'
          className='flex flex-col mt-10'
        >
          <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
          <input
            type='email'
            id='email'
            name='email'
            className='mb-4 text-base bg-white text-secondary-dark font-medium p-1 font-sans placeholder:text-neutral-500 xs:w-72'
            placeholder='Email Address'
          />
          <Button type='button' variant='filled' buttonType='submit'>
            <span className='block py-1'>Sign in with Email</span>
          </Button>
        </form>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)
  return {
    props: { providers, csrfToken },
  }
}
