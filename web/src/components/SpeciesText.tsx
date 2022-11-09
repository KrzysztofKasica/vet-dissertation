import { Text, } from "@chakra-ui/react";
import { speciesProps } from "./PetList";




interface speciesTextProps {
    petSpeciesId: number;
    species: speciesProps[];
}

export const SpeciesText = (props: speciesTextProps) => {
    const petSpeciesId = props.petSpeciesId;
    const species = props.species;
    const speciesName = species.find(obj => obj.id === petSpeciesId);
    return (
        <div>
            {speciesName ? <Text key={speciesName.name}>Species: {speciesName.name.charAt(0).toUpperCase() + speciesName.name.slice(1)}</Text>: null}
        </div>
    )
}