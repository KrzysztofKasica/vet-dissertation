import {  Center, Flex } from "@chakra-ui/react";
import {  useEffect, useState } from "react";
import { FormikAddPet } from "../../components/FormikAddPet";
import NavBar from "../../components/NavBar";

type isDoctorType = {
    data: string
}

const AddPet= () => {
    const [isDoctor, setIsDoctor] = useState<isDoctorType>({data: ''})
    const [status, setStatus] = useState<number>()
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

        fetch('http://localhost:4000/species/getspecies', {
        credentials: 'include',
        method: 'get',
        headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(data => setSpecies(data))
        .catch(err => console.log(err))
    }, [])
    if(status===200 && isDoctor.data === "false") {
        return (
            <Flex direction={"column"} justifyContent='center' alignContent={'center'}>
                <NavBar/>
                <Center>
                    <Flex maxW='100%' mt={'10vh'}>
                        {species ? <FormikAddPet species={species}/>: null}
                    </Flex>
                </Center>
            </Flex>
        )
    } else {
        return (
            '401 Unauthorized'
        )
    }
    
}

export default AddPet;