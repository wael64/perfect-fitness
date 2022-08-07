import { useState, Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import { Drawer } from '@mantine/core'
import { useRouter } from 'next/router'

type status = 'idle' | 'pending' | 'resolved' | 'rejected'

type linkType = {
  label: string
  link: string
  links: { link: string; label: string }[]
}

type linksType = linkType[]

interface NavDrawerProps {
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
  user: {}
  setUser: React.Dispatch<React.SetStateAction<{}>>
  userStatus: status
  setUserStatus: React.Dispatch<React.SetStateAction<status>>
  links: linksType
}

export default function NavDrawer({
  opened,
  setOpened,
  user,
  setUser,
  userStatus,
  setUserStatus,
  links,
}: NavDrawerProps) {
  const router = useRouter()

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
      <div className='pt-6'>
        {userStatus === 'resolved' ? (
          <>
            <button
              className=' font-medium flex items-center w-full'
              onClick={async () => {
                try {
                  const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER}/auth/logoutWeb`,
                    {
                      method: 'POST',
                      credentials: 'include',
                    }
                  )
                  if (response.status === 200) {
                    sessionStorage.removeItem('user')
                    setUser({})
                    setUserStatus('rejected')
                    router.push('/')
                  }
                } catch (err) {
                  console.log(err)
                }
              }}
            >
              {/* <SvgDoor
                primary={theme === 'dark' ? '#fafafa' : '#282828'}
                height={24}
                width={24}
              /> */}
              <p className='ml-3'>Logout</p>
            </button>
            <Link href='/editUser'>
              <a className=' font-medium flex items-center my-4'>
                {/* <SvgAltProfile
                  primary={theme === 'dark' ? '#fafafa' : '#282828'}
                  height={24}
                  width={19}
                /> */}
                <span className='ml-4'>Account</span>
              </a>
            </Link>
            <Link href='/'>
              <a className=' font-medium flex items-center'>
                {/* <SvgGear
                  primary={theme === 'dark' ? '#fafafa' : '#282828'}
                  height={24}
                  width={24}
                /> */}
                <span className='ml-3'>Settings</span>
              </a>
            </Link>
          </>
        ) : userStatus === 'rejected' ? (
          <div className='flex'>
            <Link href='/login'>
              <a className='block leading-none py-3 w-[90px] text-center font-medium border-[1px] border-[#ababab] dark:border-[#464646] rounded-lg  hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-4'>
                Login
              </a>
            </Link>
            <Link href='/signup'>
              <a className='block leading-none border-none py-3 w-[90px] text-center font-medium border-[1px] bg-accent-light hover:bg-accent-dark rounded-lg '>
                Sign up
              </a>
            </Link>
          </div>
        ) : (
          ''
        )}
      </div>
    </Drawer>
  )
}
