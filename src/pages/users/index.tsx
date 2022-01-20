import { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { RiAddLine } from 'react-icons/ri'

import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/Sidebar'

import { api } from '../../services/api'
import { useUsers } from '../../services/hooks/useUsers'
import { queryClient } from '../../services/queryClient'

const TEN_MINUTES = 1000 * 60 * 10

const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, error, isFetching, isLoading } = useUsers(currentPage)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  const handlePrefecthUser = async (userId: string) => {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)
      return response.data
    }, {
      staleTime: TEN_MINUTES
    })
  }

  return (
    <Box>
      <Header />

      <Flex
        marginX="auto"
        marginY="6"
        maxWidth={1480}
        paddingX="6"
        width="100%"
      >
        <Sidebar />

        <Box
          backgroundColor="gray.800"
          borderRadius={8}
          flex="1"
          padding="8"
        >
          <Flex
            align="center"
            justify="space-between"
            marginBottom="8"
          >
            <Heading fontWeight="normal" size="lg">
              Usuários

              {!isLoading && isFetching && (
                <Spinner color="gray.500" marginLeft="4" size="sm" />
              )}
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                colorScheme="pink"
                fontSize="sm"
                leftIcon={<Icon as={RiAddLine} />}
                size="sm"
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>Erro ao obter os dados dos usuários.</Text>
              </Flex>
            ) : (
              <>
                <Pagination
                  currentPage={currentPage}
                  totalCountOfRegisters={data.totalCount}
                  onPageChange={setCurrentPage}
                />

                <Table colorScheme="whiteAlpha" marginTop="4">
                  <Thead>
                    <Tr>
                      <Th color="gray.300" paddingX={['4', '4', '6']} width="8">
                        <Checkbox colorScheme="pink" />
                      </Th>
                      <Th>Usuário</Th>
                      {isWideVersion && <Th>Data de cadastro</Th>}
                    </Tr>
                  </Thead>

                  <Tbody>
                    {data.users.map((user) => (
                      <Tr key={user.id}>
                        <Td paddingX={['4', '4', '6']}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Link
                              color="purple.400"
                              onMouseEnter={() => handlePrefecthUser(user.id)}
                            >
                              <Text fontWeight="bold">{user.name}</Text>
                            </Link>
                            <Text color="gray.300" fontSize="sm">{user.email}</Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.createdAt}</Td>}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>

                <Pagination
                  currentPage={currentPage}
                  totalCountOfRegisters={data.totalCount}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
        </Box>
      </Flex>
    </Box>
  )
}

export default UserList
