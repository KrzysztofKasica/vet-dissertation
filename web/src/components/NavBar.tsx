import {
    Box,
    Flex,
    Text,
    Stack,
    Link,
    useColorModeValue,
    useBreakpointValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { LoggedInButtons } from './LoggedInButtons';
import { LoggedOutButtons } from './LoggedOutButtons';
  
export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    useEffect(() => {
      fetch('http://localhost:4000/auth/', {
        credentials: 'include',
        method: 'get',
        headers: {'Content-Type': 'application/json'}})
        .then((res) => res.json())
        .then(data => setIsLoggedIn(data.auth))
        .catch(err => console.log(err))
    }, [])
    return (
      <Box width={'100%'}>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}>
              <Link href='/' _hover={{text_decoration: 'none',}}>Company name</Link>
            </Text>
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <Nav />
            </Flex>
          </Flex>
          {isLoggedIn ? <LoggedInButtons/>: <LoggedOutButtons />}
          {/* <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
            <Button
              as={'a'}
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={buttonColor}
              bg={buttonBg}
              _hover={{
                bg: buttonBgHover,
                color: buttonColorHover
              }}
              href={'/login'}>
              Sign In
            </Button>
            <Button
              as={'a'}
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={buttonColor}
              bg={buttonBg}
              _hover={{
                bg: buttonBgHover,
                color: buttonColorHover
              }}
              href={'/register'}>
              Sign Up
            </Button>
            <DarkModeSwitch />
          </Stack> */}
        </Flex>
      </Box>
    );
}
  
  const Nav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('black', 'white');
  
    return (
      <Stack direction={'row'} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
            </Link>
          </Box>
        ))}
      </Stack>
    );
  };
  
  interface NavItem {
    label: string;
    href?: string;
  }
  
  const NAV_ITEMS: Array<NavItem> = [
    {
      label: 'Example1',
      href: '/example',
    },
    {
        label: 'Example2',
        href: '/example2',
    }
  ];