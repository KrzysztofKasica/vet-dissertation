import { Button, Stack, useColorModeValue, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { DarkModeSwitch } from "./DarkModeSwitch";


export const LoggedInButtons = () => {
    const buttonColor = useColorModeValue('white', 'black');
    const buttonBg = useColorModeValue('green.500', 'green.200');
    const buttonColorHover = useColorModeValue('gray.100', 'gray.700');
    const buttonBgHover = useColorModeValue('green.600', 'green.300');
    const toast = useToast();
    const router = useRouter();
    const Logout = async () => {
        const response = await fetch('http://localhost:4000/client/logout', {
            credentials: 'include',
            method: 'POST',
            headers: {'Content-Type': 'application/json'}})

            if (response.status === 200) {
                router.push('/');
            } else {
                toast({
                    title: "Logout Failed",
                    status: "error",
                    duration: 6000,
                    isClosable: false
                })
            }
    }
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
                href={'/dashboard'}>
                Dashboard
            </Button>
            <Button
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={buttonColor}
                bg={buttonBg}
                _hover={{
                bg: buttonBgHover,
                color: buttonColorHover
                }}
                onClick={Logout}>
                Sign Out
            </Button>
            <DarkModeSwitch />
        </Stack>
    )
}