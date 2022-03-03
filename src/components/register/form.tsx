import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import * as React from 'react'
import AxiosProvider from 'utils/AxiosInterceptor'
import { Logo } from './Logo'
import { OAuthButtonGroup } from './OAuthButtonGroup'
import { PasswordField } from './PasswordField'
import axios from 'axios'
export default function App() {
  const handleClick = () => {
    console.log(inputs)
    if (inputs.password === inputs.confirmPassword) {
      axios
        .post('/api/v1/auth/register', inputs)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }
  const navigate = useRouter()
  const [checked, setChecked] = React.useState(false)
  const [inputs, setInputs] = React.useState({})
  const onChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }
  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
              Log in to your account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Already have an account?</Text>
              <Button
                variant="link"
                colorScheme="blue"
                onClick={() => {
                  navigate.push('/login')
                }}
              >
                Sign in
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  style={{ boxShadow: '0px 0px 1px black' }}
                  {...{ onChange }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  style={{ boxShadow: '0px 0px 1px black' }}
                  {...{ onChange }}
                />
              </FormControl>
              <PasswordField {...{ onChange }} />
              <PasswordField confirm={'true'} {...{ onChange }} />
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultIsChecked>Remember me</Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button variant="primary" onClick={handleClick} rounded={'md'}>
                Sign up
              </Button>
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
              <OAuthButtonGroup />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}
