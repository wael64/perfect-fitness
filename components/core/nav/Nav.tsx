import { useContext, useState } from 'react'
import NavDrawer from './NavDrawer'
import Navbar from './Navbar'

import { UserContext } from '../../../contexts/UserContext'

const Nav = () => {
  const [opened, setOpened] = useState<boolean>(false)

  const { user, setUser, userStatus, setUserStatus } = useContext(UserContext)

  type linkType = {
    label: string
    link: string
    links: { link: string; label: string }[]
  }

  type linksType = linkType[]

  const links: linksType = [
    {
      link: '/',
      links: [],
      label: 'Home',
    },
    {
      label: 'Blog',
      link: '/blog',
      links: [],
    },
    {
      label: 'Store',
      link: '/store',
      links: [],
    },
    {
      label: 'Contact',
      link: '/contact',
      links: [],
    },
  ]

  return (
    <>
      <Navbar
        opened={opened}
        setOpened={setOpened}
        user={user}
        setUser={setUser}
        userStatus={userStatus}
        setUserStatus={setUserStatus}
        links={links}
      />
      <NavDrawer
        opened={opened}
        setOpened={setOpened}
        user={user}
        setUser={setUser}
        userStatus={userStatus}
        setUserStatus={setUserStatus}
        links={links}
      />
    </>
  )
}

export default Nav
