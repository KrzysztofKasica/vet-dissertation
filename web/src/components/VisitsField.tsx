import { Box, HStack, Text, } from "@chakra-ui/react";

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
    
    return (
        <div>

            {visits.map(visit => {
                const date = visit.visit_startDate.toString().replace('T', ' ').replace(':00.000Z', '')
                return (    
                <Box width={400} borderWidth='1px' borderRadius='lg' overflow='hidden' mb={10}>
                    <HStack display={'flex'} justifyContent={'space-between'}>
                        <Box>
                            <Text key={visit.petId}>{visit.petId}</Text>
                            <Text key={visit.doctorId}>{visit.doctorId}</Text>
                            <Text key={visit.visit_status}>{visit.visit_status}</Text>
                        </Box>
                        <Box>
                            <Text position={'relative'} top={-5} right={2} key={visit.visit_startDate.toString()}>{date}</Text>
                        </Box>
                    </HStack>
                </Box>
                )
                })}
        </div>
    )
}