import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri'

import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext'

import { Logo } from './Logo'
import { NotificationsNav } from './NotificationsNav'
import { Profile } from './Profile'
import { SearchBox } from './SearchBox'

export const Header = () => {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
  const { onOpen } = useSidebarDrawer()

  return (
    <Flex
      align="center"
      as="header"
      height="20"
      marginTop="4"
      marginX="auto"
      maxWidth={1480}
      paddingX="6"
      width="100%"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          fontSize="24"
          icon={<Icon as={RiMenuLine} />}
          marginRight="2"
          variant="unstyled"
          onClick={onOpen}
        />
      )}

      <Logo />

      {isWideVersion && <SearchBox />}

      <Flex
        align="center"
        marginLeft="auto"
      >
        <NotificationsNav />

        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  )
}