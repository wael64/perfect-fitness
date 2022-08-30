import Button from '../../core/Button'

import Image from 'next/image'

const Hero = () => {
  return (
    <>
      {' '}
      <section className='sm:flex sm:justify-between sm:mt-5'>
        <div className='flex-grow'></div>
        <div className='sm:flex sm:justify-between items-center  px-4 sm:pl-4 sm:pr-0 lg:px-0 sm:mx-auto w-full  mx-auto max-w-xs xs:max-w-md sm:max-w-none md:max-w-[1120px] xl:max-w-[1400px] '>
          <div className='w-full sm:basis-[55%] md:basis-1/2  sm:max-w-md md:max-w-2xl lg:max-w-none lg:mr-4 mt-10 sm:mt-0'>
            <h1 className='font-medium text-2xl xxs:text-4xl xs:text-5xl sm:text-[2.8rem] md:text-6xl lg:text-[4rem] xl:text-[5rem] '>
              Get The Body You Have Always Wanted
            </h1>
            <Button
              type='link'
              variant='filled'
              link='/#plans'
              className='mt-3 mb-5 xxs:mt-5 xxs:mb-6 xs:mt-8 xs:mb-7 text-xs xxs:text-base  sm:mb-0 sm:text-base md:mt-10 md:text-2xl xl:text-3xl '
            >
              See our plans
            </Button>
          </div>
          <div className='sm:basis-2/5  sm:bg-primary sm:pl-4 sm:pr-4 sm:py-6 md:py-10 md:pl-6  lg:pr-0 lg:py-14  lg:pl-8 '>
            <div className='relative pt-[100%]  w-auto'>
              <Image
                priority={true}
                src='/static/images/person-exercising.png'
                alt='person exercising'
                layout='fill'
                objectFit='cover'
              />
            </div>
          </div>
        </div>
        <div className='sm:bg-primary flex-grow'></div>
      </section>
    </>
  )
}

export default Hero
