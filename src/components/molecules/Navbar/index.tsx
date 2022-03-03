import { Box, Container, Flex, HStack } from '@chakra-ui/react'

import Logo from 'components/atoms/Logo'
import MenuIcon from 'components/atoms/MenuIcon'
import CartIcon from 'components/atoms/CartIcon'
import NavLinks, { NavLink } from '../NavLinks'
import { useRouter } from 'next/router'
import { selectUser } from 'store/userReducer'
import { useAppSelector } from 'hooks/redux-hooks'

const Navbar = (): JSX.Element => {
  const { asPath } = useRouter()
  const user = useAppSelector(selectUser)
  return (
    <Container maxW="container.lg" px={6}>
      <Flex
        justify="space-between"
        position="relative"
        zIndex="modal"
        sx={{
          '@media screen and (min-width: 30em)': {
            '&::after': {
              content: "''",
              position: 'absolute',
              bottom: '-2rem',
              height: '0.0625rem',
              width: '100%',
              backgroundColor: 'divider',
            },
          },
        }}
      >
        <MenuIcon />
        <Logo />
        <NavLinks />
        {user?._id ? (
          <Box display={'flex'} style={{ gap: '.5rem' }}>
            <CartIcon />
            <Box as="nav" display={{ base: 'none', lg: 'block' }}>
              <HStack as="ul" display="flex" spacing={9} listStyleType="none">
                <Box
                  as="li"
                  fontSize="sm"
                  fontWeight="bold"
                  _hover={{ color: 'accent' }}
                  transition="color 0.2s linear"
                  letterSpacing="0.125em"
                  color={asPath === '/logout' ? 'accent' : 'white'}
                  textTransform="uppercase"
                >
                  <NavLink href={'/logout'} active={asPath === '/logout'}>
                    <a>{'Logout'}</a>
                  </NavLink>
                </Box>
              </HStack>
            </Box>
          </Box>
        ) : (
          <Box as="nav" display={{ base: 'none', lg: 'block' }}>
            <HStack as="ul" display="flex" spacing={9} listStyleType="none">
              <Box
                as="li"
                fontSize="sm"
                fontWeight="bold"
                _hover={{ color: 'accent' }}
                transition="color 0.2s linear"
                letterSpacing="0.125em"
                color={asPath === '/login' ? 'accent' : 'white'}
                textTransform="uppercase"
              >
                <NavLink href={'/login'} active={asPath === '/login'}>
                  <a>{'Login'}</a>
                </NavLink>
              </Box>
            </HStack>
          </Box>
        )}
      </Flex>
    </Container>
  )
}

export default Navbar
