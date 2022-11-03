import {
    Box,
    Flex,
    Text,
    Button,
    Stack,
    Link,
    useColorModeValue,
    useBreakpointValue,
} from '@chakra-ui/react';

import { DarkModeSwitch } from './DarkModeSwitch';
  
export default function NavBar() {
    const buttonColor = useColorModeValue('white', 'black');
    const buttonBg = useColorModeValue('green.500', 'green.200');
    const buttonColorHover = useColorModeValue('gray.100', 'gray.700');
    const buttonBgHover = useColorModeValue('green.600', 'green.300');

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
              Company name
            </Text>
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <Nav />
            </Flex>
          </Flex>
          <Stack
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
              href={'#'}>
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
          </Stack>
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