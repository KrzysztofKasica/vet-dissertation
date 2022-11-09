import { Box, HStack, Text, VStack, } from "@chakra-ui/react";
import { SpeciesText } from "./SpeciesText";

export type petProps ={
    pet_Id: number;
    pet_name: string;
    pet_dateOfBirth: Date;
    speciesId: number;
};

export type speciesProps = {
    id: number;
    name: string;
}

interface petListProps {
    pets: petProps[];
    species: speciesProps[];
}

export const PetList = (props: petListProps) => {
    const {pets, species} = props;
    
    return (
        <div>

            {pets.map(pet => {
                const date = pet.pet_dateOfBirth.toString().replace('T', ' ').replace(':00.000Z', '')
                return (    
                <Box height={59} width={400} borderWidth='1px' borderRadius='lg' overflow='hidden' mb={10}>
                    <HStack display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <VStack display={'flex'} alignItems={'stretch'}>
                            <Text key={pet.pet_name}>Name: {pet.pet_name}</Text>
                            <SpeciesText key={pet.pet_Id} petSpeciesId={pet.speciesId} species={species}/>
                        </VStack>
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