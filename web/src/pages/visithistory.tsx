import { Box, Flex } from "@chakra-ui/react";
import {  useEffect, useState } from "react";
import { IncomingVisitsList, incomingVisitsProps } from "../components/IncomingVisitsList";
import NavBar from "../components/NavBar";
import { VisitHistoryList, visitHistoryProps } from "../components/VisitHistoryList";

type isDoctorType = {
    data: string
}

const VisitHistory= () => {
    const [isDoctor, setIsDoctor] = useState<isDoctorType>({data: ''})
    const [visitHistory, setVisitHistory] = useState<Array<visitHistoryProps>>()
    useEffect(() => {
        fetch('http://localhost:4000/auth/isdoctor', {
        credentials: 'include',
        method: 'get',
        headers: {'Content-Type': 'application/json'}})
        .then((res) => res.json())
        .then(data => setIsDoctor(data))
        .catch(err => console.log(err))

        fetch('http://localhost:4000/visit/getvisithistory', {
        credentials: 'include',
        method: 'get',
        headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(data => setVisitHistory(data))
        .catch(err => console.log(err))

    }, [])

    if(isDoctor.data==='true') {
        return (
            <Flex direction={"column"} justifyContent={'center'} alignContent={'space-between'}>
                <NavBar/>
                <Flex direction={'row'} justifyContent={'center'} alignContent={'center'}>
                    <Box mt={30} maxW='300'>{visitHistory ? <VisitHistoryList visits={visitHistory} />: null}</Box>                    
                </Flex>
            </Flex>
        )
    } else {
        return (
            '401 Unauthorized'
        )
    }
    
}

export default VisitHistory;