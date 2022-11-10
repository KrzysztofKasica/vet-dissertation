import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import {  useEffect, useState } from "react";
import { DashboardButton } from "../components/DashboardButton";
import NavBar from "../components/NavBar";
import { PetList, petProps } from "../components/PetList";

type isDoctorType = {
    data: string
}

const Pets= () => {
    const [isDoctor, setIsDoctor] = useState<isDoctorType>({data: ''})
    const [status, setStatus] = useState<number>()
    const [pets, setPets] = useState<Array<petProps>>()
    const [species, setSpecies] =useState()
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

        fetch('http://localhost:4000/pet/getpets', {
        credentials: 'include',
        method: 'get',
        headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(data => setPets(data))
        .catch(err => console.log(err))

        fetch('http://localhost:4000/species/getspecies', {
        credentials: 'include',
        method: 'get',
        headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(data => setSpecies(data))
        .catch(err => console.log(err))
    }, [])
    //TODO: addpet i deletepet
    if(status===200 && isDoctor.data === "false") {
        return (
            <Flex direction={"column"} justifyContent={'center'} alignContent={'space-between'}>
                <NavBar/>
                <Flex direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
                    <Box mt={100} ml={200} maxW='300'>{pets ? species ? <PetList pets={pets} species={species} />: null: null}</Box>
                    <SimpleGrid mt={120} mr={200} columns={2} spacing={100}>
                        <DashboardButton href='/addpet' text='Add Pet'/>
                        <DashboardButton href='/deletepet' text='Delete Pet'/>
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

export default Pets;