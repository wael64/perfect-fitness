import Button from '../../core/Button'

import Image from 'next/image'

const Hero = () => {
  return (
    <>
      {' '}
      <section className='sm:flex sm:justify-between'>
        <div className='flex-grow'></div>
        <div className='sm:flex sm:justify-between px-4 sm:pl-4 sm:pr-0 lg:px-0 sm:mx-auto w-full  mx-auto max-w-xs xs:max-w-md sm:max-w-none md:max-w-[1120px] xl:max-w-[1400px] '>
          <div className='w-full sm:w-3/5  sm:max-w-md md:max-w-2xl lg:max-w-none lg:mr-4 mt-10 sm:mt-14 lg:mt-20 '>
            <h1 className='font-medium text-2xl xxs:text-3xl xs:text-5xl md:text-7xl sm:mt-[-6px] md:mt-[-10px] lg:-mt-3 lg:text-[5rem] xl:text-8xl '>
              Get The Body You Have Always Wanted
            </h1>
            <Button
              type='link'
              variant='filled'
              link='/#plans'
              className='mt-3 mb-5 xs:mt-8 xs:mb-7 text-xs xxs:text-sm xs:text-base sm:mb-0 md:text-xl md:mt-10 lg:text-2xl xl:text-3xl '
            >
              See our plans
            </Button>
          </div>
          <div className='sm:w-2/5  sm:bg-primary sm:pl-4 sm:pr-4 sm:pt-10 sm:pb-4 md:pt-14 md:pl-6 md:pb-6 lg:pr-0 lg:pt-20 lg:pb-8 lg:pl-8 '>
            <div className='relative pt-[100%]  w-auto'>
              <Image
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
