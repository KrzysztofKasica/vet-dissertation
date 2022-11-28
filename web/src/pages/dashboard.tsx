import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import {  useEffect, useState } from "react";
import { DashboardButton } from "../components/DashboardButton";
import NavBar from "../components/NavBar";
import { VisitList, visitProps } from "../components/VisitList";

type isDoctorType = {
    data: string
}

const Dashboard= () => {
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

        fetch('http://localhost:4000/visit/getlatestvisits', {
        credentials: 'include',
        method: 'get',
        headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(data => setVisits(data))
        .catch(err => console.log(err))

    }, [])

    if(isDoctor.data === "false") {
        return (
            <Flex direction={"column"} justifyContent={'center'} alignContent={'space-between'}>
                <NavBar/>
                <Flex direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
                    <Box mt={100} ml={200} maxW='300'>{visits ? <VisitList visits={visits} />: null}</Box>
                    <SimpleGrid mt={120} mr={200} columns={2} spacing={100}>
                        <DashboardButton href='/visits' text='Visit History'/>
                        <DashboardButton href='/pets' text='Pets'/>
                        <DashboardButton href='/prescriptions' text='Prescriptions'/>
                        <DashboardButton href='/bookavisit' text='Book a Visit'/>
                    </SimpleGrid>
                </Flex>
            </Flex>
        )
    } else if (isDoctor.data === "true"){
        return (
            <Flex direction={"column"} justifyContent={'center'} alignContent={'space-between'}>
                <NavBar/>
                <Flex direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
                    <Box mt={100} ml={200} maxW='300'></Box>
                    <SimpleGrid mt={120} mr={200} columns={2} spacing={100}>
                        <DashboardButton href='/visitrequests' text='Visit Requests'/>
                        <DashboardButton href='/incomingvisits' text='Incoming Visits'/>
                        <DashboardButton href='/' text='Visit History'/>
                        <DashboardButton href='/' text='Medication'/>
                    </SimpleGrid>
                </Flex>
            </Flex>
        )
    }
    
}

export default Dashboard;