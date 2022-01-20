import { Flex, Icon, Input } from '@chakra-ui/react'
import { RiSearchLine } from 'react-icons/ri'

export const SearchBox = () => {
  return (
    <Flex
      alignSelf="center"
      as="label"
      background="gray.800"
      borderRadius="full"
      color="gray.200"
      flex="1"
      marginLeft="6"
      maxWidth="400"
      paddingX="8"
      paddingY="4"
      position="relative"
      width={400}
    >
      <Input
        color="gray.50"
        marginRight="4"
        paddingX="4"
        placeholder="Buscar na plataforma"
        variant="unstyled"
        _placeholder={{
          color: 'gray.400'
        }}
      />

      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  )
}