import { Box, HStack, Text, } from "@chakra-ui/react";

export type visitHistoryProps ={
    visit_id: number;
    visit_startDate: Date;
    client_id: number;
    client_firstName: string;
    client_lastName: string;
    pet_name: string;
};

interface visitListProps {
    visits: visitHistoryProps[]
}

export const VisitHistoryList = (props: visitListProps) => {
    const visits = props.visits
    return (
        <div>
            {visits.map(visit => {
                const date = visit.visit_startDate.toString().replace('T', ' ').replace(':00.000Z', '');
                return (    
                <Box width={400} borderWidth='1px' borderRadius='lg' overflow='hidden' mb={10} shadow={'dark-lg'}>
                    <HStack display={'flex'} justifyContent={'space-between'}>
                        <Box ml={1}>
                            <Text key={visit.pet_name}>{visit.pet_name}</Text>
                            <Text key={visit.client_id + visit.visit_id}>{ visit.client_firstName + ' ' + visit.client_lastName}</Text>
                        </Box>
                        <Box>
                            <Text position={'relative'} top={0} right={0} key={visit.visit_startDate.toString()}>{date}</Text>
                        </Box>
                    </HStack>
                </Box>
                )
                })}
        </div>
    )
}