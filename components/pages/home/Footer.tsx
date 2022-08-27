import SvgFacebook from '../../../public/static/icons/SvgFacebook'
import SvgTwitter from '../../../public/static/icons/SvgTwitter'
import SvgInstagram from '../../../public/static/icons/SvgInstagram'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='bg-secondary-light'>
      <div className='flex py-4 justify-between items-center md:py-6 px-4  lg:px-0 sm:mx-auto w-full    sm:max-w-none md:max-w-[1120px] xl:max-w-[1400px] '>
        <p>&#169; Perfect Fitness. All rights reserved.</p>
        <div className='flex'>
          <Link href=''>
            <a>
              <SvgFacebook className='h-8 w-8' />
            </a>
          </Link>
          <Link href=''>
            <a>
              <SvgTwitter className='h-8 w-8 mx-4' />
            </a>
          </Link>
          <Link href=''>
            <a>
              <SvgInstagram className='h-8 w-8' />
            </a>
          </Link>
        </div>
      </div>
    </footer>
  )
}
export default Footer
