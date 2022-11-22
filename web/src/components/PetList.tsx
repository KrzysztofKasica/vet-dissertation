import { Box, Button, HStack, Text, useToast, VStack, } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
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
    const router = useRouter();
    const toast = useToast();
    return (
        <div>

            {pets.map(pet => {
                const editUrl = "/pets/" + pet.pet_id.toString() + "/editpet";
                const date = pet.pet_dateOfBirth.toString().split('T')[0]
                return (    
                <Box width={400} borderWidth='1px' borderRadius='lg' overflow='hidden' mb={10}>
                    <HStack display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <VStack display={'flex'} alignItems={'stretch'}>
                            <Box>
                                <Text key={pet.pet_name}>Name: {pet.pet_name}</Text>
                                <SpeciesText key={pet.pet_id} petSpeciesId={pet.speciesId} species={species}/>
                            </Box>
                            <Box>
                                <Button size={'xs'} ml={1} mr={1}><Link href={{pathname: editUrl}}>Edit Pet</Link></Button>
                                <Button size={'xs'} onClick={() => 
                                    fetch('http://localhost:4000/pet/deletepet', {
                                    credentials: 'include',
                                    method: 'DELETE',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({data: {id: pet.pet_id}})})
                                    .then(res => {
                                        if (res.status === 200) {
                                            toast({
                                                title: "Pet deleted",
                                                status: "success",
                                                duration: 6000,
                                                isClosable: false
                                            })
                                            router.reload();
                                        } else {
                                            toast({
                                                title: "Delete failed",
                                                status: "error",
                                                duration: 6000,
                                                isClosable: false
                                            })
                                        }
                                    })}>
                                    Delete Pet
                                </Button>
                            </Box>
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