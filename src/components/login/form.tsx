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
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import * as React from 'react'
import { Logo } from './Logo'
import { OAuthButtonGroup } from './OAuthButtonGroup'
import { PasswordField } from './PasswordField'
import axios from 'axios'
import { getCookie } from 'components/Storage/cookies'
import { useDispatch } from 'react-redux'
import { addUser, selectUser } from 'store/userReducer'
import { useAppSelector } from 'hooks/redux-hooks'
export default function App() {
  const [inputs, setInputs] = React.useState({})
  const toast = useToast()
  const navigate = useRouter()
  const dispatch = useDispatch()
  const user = useAppSelector(selectUser)
  React.useEffect(() => {
    if (user.name) navigate.replace('/')
  }, [navigate, user.name])
  const handleClick = () => {
    // console.log(inputs)
    axios
      .post('/api/v1/auth/login', inputs)
      .then(({ data }) => {
        toast({
          title: `Welcome Back ${data?.data.name?.split(' ')[0]}`,
          status: 'success',
          duration: 2000,
          position: 'top-right',
          isClosable: true,
        })
        dispatch(addUser({ ...data.data }))
        navigate.push('/')
      })
      .catch(err => {
        toast({
          title: `${err.response.data.message}`,
          status: 'error',
          duration: 2000,
          position: 'top-right',
          isClosable: true,
        })
        console.log(err.response)
      })
  }
  const onChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }
  // console.log(getCookie('user'))
  return (
    <Container
      maxW="lg"
      paddingTop={{ base: '12', md: '24' }}
      px={{ base: '6', sm: '8' }}
      marginBottom={'-30'}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
              Log in to your account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don{'"'}t have an account?</Text>
              <Button
                variant="link"
                colorScheme="accentLight"
                onClick={() => {
                  navigate.push('/register')
                }}
              >
                Sign up
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          // px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
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
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultIsChecked>Remember me</Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button variant="primary" onClick={handleClick} rounded={'md'}>
                Sign in
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
