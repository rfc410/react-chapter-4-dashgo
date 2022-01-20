import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

interface ProfileProps {
  showProfileData?: boolean
}

export const Profile = ({ showProfileData = true }: ProfileProps) => {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box marginRight="4" textAlign="right">
          <Text>Caio Rodrigues</Text>
          <Text color="gray.300" fontSize="small">rfcaio@mail.com</Text>
        </Box>
      )}

      <Avatar name="Caio Rodrigues" size="md" src="https://github.com/rfcaio.png" />
    </Flex>
  )
}