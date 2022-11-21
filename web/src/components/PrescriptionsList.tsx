import { Box, HStack, Text, } from "@chakra-ui/react";

export type prescriptionProps ={
    quantity : Number[];
    pet: {name: string};
    medication: {name: string}[];
    createdAt: Date;
};

interface prescriptionListProps {
    prescriptions: prescriptionProps[]
}

export const PrescriptionsList = (props: prescriptionListProps) => {
    const prescriptions = props.prescriptions
    
    return (
        <div>

            {prescriptions.map(prescription => {
                const date = prescription.createdAt.toString().replace('T', ' ').slice(0, 16);
                return (    
                <Box width={400} borderWidth='5px' borderRadius='lg' overflow='hidden' mb={10} borderColor="blackAlpha.400">
                    <HStack display={'flex'} justifyContent={'space-between'}>
                        <Box>
                            <Text key={prescription.pet.name}>{prescription.pet.name}</Text>
                            <Text key={prescription.medication[0].name}>{prescription.medication[0].name}</Text>
                            <Text key={prescription.quantity[0].toString()}>{prescription.quantity[0].toString()}</Text>
                        </Box>
                        <Box>
                            <Text position={'relative'} top={-5} right={2} key={prescription.createdAt.toString()}>{date}</Text>
                        </Box>
                    </HStack>
                </Box>
                )
                })}
        </div>
    )
}