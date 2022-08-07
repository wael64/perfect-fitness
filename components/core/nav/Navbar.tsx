import { Dispatch, SetStateAction } from 'react'

import Link from 'next/link'

import SvgLogo from '../../../public/static/icons/SvgLogo'
import { Burger } from '@mantine/core'
import Button from '../Button'

import { useWindowScroll } from '@mantine/hooks'

import { signIn, signOut, useSession } from 'next-auth/react'

type status = 'idle' | 'pending' | 'resolved' | 'rejected'

type linkType = {
  label: string
  link: string
  links: { link: string; label: string }[]
}

type linksType = linkType[]

interface NavProps {
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
  user: {}
  setUser: React.Dispatch<React.SetStateAction<{}>>
  userStatus: status
  setUserStatus: React.Dispatch<React.SetStateAction<status>>
  links: linksType
}

const Navbar = ({
  opened,
  setOpened,
  user,
  setUser,
  userStatus,
  setUserStatus,
  links,
}: NavProps) => {
  const [scroll] = useWindowScroll()

  const { data: session, status } = useSession()
  console.log(session)
  return (
    <nav
      className={`fixed w-full z-30 bg-secondary-dark   ${
        Number(scroll.y) === 0
          ? 'py-4 bg-secondary-dark md:py-6'
          : 'py-2 bg-secondary-transparent md:py-4'
      }`}
    >
      <div
        className={`flex justify-between items-center   px-4 md:px-6 lg:px-0 mx-auto  max-w-[1120px] xl:max-w-[1400px]`}
      >
        <Link href='/'>
          <a>
            <SvgLogo className='h-10 w-10 md:h-12 md:w-12' />
          </a>
        </Link>
        <div className='hidden sm:flex justify-between items-center w-3/4 md:w-1/2 lg:w-2/5'>
          {links.map((item) => (
            <Link href={item.link} key={item.label}>
              <a>{item.label}</a>
            </Link>
          ))}
          <div className='ml-4'>
            {status === 'unauthenticated' && (
              <Button
                type='button'
                variant='filled'
                clickHandler={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Login
              </Button>
            )}
            {status === 'authenticated' && (
              <Button
                type='button'
                variant='outlined'
                className='ml-3'
                clickHandler={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
        <Burger
          opened={opened}
          onClick={() => setOpened((v) => !v)}
          className='sm:hidden'
          classNames={{
            burger: 'bg-white before:bg-white after:bg-white',
          }}
          size='md'
        />
      </div>
    </nav>
  )
}

export default Navbar
