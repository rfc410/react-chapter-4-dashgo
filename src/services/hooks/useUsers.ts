import { useQuery } from 'react-query'

import { api } from '../api'

type User = {
  createdAt: string
  email: string
  id: string
  name: string
}

type GetUsersRespose = {
  totalCount: number
  users: User[]
}

const TEN_MINUTES = 1000 * 60 * 10

const getUsers = async (currentPage: number): Promise<GetUsersRespose> => {
  const response = await api.get('users', {
    params: {
      page: currentPage
    }
  })
  const { data, headers } = response
  
  const totalCount = Number(headers['x-total-count'])

  const users = data.users.map((user) => {
    const { createdAt, ...userProps } = user
    return {
      ...userProps,
      createdAt: new Date(createdAt).toLocaleDateString('pt-br', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })
  return { totalCount, users }
}

export const useUsers = (currentPage: number) => {
  return useQuery(['users', currentPage], () => getUsers(currentPage), {
    staleTime: TEN_MINUTES
  })
}