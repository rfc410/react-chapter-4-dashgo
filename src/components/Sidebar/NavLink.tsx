import { ElementType } from 'react'
import { Icon, Link as ChakraLink, LinkProps as ChakraLinkProps, Text } from '@chakra-ui/react'

import { ActiveLink } from '../ActiveLink'

interface NavLinkProps extends ChakraLinkProps {
  children: string
  href: string
  icon: ElementType
}

export const NavLink = ({ children, href, icon, ...props }: NavLinkProps) => {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink align="center" display="flex" {...props}>
        <Icon as={icon} fontSize="20" />
        <Text fontWeight="medium" marginLeft="4">{children}</Text>
      </ChakraLink>
    </ActiveLink>
  )
}