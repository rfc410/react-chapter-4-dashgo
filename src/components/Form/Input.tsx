import { forwardRef, ForwardRefRenderFunction } from 'react'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
  error?: FieldError
  label?: string
  name: string
}

const _Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { error = null, label, name, ...props },
  ref
) => {
  console.log(error)
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <ChakraInput
        backgroundColor="gray.900"
        focusBorderColor="pink.500"
        id={name}
        name={name}
        size="lg"
        variant="filled"
        _hover={{
          bgColor: 'gray.900'
        }}
        ref={ref}
        {...props}
      />
      {!!error && (
        <FormErrorMessage>{error.message}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export const Input = forwardRef(_Input)
