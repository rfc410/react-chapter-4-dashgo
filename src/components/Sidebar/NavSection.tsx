import { ReactNode } from 'react'
import { Box, Stack, Text } from '@chakra-ui/react'

interface NavSectionProps {
  children: ReactNode
  title: string
}

export const NavSection = ({ children, title }: NavSectionProps) => {
  return (
    <Box>
      <Text color="gray.400" fontSize="small" fontWeight="bold">{title}</Text>
      <Stack align="stretch" marginTop="8" spacing="4">
        {children}
      </Stack>
    </Box>
  )
}