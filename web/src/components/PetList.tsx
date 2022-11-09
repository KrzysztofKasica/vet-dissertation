import { Box, HStack, Text, } from "@chakra-ui/react";

export type petProps ={
    pet_Id: number;
    pet_name: string;
    pet_dateOfBirth: Date;
    speciesId: number;
};

interface petListProps {
    pets: petProps[]
}

export const PetList = (props: petListProps) => {
    const pets = props.pets;
    
    return (
        <div>

            {pets.map(pet => {
                const date = pet.pet_dateOfBirth.toString().replace('T', ' ').replace(':00.000Z', '')
                return (    
                <Box height={100} width={400} borderWidth='1px' borderRadius='lg' overflow='hidden' mb={10}>
                    <HStack display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Box>
                            <Text key={pet.pet_name}>Name: {pet.pet_name}</Text>
                        </Box>
                         <Box>
                             <Text  key={pet.pet_dateOfBirth.toString()}>Date of birth: {date}</Text>
                         </Box>
                    </HStack>
                </Box>
                )
                })}
        </div>
    )
}