import { Dispatch, SetStateAction } from 'react'

import Link from 'next/link'

import SvgLogo from '../../../public/static/icons/SvgLogo'
import SvgAccount from '../../../public/static/icons/SvgAccount'

import { Burger, Menu } from '@mantine/core'
import Button from '../Button'

import { useWindowScroll } from '@mantine/hooks'

import { signIn, signOut, useSession } from 'next-auth/react'

type linkType = {
  label: string
  link: string
  links: { link: string; label: string }[]
}

type linksType = linkType[]

interface NavProps {
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
  links: linksType
}

const Navbar = ({ opened, setOpened, links }: NavProps) => {
  const [scroll] = useWindowScroll()

  const { data: userSession, status } = useSession()
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
        <div className='hidden sm:flex justify-between items-center w-2/5 md:text-lg'>
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
              <Menu
                control={
                  <button>
                    <SvgAccount className='w-7 h-7 md:w-8 md:h-8' />
                  </button>
                }
                classNames={{
                  body: '',
                  item: 'p-0',
                  itemLabel: 'w-full',
                  itemHovered: 'bg-neutral-100',
                }}
              >
                <Menu.Item>
                  <Link href='/account'>
                    <a className='text-lg w-full block p-3'>Account</a>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <button
                    className='font-sans text-lg w-full block p-3 text-start'
                    onClick={(e) => {
                      e.preventDefault()
                      signOut()
                    }}
                  >
                    Logout
                  </button>
                </Menu.Item>
              </Menu>
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
