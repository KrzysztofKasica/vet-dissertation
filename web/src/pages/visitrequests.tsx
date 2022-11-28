import { Box, Flex } from "@chakra-ui/react";
import {  useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { VisitRequestList, visitRequestsProps } from "../components/VisitRequestList";

type isDoctorType = {
    data: string
}

const VisitRequests= () => {
    const [isDoctor, setIsDoctor] = useState<isDoctorType>({data: ''})
    const [visitRequests, setVisitRequests] = useState<Array<visitRequestsProps>>()
    useEffect(() => {
        fetch('http://localhost:4000/auth/isdoctor', {
        credentials: 'include',
        method: 'get',
        headers: {'Content-Type': 'application/json'}})
        .then((res) => res.json())
        .then(data => setIsDoctor(data))
        .catch(err => console.log(err))

        fetch('http://localhost:4000/visit/getvisitrequests', {
        credentials: 'include',
        method: 'get',
        headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(data => setVisitRequests(data))
        .catch(err => console.log(err))

    }, [])

    if(isDoctor.data==='true') {
        return (
            <Flex direction={"column"} justifyContent={'center'} alignContent={'space-between'}>
                <NavBar/>
                <Flex direction={'row'} justifyContent={'center'} alignContent={'center'}>
                    <Box mt={30} maxW='300'>{visitRequests ? <VisitRequestList visitRequests={visitRequests} />: null}</Box>                    
                </Flex>
            </Flex>
        )
    } else {
        return (
            '401 Unauthorized'
        )
    }
    
}

export default VisitRequests;