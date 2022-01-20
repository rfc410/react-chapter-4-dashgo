import { Button } from '@chakra-ui/react'

interface PaginationItemProps {
  isCurrent?: boolean
  number: number
  onPageChange: (page: number) => void
}

export const PaginationItem = ({
  isCurrent = false,
  number,
  onPageChange
}: PaginationItemProps) => {
  if (isCurrent) {
    return (
      <Button
        colorScheme="pink"
        disabled
        fontSize="xs"
        size="sm"
        width="4"
        _disabled={{
          backgroundColor: 'pink.500',
          cursor: 'default'
        }}
      >
        {number}
      </Button>
    )
  }
  
  return (
    <Button
      backgroundColor="gray.700"
      fontSize="xs"
      size="sm"
      width="4"
      _hover={{
        backgroundColor: 'gray.500'
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  )
}