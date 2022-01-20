import { useEffect } from 'react'
import { Button, Flex, Stack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
// https://github.com/react-hook-form/resolvers/issues/271
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd'

import { Input } from '../components/Form/Input'

type SignInFormData = {
  email: string
  password: string
}

const signInFormSchema = yup.object().shape({
  email: yup.string().email('Enter a valid e-mail.').required('Required field.'),
  password: yup.string().required('Required field.')
})

export default function SignIn() {
  const { formState, handleSubmit, register } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const handleSignIn: SubmitHandler<SignInFormData> = (values) => {
    console.log(values)
  }

  useEffect(() => {
    console.log(formState.errors)
  }, [formState])

  return (
    <Flex
      alignItems="center"
      height="100vh"
      justifyContent="center"
      width="100vw"
    >
      <Flex
        as="form"
        backgroundColor="gray.800"
        borderRadius={8}
        flexDirection="column"
        maxWidth={360}
        padding="8"
        width="100%"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            error={formState.errors.email}
            label="E-mail"
            name="email"
            type="email"
            {...register('email')}
          />

          <Input
            error={formState.errors.password}
            label="Senha"
            name="password"
            type="password"
            {...register('password')}
          />
        </Stack>

        <Button
          colorScheme="pink"
          marginTop="6"
          size="lg"
          type="submit"
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
