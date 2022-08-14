import Image from 'next/image'

const WhyUs = () => {
  const cardsData = [
    {
      image: '/static/images/healthy-food.png',
      alt: 'bowl of healthy food',
      title: 'Nutritional Advice',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuad consectetur tellus sollicitudin faucibus volutpat pellentesque hendrerit. ',
      color: 'secondary',
    },
    {
      image: '/static/images/personal-trainer.png',
      alt: 'person helping another person with a exercising machine',
      title: 'Personal Training',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuad consectetur tellus sollicitudin faucibus volutpat pellentesque hendrerit. ',
      color: 'primary',
    },
    {
      image: '/static/images/gym-equipment.png',
      alt: 'gym equipment',
      title: 'Modern Equipment',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuad consectetur tellus sollicitudin faucibus volutpat pellentesque hendrerit. ',
      color: 'secondary',
    },
  ]
  return (
    <section className='mt-12 px-4  lg:px-0 max-w-md mx-auto w-full    sm:max-w-2xl  md:max-w-[1120px] xl:max-w-[1400px]'>
      <h1 className='font-semibold text-center text-2xl xs:text-4xl sm:text-5xl lg:text-6xl'>
        WHY US
      </h1>
      <p className='text-neutral-200 text-sm mt-4 md:mt-6 lg:mt-8 mb-8  xs:text-lg md:text-xl  lg:text-2xl md:text-center'>
        To get your desired body, exercise alone isn’t enough. You also need the
        appropriate diet. We help you get both of them right so you can achieve
        your goals the right way.
      </p>
      <div className=''>
        <h2 className='text-xl xs:text-3xl md:text-4xl lg:text-5xl'>
          We provide
        </h2>
        <div className='md:flex mt-3 md:mt-5'>
          {cardsData.map((card) => (
            <div
              key={card.title}
              className={`py-6 px-4 mb-5 mx-auto md:py-8 lg:py-10 xl:py-14 md:px-6 xl:px-14 max-w-[280px] sm:max-w-xs md:max-w-none ${
                card.color === 'primary'
                  ? 'bg-primary text-secondary-dark'
                  : 'bg-secondary-light text-white'
              }`}
            >
              <div className='w-32 mx-auto mb-4 xs:w-40 sm:w-48 sm:mb-6 md:w-52 lg:w-56 lg:mb-10 xl:w-64'>
                <div className='relative pt-[84.5%]'>
                  <Image
                    src={card.image}
                    alt={card.alt}
                    layout='fill'
                    objectFit='cover'
                  />
                </div>
              </div>
              <h3 className='font-bold text-lg xxs:text-2xl xs:text-2xl sm:text-3xl md:text-2xl lg:text-3xl mb-2 md:mb-4'>
                {card.title}
              </h3>
              <p className='font-medium text-sm xs:text-base xl:text-lg'>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default WhyUs
