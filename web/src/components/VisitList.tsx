import { Box, Button, HStack, Text, useToast, } from "@chakra-ui/react";
import { useRouter } from "next/router";

export type visitProps ={
    visit_id: number;
    visit_status: string;
    visit_startDate: Date;
    doctorId: number;
    petId: number;
};

interface visitListProps {
    visits: visitProps[]
}

export const VisitList = (props: visitListProps) => {
    const visits = props.visits
    const router = useRouter()
    const toast = useToast()
    return (
        <div>
            {visits.map(visit => {
                const date = visit.visit_startDate.toString().replace('T', ' ').replace(':00.000Z', '');
                const cancelData = {date: visit.visit_startDate, doctorId: visit.doctorId, visitId: visit.visit_id }
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
                <Box width={400} borderWidth='1px' borderRadius='lg' overflow='hidden' mb={10}>
                    <HStack display={'flex'} justifyContent={'space-between'}>
                        <Box>
                            <Text key={visit.petId}>{visit.petId}</Text>
                            <Text key={visit.doctorId}>{visit.doctorId}</Text>
                            <Text key={visit.visit_status}>{visit.visit_status}</Text>
                        </Box>
                        <Box>
                            <Text position={'relative'} top={-1} right={2} key={visit.visit_startDate.toString()}>{date}</Text>
                            {visit.visit_status === 'TO BE ACCEPTED' && 
                            <Button onClick={cancelVisit} >Cancel</Button> || visit.visit_status === 'PENDING' && <Button onClick={cancelVisit} >Cancel</Button> }
                        </Box>
                    </HStack>
                </Box>
                )
                })}
        </div>
    )
}