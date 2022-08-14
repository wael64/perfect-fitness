import { useState } from 'react'
import NavDrawer from './NavDrawer'
import Navbar from './Navbar'

const Nav = () => {
  const [opened, setOpened] = useState<boolean>(false)

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
  ]

  return (
    <>
      <Navbar opened={opened} setOpened={setOpened} links={links} />
      <NavDrawer opened={opened} setOpened={setOpened} links={links} />
    </>
  )
}

export default Nav
