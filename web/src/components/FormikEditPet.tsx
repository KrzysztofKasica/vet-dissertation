import { Text, Button, Select, useToast } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { EditField } from "./EditField"
import { speciesProps } from "./PetList"

type editPetProps = {
  species: speciesProps[];
  id: number;
}

type petProps = {
  name: string;
  dateOfBirth: Date;
  speices: {name: string};
}

export const FormikEditPet = (props: editPetProps) => {
    const router = useRouter()
    const toast = useToast()
    const {species, id} = props
    const [speciesName, setSpeciesName] = useState<string>(species[0].name)
    
    const [pet, setPet] = useState<petProps>()
    useEffect(() => {
      fetch('http://localhost:4000/pet/getpet/' + +window.location.href.split("/")[4].toString(), {
      credentials: 'include',
      method: 'get',
      headers: {'Content-Type': 'application/json'}})
      .then(res => res.json())
      .then(data => setPet(data))
      .catch(err => console.log(err))
    }, [])

    if (pet) {
      console.log(pet)
      const date = new Date(pet.dateOfBirth);
      const dateToString = date.toISOString().substring(0, 10);
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
                toast({
                  title: "Pet edited",
                  status: "success",
                  duration: 6000,
                  isClosable: false
                })
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
              <EditField name='name' label="Name" type='text' defaultval={pet.name}/>
              <EditField name='dateOfBirth' defaultval={dateToString} label="Date of Birth" type='text'/>
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
    } else {
      return (null)
    }
  }