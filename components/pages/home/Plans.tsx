import Button from '../../core/Button'

const Plans = () => {
  return (
    <section className='mt-12 mb-4 sm:mb-[3.4rem] px-4  sm:px-0  '>
      <h1 className='font-semibold text-center text-2xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl '>
        PLANS
      </h1>
      <div className='relative '>
        <div className='sm:mx-auto w-full    sm:max-w-none md:max-w-[1120px] xl:max-w-[1400px]'>
          <div className='bg-primary text-center font-semibold text-secondary-dark max-w-[12rem] mx-auto py-1 hidden mt-8 sm:block lg:max-w-[16rem]  text-lg'>
            Most Popular
          </div>
          <div className='sm:flex mt-6 sm:mt-0 '>
            <div className='z-10 bg-white text-secondary-dark flex flex-col justify-between items-start py-4 px-2 mb-5 max-w-[12rem] mx-auto h-[15rem] sm:mb-0 lg:max-w-[16rem] lg:h-[20rem] lg:px-4'>
              <div className='basis-1/2'>
                <div className='flex items-end leading-none'>
                  <h1 className='font-bold text-4xl lg:text-6xl'>50$</h1>
                  <p className='text-sm lg:text-base'>/mo</p>
                </div>
                <p className='text-sm lg:text-base text-secondary-transparent'>
                  Paid monthly
                </p>
              </div>

              <div className='basis-1/2 flex flex-col justify-between items-start'>
                <h3 className='font-medium lg:text-lg'>
                  2 free sessions with a trainer every month
                </h3>
                <Button
                  type='link'
                  link='/'
                  variant='filled'
                  alt={true}
                  className='sm:text-lg lg:text-xl'
                >
                  Join now
                </Button>
              </div>
            </div>
            <div className='bg-primary text-center font-semibold text-secondary-dark max-w-[12rem] mx-auto py-1 sm:hidden'>
              Most Popular
            </div>
            <div className='z-10 bg-white text-secondary-dark flex flex-col justify-between items-start py-4 px-2 mb-5  max-w-[12rem] mx-auto h-[15rem] sm:mb-0 lg:max-w-[16rem] lg:h-[20rem] lg:px-4'>
              <div className='basis-1/2'>
                <div className='flex items-end leading-none'>
                  <h1 className='font-bold text-4xl lg:text-6xl'>40$</h1>
                  <p className='text-sm lg:text-base'>/mo</p>
                </div>
                <p className='text-sm lg:text-base text-secondary-transparent'>
                  Paid yearly
                </p>
                <p className='font-semibold mt-1 lg:text-lg'>
                  Save 120$ a year
                </p>
              </div>

              <div className='basis-1/2 flex flex-col justify-between items-start'>
                <h3 className='font-medium lg:text-lg'>
                  4 free sessions with a trainer every month
                </h3>
                <Button
                  type='link'
                  link='/'
                  variant='filled'
                  className='sm:text-lg lg:text-xl'
                >
                  Join now
                </Button>
              </div>
            </div>
            <div className='z-10 bg-white text-secondary-dark flex flex-col justify-between items-start py-4 px-2 max-w-[12rem] mx-auto h-[15rem] lg:max-w-[16rem] lg:h-[20rem] lg:px-4'>
              <div className='basis-1/2'>
                <div className='flex items-end leading-none'>
                  <h1 className='font-bold text-4xl lg:text-6xl'>35$</h1>
                  <p className='text-sm lg:text-base'>/mo</p>
                </div>
                <p className='text-sm lg:text-base text-secondary-transparent'>
                  Paid every 2 years
                </p>
                <p className='font-semibold mt-1 lg:text-lg'>
                  Save 240$ a year
                </p>
              </div>

              <div className='basis-1/2 flex flex-col justify-between items-start'>
                <h3 className='font-medium lg:text-lg'>
                  6 free sessions with a trainer every month
                </h3>
                <Button
                  type='link'
                  link='/'
                  variant='filled'
                  alt={true}
                  className='sm:text-lg lg:text-xl'
                >
                  Join now
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden sm:block absolute w-screen h-24 lg:h-[6.6875rem] bg-primary top-[85%]'></div>
      </div>
    </section>
  )
}

export default Plans
