import { Box, Stack, Text } from '@chakra-ui/react'

import { PaginationItem } from './PaginationItem'

interface PaginationProps {
  currentPage?: number
  registersPerPage?: number
  totalCountOfRegisters: number
  onPageChange: (page: number) => void
}

const SIBLINGS_COUNT = 1

const generatePagesArray = (from: number, to: number) => {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0)
}

export const Pagination = (props: PaginationProps) => {
  const {
    currentPage = 1,
    registersPerPage = 10,
    totalCountOfRegisters,
    onPageChange
  } = props
  
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage)

  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - SIBLINGS_COUNT, currentPage - 1)
    : []
  
  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + SIBLINGS_COUNT, lastPage))
    : []

  return (
    <Stack
      align="center"
      direction={['column', 'row']}
      justify="space-between"
      marginTop="8"
      spacing="6"
    >
      <Box>
        <strong>{((currentPage - 1) * registersPerPage) + 1}</strong> - <strong>{currentPage * registersPerPage}</strong> de  <strong>{totalCountOfRegisters}</strong>
      </Box>

      <Stack direction="row" spacing="2">
        {currentPage > (1 + SIBLINGS_COUNT) && (
          <>
            <PaginationItem number={1} onPageChange={onPageChange} />
            {currentPage > (2 + SIBLINGS_COUNT) && (
              <Text color="gray.300" textAlign="center" width="6">...</Text>
            )}
          </>
        )}

        {previousPages.length > 0 && (
          previousPages.map(
            (page) => <PaginationItem key={page} number={page} onPageChange={onPageChange} />
          )
        )}

        <PaginationItem isCurrent number={currentPage} onPageChange={onPageChange} />

        {nextPages.length > 0 && (
          nextPages.map(
            (page) => <PaginationItem key={page} number={page} onPageChange={onPageChange} />
          )
        )}

        {(currentPage + SIBLINGS_COUNT) < lastPage && (
          <>
            {(currentPage + 1 + SIBLINGS_COUNT) < lastPage && (
              <Text color="gray.300" textAlign="center" width="6">...</Text>
            )}
            <PaginationItem number={lastPage} onPageChange={onPageChange} />
          </>
        )}
      </Stack>
    </Stack>
  )
}