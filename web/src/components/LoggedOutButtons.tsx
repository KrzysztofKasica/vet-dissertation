import { Button, Stack, useColorModeValue } from "@chakra-ui/react"
import { DarkModeSwitch } from "./DarkModeSwitch"

export const LoggedOutButtons = () => {
    const buttonColor = useColorModeValue('white', 'black');
    const buttonBg = useColorModeValue('green.500', 'green.200');
    const buttonColorHover = useColorModeValue('gray.100', 'gray.700');
    const buttonBgHover = useColorModeValue('green.600', 'green.300');
    return (
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
        </Stack>
    )
}