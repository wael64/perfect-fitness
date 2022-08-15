import Link from 'next/link'
import { MouseEventHandler } from 'react'

interface ButtonProps {
  type: 'button'
  variant: 'filled' | 'outlined'
  children: React.ReactNode
  buttonType?: 'submit' | 'reset' | 'button'
  alt?: boolean
  Icon?: JSX.Element
  className?: string
  clickHandler?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

interface LinkProps {
  type: 'link'
  variant: 'filled' | 'outlined'
  children: React.ReactNode
  link: string
  alt?: boolean
  Icon?: JSX.Element
  className?: string
  clickHandler?: MouseEventHandler<HTMLAnchorElement>
  disabled?: boolean
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
    disabled,
  } = props

  const classString = `font-sans px-[.9em] py-[.2em] font-medium border-[1px]  hover:bg-white  inline-block ${
    variant === 'filled'
      ? `${
          alt
            ? 'bg-secondary-dark border-secondary-dark text-white hover:text-secondary-dark'
            : 'bg-primary border-primary text-secondary-dark'
        }`
      : 'hover:text-secondary-dark border-primary'
  } ${Icon ? 'flex justify-between items-center' : ''} 
  ${
    disabled
      ? 'cursor-not-allowed bg-gray-200 border-gray-200 hover:bg-gray-200 hover:border-gray-200 text-gray-400 hover:text-gray-400'
      : ''
  }`

  if (type === 'button') {
    return (
      <button
        className={`${classString} ${className}`}
        onClick={clickHandler ? clickHandler : () => {}}
        type={props.buttonType || 'button'}
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
            className={`${classString} ${className}`}
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
