import { HStack, Icon } from '@chakra-ui/react'
import { RiNotificationLine, RiUserAddLine } from 'react-icons/ri'

export const NotificationsNav = () => {
  return (
    <HStack
      borderColor="gray.700"
      borderRightWidth={1}
      color="gray.300"
      marginX={["6", "8"]}
      paddingRight={["6", "8"]}
      paddingY="1"
      spacing={["6", "8"]}
    >
      <Icon as={RiNotificationLine} fontSize="20" />

      <Icon as={RiUserAddLine} fontSize="20" />
    </HStack>
  )
}