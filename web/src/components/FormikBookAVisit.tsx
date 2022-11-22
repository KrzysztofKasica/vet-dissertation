import { Text, Button, Select, useToast, Box, HStack } from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { useRouter } from "next/router"

export type dateProps = {
    avaliableDate: Date,
    id: number,
    doctors: {firstName: string, lastName: string, id: number}[],
}

type bookAVisitProps = {
  dates: dateProps[];
  pets: {pet_name:string}[];
}

export const FormikBookAVisit = (props: bookAVisitProps) => {
    const router = useRouter()
    const toast = useToast()
    const {dates, pets} = props
    
    return (
        <Box>
            {dates.map(singleDate => {
                const date = singleDate.avaliableDate.toString().replace('T', ' ').slice(0, 16);
                return (
                    <Box>
                        {singleDate.doctors.map(doctor => {

                            return (
                                <Formik
                                    initialValues={{ startDate: date, doctorId: doctor.id, dateId: singleDate.id, petName: '' }}
                                    onSubmit={async (values) => {  
                                        console.log('valuses ', values)
                                        const response = await fetch('http://localhost:4000/visit/createvisit', {
                                            credentials: 'include',
                                            method: 'POST',
                                            headers: {'Content-Type': 'application/json'},
                                            body: JSON.stringify({data: values})})
                                        if (response.status === 200) {
                                            toast({
                                                title: "Submit Completed",
                                                status: "success",
                                                duration: 6000,
                                                isClosable: false
                                            })
                                            router.push('/dashboard');
                                        } else {
                                            toast({
                                                title: "Submit Failed",
                                                status: "error",
                                                duration: 6000,
                                                isClosable: false
                                            })
                                        }
                                    }}
                                >
                                    {({isSubmitting}) => (
                                    <Form>
                                        <Box width={400} borderWidth='1px' borderRadius='lg' overflow='hidden' mb={10}>
                                            <HStack mr={1} ml={1} display={'flex'} justifyContent={'space-between'}>
                                                <Box width={40}>
                                                    <Text key={singleDate.avaliableDate.toString()}>{date}</Text>
                                                    <Text key={doctor.firstName}>{'Dr ' + doctor.firstName + ' ' + doctor.lastName}</Text>
                                                </Box>
                                                <Field as="select" name="petName" placeholder='Select Pet'>
                                                    {pets.map(pet => {
                                                        return (
                                                            <option key={pet.pet_name} value={pet.pet_name}>{pet.pet_name}</option>
                                                        )
                                                    })}
                                                </Field>
                                                {/* <Select placeholder='Select pet'>
                                                   {pets.map(pet => {
                                                        return (
                                                            <option key={pet.pet_name}>{pet.pet_name}</option>
                                                        )
                                                   })}
                                                </Select> */}
                                                <Button
                                                mt={4}
                                                colorScheme='teal'
                                                isLoading={isSubmitting}
                                                type='submit'
                                                >
                                                    Submit
                                                </Button>
                                            </HStack>
                                        </Box>

                                       
                                    </Form>
                                    )}
                              </Formik>
                            )
                        })}
                    </Box>
                )
            })}
        </Box>
    )
  }