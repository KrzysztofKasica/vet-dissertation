import { Button, useToast } from "@chakra-ui/react"
import axios from "axios"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { InputField } from "./InputField"
import { PasswordInput } from "./PasswordInput"

export const FormikLogin = () => {
    const router = useRouter();  
    const toast = useToast();
    return (
      <Formik
        initialValues={{ email: '', password: ''}}
        onSubmit={async (values) => {
          await axios.post(
            'http://localhost:4000/client/login',
            {data: values},
            { headers: { 'Content-Type': 'application/json' } }
          ).then(() => {
            router.push('/');
          }).catch(res => {
            toast({
                  title: res.response.data,
                  status: "error",
                  duration: 6000,
                  isClosable: false
            })
          })
          
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <InputField width='60vh' name='email' placeholder="email" label="Email address" type='email' />
            <PasswordInput name='password' label="Password"/>
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={isSubmitting}
              type='submit'
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    )
  }