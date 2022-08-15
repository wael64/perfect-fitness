import { useRef } from 'react'
import { GetServerSideProps } from 'next'

import Head from 'next/head'

import mongooseConnect from '../utils/mongooseConnect'
import StripeModel from '../models/Stripe'
import { getToken } from 'next-auth/jwt'
import { format } from 'date-fns'

import { useRouter } from 'next/router'

const Account = ({
  stripeData,
  userSession,
}: {
  stripeData: any
  userSession: any
}) => {
  const getMembershipStatus = () => {
    if (stripeData?.membershipExpire) {
      const date = new Date(stripeData.membershipExpire * 1000)
      const today = new Date()

      today.setHours(0, 0, 0, 0)

      if (date < today) {
        return { membership: true, expired: true, date }
      } else {
        return { membership: true, expired: false, date }
      }
    } else {
      return { membership: false }
    }
  }

  const membershipStatus = useRef(getMembershipStatus())

  const Membership = () => {
    if (!membershipStatus.current.membership || !membershipStatus.current.date)
      return <p>None</p>

    if (membershipStatus.current.expired) {
      return (
        <div>{`Your membership expired on ${format(
          membershipStatus.current.date,
          'd MMMM y'
        )}`}</div>
      )
    } else {
      if (stripeData?.subscriptionActive === true) {
        return (
          <div>
            <p>{`Your membership will be renewed on ${format(
              membershipStatus.current.date,
              'd MMMM y'
            )}`}</p>
            <p className='text-sm font-normal mt-1'>
              You can cancel the renewal by clicking{' '}
              <button
                onClick={unsubscribeHandler}
                className='font-sans text-primary'
              >
                here
              </button>
            </p>
          </div>
        )
      } else {
        return (
          <div>
            {`Your membership will expire on ${format(
              membershipStatus.current.date,
              'd MMMM y'
            )}`}
          </div>
        )
      }
    }
  }

  const router = useRouter()
  const unsubscribeHandler = async () => {
    const unsubscribeRes = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/payment/cancel-subscription`,
      {
        method: 'DELETE',
      }
    )
    router.reload()
  }

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <section className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div className='px-2 max-w-md sm:max-w-lg md:max-w-xl mx-auto'>
          <h1 className='mb-5 font-medium'>Account</h1>
          <div className='flex mb-3'>
            <p className='basis-1/3 pr-2 text-sm xs:text-base'>Email:</p>
            <p className='font-medium xs:text-lg basis-2/3'>
              {userSession?.email}
            </p>
          </div>
          <div>
            <div className='flex'>
              <p className='basis-1/3 pr-2 text-sm xs:text-base'>Membership:</p>
              <div className='font-medium xs:text-lg basis-2/3'>
                <Membership />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Account

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const token = await getToken({ req: context.req })
    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    await mongooseConnect()
    const stripeData = await StripeModel.findOne(
      {
        stripeCustomerId: token?.stripeCustomerId,
      },
      { _id: 0 }
    ).lean()

    return {
      props: { stripeData, userSession: token },
    }
  } catch (err) {
    console.log('Account getServersideProps error: ', err)
    return {
      props: { stripeData: [], userSession: [] },
    }
  }
}
