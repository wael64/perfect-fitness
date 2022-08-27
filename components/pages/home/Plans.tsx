import Button from '../../core/Button'
import getStripe from '../../../utils/get-stripejs'
import { signIn, useSession } from 'next-auth/react'

const Plans = () => {
  const { data: userSession, status } = useSession()

  const joinHandler = async (priceId: string) => {
    if (status === 'loading') return

    if (status === 'unauthenticated') {
      return signIn()
    }
    const sessionRes = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/payment/buy-subscription`,
      {
        method: 'POST',
        body: JSON.stringify({
          priceId,
          stripeCustomerId: userSession?.user?.stripeCustomerId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await sessionRes.json()

    const stripe = await getStripe()
    stripe?.redirectToCheckout({ sessionId: data.session.id })
  }

  const cards = [
    {
      monthlyPrice: '50',
      period: 'Paid monthly',
      savings: '',
      sessions: '2 free sessions with a trainer every month',
      priceId: 'price_1LUVeZCwcPoFXd2ByUGtcUJA',
    },
    {
      monthlyPrice: '40',
      period: 'Paid every 6 months',
      savings: 'Save 60$ a year',
      sessions: '4 free sessions with a trainer every month',
      priceId: 'price_1LUVsWCwcPoFXd2BAxFmLGhM',
    },
    {
      monthlyPrice: '35',
      period: 'Paid yearly',
      savings: 'Save 180$ a year',
      sessions: '6 free sessions with a trainer every month',
      priceId: 'price_1LUVvzCwcPoFXd2B9V7yauEm',
    },
  ]

  return (
    <section
      className='mt-28 xs:mt-40 md:mt-48 lg:mt-56 xl:mt-60 mb-4 sm:mb-[3.4rem] md:mb-20 px-4  sm:px-0'
      id='plans'
    >
      <h1 className='font-semibold text-center text-2xl xs:text-4xl sm:text-5xl  lg:text-6xl'>
        PLANS
      </h1>
      <div className='relative '>
        <div className='sm:mx-auto w-full    sm:max-w-none md:max-w-[1120px] xl:max-w-[1400px]'>
          <div className='bg-primary text-center font-semibold text-secondary-dark max-w-[12rem] mx-auto py-1 hidden mt-8 md:mt-10 md:mt-12 sm:block md:max-w-[16rem]  text-lg md:text-xl md:py-2'>
            Most Popular
          </div>
          <div className='sm:flex mt-6 sm:mt-0 '>
            {cards.map((card, index) => {
              return (
                <>
                  {index === 1 && (
                    <div className='bg-primary text-center font-semibold text-secondary-dark max-w-[12rem] mx-auto py-1 sm:hidden'>
                      Most Popular
                    </div>
                  )}
                  <div className='z-10 bg-white text-secondary-dark flex flex-col justify-between items-start py-4 px-2 mb-5 max-w-[12rem] mx-auto h-[17rem] sm:mb-0 md:max-w-[16rem] md:h-[22rem] md:py-5 md:px-7'>
                    <div className='basis-1/2'>
                      <div className='flex items-end leading-none'>
                        <h1 className='font-bold text-4xl md:text-6xl'>
                          {card.monthlyPrice}$
                        </h1>
                        <p className='text-sm md:text-base'>/mo</p>
                      </div>
                      <p className='text-sm md:text-base text-secondary-transparent'>
                        {card.period}
                      </p>
                      {card.savings && (
                        <p className='font-semibold mt-1 md:mt-2 md:text-lg'>
                          {card.savings}
                        </p>
                      )}
                    </div>

                    <div className='basis-1/2 flex flex-col justify-between items-start'>
                      <h3 className='font-medium text-lg md:text-xl'>
                        {card.sessions}
                      </h3>
                      <Button
                        type='button'
                        clickHandler={async () => {
                          joinHandler(card.priceId)
                        }}
                        variant='filled'
                        alt={index !== 1}
                        className='sm:text-lg md:text-xl'
                        disabled={status === 'loading'}
                      >
                        Join now
                      </Button>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
        <div className='hidden sm:block absolute w-screen h-24 md:h-[8.6875rem] bg-primary top-[85%]'></div>
      </div>
    </section>
  )
}

export default Plans
