import { Box, Button, Flex, Heading, HStack, Text, useToast, } from "@chakra-ui/react";
import { useRouter } from "next/router";

export type visitRequestsProps ={
    visit_id: number;
    visit_startDate: Date;
    client_id: number;
    client_firstName: string;
    client_lastName: string;
    pet_name: string;
};

interface visitListProps {
    visitRequests: visitRequestsProps[]
}

export const VisitRequestList = (props: visitListProps) => {
    const visits = props.visitRequests
    const router = useRouter()
    const toast = useToast()
    return (
        <Flex direction={'column'} justifySelf={"center"}>
            <Heading ml={79} mb={2} whiteSpace={'nowrap'}>Visit Requests</Heading>
            {visits.map(visit => {
                const date = visit.visit_startDate.toString().replace('T', ' ').replace(':00.000Z', '');
                const cancelData = {date: visit.visit_startDate, visitId: visit.visit_id }
                const cancelVisit = async () =>{
                    const response = await fetch('http://localhost:4000/visit/cancelvisit', {
                    credentials: 'include',
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({data: cancelData})})
                    if (response.status === 200) {
                        toast({
                            title: "Visit Cancelled",
                            status: "success",
                            duration: 6000,
                            isClosable: false
                        })
                        router.reload();
                      } else {
                        toast({
                          title: "Cancel Failed",
                          status: "error",
                          duration: 6000,
                          isClosable: false
                        })
                      }
                }
                const acceptData = { visitId: visit.visit_id }
                const acceptVisit = async () =>{
                    const response = await fetch('http://localhost:4000/visit/acceptvisit', {
                    credentials: 'include',
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({data: acceptData})})
                    if (response.status === 200) {
                        toast({
                            title: "Visit Accepted",
                            status: "success",
                            duration: 6000,
                            isClosable: false
                        })
                        router.reload();
                      } else {
                        toast({
                          title: "Accept Failed",
                          status: "error",
                          duration: 6000,
                          isClosable: false
                        })
                      }
                }
                return (    
                <Box width={400} borderWidth='1px' borderRadius='lg' overflow='hidden' mb={10} shadow={'dark-lg'}>
                    <HStack display={'flex'} justifyContent={'space-between'}>
                        <Box ml={1}>
                            <Text key={visit.pet_name}>{visit.pet_name}</Text>
                            <Text key={visit.client_id + visit.visit_id}>{ visit.client_firstName + ' ' + visit.client_lastName}</Text>
                        </Box>
                        <Box>
                            <Text key={visit.visit_startDate.toString()}>{date}</Text>
                            <Flex gap={"20px"} mr={"1"}>
                                <Button size={"sm"} onClick={acceptVisit} >Accept</Button>                          
                                <Button size={"sm"} onClick={cancelVisit} >Reject</Button>
                            </Flex>
                        </Box>
                    </HStack>
                </Box>
                )
                })}
        </Flex>
    )
}