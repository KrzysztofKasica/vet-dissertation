import { Box, Button, HStack, Text, VStack, } from "@chakra-ui/react";
import Link from "next/link";
import { SpeciesText } from "./SpeciesText";

export type petProps ={
    pet_id: number;
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
                const editUrl = "/pets/" + pet.pet_id.toString() + "/editpet";
                const date = pet.pet_dateOfBirth.toString().split('T')[0]
                return (    
                <Box width={400} borderWidth='1px' borderRadius='lg' overflow='hidden' mb={10}>
                    <HStack display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        {/* TODO: put buttons in a box so they dont stretch */}
                        <VStack display={'flex'} alignItems={'stretch'}>
                            <Text key={pet.pet_name}>Name: {pet.pet_name}</Text>
                            <SpeciesText key={pet.pet_id} petSpeciesId={pet.speciesId} species={species}/>
                            <Button size={'xs'}><Link href={{pathname: editUrl}}>Edit Pet</Link></Button>
                            {/* , query: {pet_dateOfBirth: date, pet_name: pet.pet_name} moze kiedys zadziala */}
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