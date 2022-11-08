import { Box, Button, Flex, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import {  useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { VisitList, visitProps } from "../components/VisitsField";

type isDoctorType = {
    data: string
}

const Dashboard= () => {
    const buttonColor = useColorModeValue('white', 'black');
    const buttonBg = useColorModeValue('green.500', 'green.200');
    const buttonColorHover = useColorModeValue('gray.100', 'gray.700');
    const buttonBgHover = useColorModeValue('green.600', 'green.300');
    
    const [isDoctor, setIsDoctor] = useState<isDoctorType>({data: ''})
    const [status, setStatus] = useState<number>()
    const [visits, setVisits] = useState<Array<visitProps>>()
    useEffect(() => {
        fetch('http://localhost:4000/auth/isdoctor', {
        credentials: 'include',
        method: 'get',
        headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            setStatus(res.status);
            return res.json();
        })
        .then(data => setIsDoctor(data))
        .catch(err => console.log(err))

        fetch('http://localhost:4000/visit/getvisits', {
        credentials: 'include',
        method: 'get',
        headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(data => setVisits(data))
        .catch(err => console.log(err))

    }, [])

    if(status===200) {
        return (
            <Flex direction={"column"} justifyContent={'center'} alignContent={'space-between'}>
                <NavBar/>
                <Flex direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
                    <Box ml={300} maxW='300'>{visits ? <VisitList visits={visits} />: null}</Box>
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
    } else {
        return (
            '401 Unauthorized'
        )
    }
    
}

export default Dashboard;