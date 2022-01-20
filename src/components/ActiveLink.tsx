import { cloneElement, ReactElement } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
}

export const ActiveLink = ({ children, ...props }: ActiveLinkProps) => {
  const { asPath } = useRouter()
  const isActive = asPath === props.href || asPath === props.as

  return (
    <Link {...props}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50'
      })}
    </Link>
  )
}