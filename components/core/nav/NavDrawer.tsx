import { useState, Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import { Drawer } from '@mantine/core'
import Button from '../Button'
import { signIn, signOut, useSession } from 'next-auth/react'

type linkType = {
  label: string
  link: string
  links: { link: string; label: string }[]
}

type linksType = linkType[]

interface NavDrawerProps {
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
  links: linksType
}

export default function NavDrawer({
  opened,
  setOpened,
  links,
}: NavDrawerProps) {
  const { data: userSession, status } = useSession()

  const items = links.map((link) => {
    return (
      <Link key={link.label} href={link.link}>
        <a className='block leading-none rounded-lg text-2xl mb-6 py-2 px-1  hover:bg-secondary-light'>
          {link.label}
        </a>
      </Link>
    )
  })

  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      position='right'
      size='70%'
      zIndex={40}
      className='h-'
      classNames={{
        closeButton:
          'text-white child:h-10 child:w-10 w-10 h-10 hover:bg-transparent hover:child:scale-110',
        drawer: 'bg-secondary-dark  pt-4 px-5 max-w-[350px] text-white',
        root: 'z-[200]',
      }}
    >
      {items}
      <Link href='/account'>
        <a className='block leading-none rounded-lg text-2xl mb-6 py-2 px-1  hover:bg-secondary-light'>
          Account
        </a>
      </Link>
      <div className='pt-6'>
        {status === 'authenticated' && (
          <Button
            type='button'
            variant='outlined'
            className='ml-1 text-lg'
            clickHandler={(e) => {
              e.preventDefault()
              signOut()
            }}
          >
            Logout
          </Button>
        )}
        {status === 'unauthenticated' && (
          <Button
            type='button'
            className='ml-1 text-lg'
            variant='filled'
            clickHandler={(e) => {
              e.preventDefault()
              signIn()
            }}
          >
            Login
          </Button>
        )}
      </div>
    </Drawer>
  )
}
