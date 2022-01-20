import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
// https://github.com/react-hook-form/resolvers/issues/271
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd'
import { useMutation } from 'react-query'

import { Header } from '../../components/Header'
import { Input } from '../../components/Form/Input'
import { Sidebar } from '../../components/Sidebar'

import { api } from '../../services/api'
import { queryClient } from '../../services/queryClient'

type CreateUserFormData = {
  email: string
  name: string
  password: string
  password_confirmation: string
}

const createUserFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid e-mail.')
    .required('Required field.'),
  name: yup.string().required('Required field.'),
  password: yup
    .string()
    .min(6, 'Password is too short.')
    .required('Required field.'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'The password is different.')
})

const CreateUser = () => {
  const router = useRouter()
  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: { ...user, created_at: new Date() }
    })
    return response.data.user
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  })
  const { formState, handleSubmit, register } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await createUser.mutateAsync(values)
    router.push('/users')
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
          as="form"
          backgroundColor="gray.800"
          borderRadius={8}
          flex="1"
          padding={['6', '8']}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading fontWeight="normal" size="lg">Criar usuário</Heading>

          <Divider borderColor="gray.700" marginY="6" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} width="100%">
              <Input
                error={formState.errors.name}
                label="Nome completo"
                name="name"
                {...register('name')}
              />

              <Input
                error={formState.errors.email}
                label="E-mail"
                name="email"
                type="email"
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} width="100%">
              <Input
                error={formState.errors.password}
                label="Senha"
                name="password"
                type="password"
                {...register('password')}
              />

              <Input
                error={formState.errors.password_confirmation}
                label="Confirmação de senha"
                name="password_confirmation"
                type="password"
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex justify="flex-end" marginTop="8">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button
                colorScheme="pink"
                isLoading={formState.isSubmitting}
                type="submit"
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default CreateUser
