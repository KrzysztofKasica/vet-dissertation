import { Button } from "@chakra-ui/react"
import axios from "axios"
import { Form, Formik } from "formik"
import { InputField } from "./InputField"
import { PasswordInput } from "./PasswordInput"

export const FormikRegister = () => {
    
    return (
      <Formik
        initialValues={{ email: '', password: '', firstName: '', lastName: '' }}
        onSubmit={async (values) => {
          const res = await axios.post(
            'http://127.0.0.1:4000/client/register',
            {data: values},
            { headers: { 'Content-Type': 'application/json' } }
          );
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <InputField name='email' placeholder="email" label="Email address" type='email' helperText="We'll never share your email."/>
            <PasswordInput name='password' label="Password" helperText="Password has to be between 8-32 characters long, contain at least one number, contain at least one lowercase letter, contain at least one uppercase letter, contain at least one special character"/>
            <InputField name='firstName' placeholder="First Name" label="First Name" type='text'/>
            <InputField name='lastName' placeholder="Last Name" label="Last Name" type='text'/>
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={isSubmitting}
              type='submit'
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    )
  }