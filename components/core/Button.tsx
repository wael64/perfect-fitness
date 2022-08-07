import Link from 'next/link'
import { MouseEventHandler } from 'react'

interface ButtonProps {
  type: 'button'
  variant: 'filled' | 'outlined'
  children: string
  alt?: boolean
  Icon?: JSX.Element
  className?: string
  clickHandler?: MouseEventHandler<HTMLButtonElement>
}

interface LinkProps {
  type: 'link'
  variant: 'filled' | 'outlined'
  children: string
  link: string
  alt?: boolean
  Icon?: JSX.Element
  className?: string
  clickHandler?: MouseEventHandler<HTMLAnchorElement>
}

type Props = ButtonProps | LinkProps

const Button = (props: Props) => {
  const {
    type,
    variant,
    children,
    alt = false,
    Icon,
    className,
    clickHandler,
  } = props

  const classString = `font-sans px-[.9em] py-[.2em] font-medium border-[1px]  hover:bg-white  inline-block ${
    variant === 'filled'
      ? `${
          alt
            ? 'bg-secondary-dark border-secondary-dark text-white hover:text-secondary-dark'
            : 'bg-primary border-primary text-secondary-dark'
        }`
      : 'hover:text-secondary-dark border-primary'
  } ${Icon ? 'flex justify-between items-center' : ''} ${className}`

  if (type === 'button') {
    return (
      <button
        className={classString}
        onClick={clickHandler ? clickHandler : () => {}}
      >
        {Icon}
        {children}
      </button>
    )
  }

  if (type === 'link') {
    {
      return (
        <Link href={props.link}>
          <a
            className={classString}
            onClick={clickHandler ? clickHandler : () => {}}
          >
            {Icon}
            {children}
          </a>
        </Link>
      )
    }
  }

  return <></>
}

export default Button
