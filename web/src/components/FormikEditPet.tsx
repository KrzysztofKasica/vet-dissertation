import { Text, Button, Select, useToast } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useState } from "react"
import { InputField } from "./InputField"
import { speciesProps } from "./PetList"

type editPetProps = {
  species: speciesProps[];
  id: number;
}

export const FormikEditPet = (props: editPetProps) => {
    const router = useRouter()
    const toast = useToast()
    const {species, id} = props
    const [speciesName, setSpeciesName] = useState<string>(species[0].name)
    
    return (
      <Formik
        initialValues={{ id: id.toString(), name: '', dateOfBirth: '', species: speciesName }}
        onSubmit={async (values) => {
          values.species = speciesName.toLowerCase();
          const response = await fetch('http://localhost:4000/pet/editpet', {
            credentials: 'include',
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({data: values})})
            if (response.status === 200) {
              router.push('/pets');
            } else {
              toast({
                title: "Edit Failed",
                status: "error",
                duration: 6000,
                isClosable: false
          })
            }
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <InputField name='name' placeholder="Name" label="Name" type='text'/>
            <InputField name='dateOfBirth' placeholder="fsafas" label="Date of Birth" type='date'/>
            <Text marginTop={18} mb={2} fontSize={16} fontWeight={'semibold'}>Species</Text>
            <Select name='species' onChange={evt => {
              setSpeciesName(evt.target.selectedOptions[0].label)
            }}>
              {species.map(obj => {
                const name = obj.name.charAt(0).toUpperCase() + obj.name.slice(1)
                return (
                  <option key={name} value={name}>{name}</option>
                )
            })}</Select>
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={isSubmitting}
              type='submit'
            >
              Submit Edit
            </Button>
          </Form>
        )}
      </Formik>
    )
  }