import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue
} from '@chakra-ui/react'

import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext'

import { SidebarNav } from './SidebarNav'

export const Sidebar = () => {
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false
  })
  const { isOpen, onClose } = useSidebarDrawer()

  if (isDrawerSidebar) {
    return (
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent backgroundColor="gray.800" padding="4">
            <DrawerCloseButton marginTop="6" />
            <DrawerHeader>Navegação</DrawerHeader>
            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }

  return (
    <Box as="aside" marginRight="8" width="64">
      <SidebarNav />
    </Box>
  )
}