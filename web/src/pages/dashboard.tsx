import { Box, Button, Flex, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { InputHTMLAttributes } from "react";
import NavBar from "../components/NavBar";

export async function getServerSideProps() {
    const isDoc = await fetch('http://127.0.0.1:4000/auth/isdoctor');
    console.log(isDoc);
    return {
        props: {
            doctor: 'gowno'
        }
    }
};

type DashboardProps = InputHTMLAttributes<HTMLInputElement> & {
    doctor: string;
};

const Dashboard: React.FC<DashboardProps> = ({doctor}) => {
    const buttonColor = useColorModeValue('white', 'black');
    const buttonBg = useColorModeValue('green.500', 'green.200');
    const buttonColorHover = useColorModeValue('gray.100', 'gray.700');
    const buttonBgHover = useColorModeValue('green.600', 'green.300');
    return (
        <Flex direction={"column"} justifyContent={'center'} alignContent={'space-between'}>
            <NavBar/>
            <Flex direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
                <Box ml={300}>gowno</Box>
                <SimpleGrid mt={100} mr={200} columns={2} spacing={100}>
                    <Box height={40} width={40} borderRadius='full'>
                        <Button
                            as={'a'}
                            display={{ base: 'none', md: 'inline-flex' }}
                            fontSize={'3xl'}
                            fontWeight={600}
                            color={buttonColor}
                            bg={buttonBg}
                            _hover={{
                                bg: buttonBgHover,
                                color: buttonColorHover
                            }}
                            href={'/'}
                            width={'100%'}
                            height={'100%'}>
                            gowno
                        </Button>
                    </Box>
                    <Box bg='tomato' height={40} width={40} borderRadius='full'>
                        <Button
                            as={'a'}
                            display={{ base: 'none', md: 'inline-flex' }}
                            fontSize={'3xl'}
                            fontWeight={600}
                            color={buttonColor}
                            bg={buttonBg}
                            _hover={{
                                bg: buttonBgHover,
                                color: buttonColorHover
                            }}
                            href={'/'}
                            width={'100%'}
                            height={'100%'}>
                            gowno
                        </Button>
                    </Box>
                    <Box bg='tomato' height={40} width={40} borderRadius='full'>
                        <Button
                            as={'a'}
                            display={{ base: 'none', md: 'inline-flex' }}
                            fontSize={'3xl'}
                            fontWeight={600}
                            color={buttonColor}
                            bg={buttonBg}
                            _hover={{
                                bg: buttonBgHover,
                                color: buttonColorHover
                            }}
                            href={'/'}
                            width={'100%'}
                            height={'100%'}>
                            gowno
                        </Button>
                    </Box>
                    <Box bg='tomato' height={40} width={40} borderRadius='full'>
                        <Button
                            as={'a'}
                            display={{ base: 'none', md: 'inline-flex' }}
                            fontSize={'3xl'}
                            fontWeight={600}
                            color={buttonColor}
                            bg={buttonBg}
                            _hover={{
                                bg: buttonBgHover,
                                color: buttonColorHover
                            }}
                            href={'/'}
                            width={'100%'}
                            height={'100%'}>
                            gowno
                        </Button>
                    </Box>
                </SimpleGrid>
            </Flex>
        </Flex>
    )
}

export default Dashboard;