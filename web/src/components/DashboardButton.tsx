import { Box, Button, useColorModeValue, } from "@chakra-ui/react";

interface dashboardButtonProps {
    href: string;
    text: string
}

export const DashboardButton = (props: dashboardButtonProps) => {
    const buttonColor = useColorModeValue('white', 'black');
    const buttonBg = useColorModeValue('green.500', 'green.200');
    const buttonColorHover = useColorModeValue('gray.100', 'gray.700');
    const buttonBgHover = useColorModeValue('green.600', 'green.300');
    return (
        <Box height={40} width={40} borderRadius='full'>
            <Button
                as={'a'}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'2xl'}
                fontWeight={600}
                color={buttonColor}
                bg={buttonBg}
                _hover={{
                    bg: buttonBgHover,
                    color: buttonColorHover
                }}
                href={props.href}
                width={'100%'}
                height={'100%'}>
                {props.text}
            </Button>
        </Box>
    )
}