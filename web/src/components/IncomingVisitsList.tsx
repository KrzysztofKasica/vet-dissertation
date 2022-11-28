import { Box, Button, Flex, HStack, Text, useToast, } from "@chakra-ui/react";
import { useRouter } from "next/router";

export type incomingVisitsProps ={
    visit_id: number;
    visit_startDate: Date;
    client_id: number;
    client_firstName: string;
    client_lastName: string;
    pet_name: string;
};

interface visitListProps {
    incomingVisits: incomingVisitsProps[]
}

export const IncomingVisitsList = (props: visitListProps) => {
    const visits = props.incomingVisits
    const router = useRouter()
    const toast = useToast()
    return (
        <div>
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
                          title: "Submit Failed",
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
                            <Text position={'relative'} top={0} right={0} key={visit.visit_startDate.toString()}>{date}</Text>
                            <Flex gap={"20px"} mr={"1"}>
                                <Button size={"sm"} onClick={cancelVisit} >Cancel</Button>
                            </Flex>
                        </Box>
                    </HStack>
                </Box>
                )
                })}
        </div>
    )
}