import { Box, Flex } from "@chakra-ui/react";
import {  useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { prescriptionProps, PrescriptionsList } from "../components/PrescriptionsList";

type isDoctorType = {
    data: string
}

const Prescriptions= () => {
    const [isDoctor, setIsDoctor] = useState<isDoctorType>({data: ''})
    const [status, setStatus] = useState<number>()
    const [prescriptions, setPrescriptions] = useState<Array<prescriptionProps>>()
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

        fetch('http://localhost:4000/prescription/getprescriptionsbyclient', {
        credentials: 'include',
        method: 'get',
        headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(data => setPrescriptions(data))
        .catch(err => console.log(err))

    }, [])

    if(status===200 && isDoctor.data==='false') {
        return (
            <Flex direction={"column"} justifyContent={'center'} alignContent={'space-between'}>
                <NavBar/>
                <Flex direction={'row'} justifyContent={'center'} alignContent={'center'}>
                    <Box mt={30} maxW='300'>{prescriptions ? <PrescriptionsList prescriptions={prescriptions} />: null}</Box>                    
                </Flex>
            </Flex>
        )
    } else {
        return (
            '401 Unauthorized'
        )
    }
    
}

export default Prescriptions;