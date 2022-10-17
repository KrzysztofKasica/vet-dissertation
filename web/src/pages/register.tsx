import { Container, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { PasswordInput } from "../components/PasswordInput";

const Register = () => (
    <Container>
        <FormControl>
            <FormLabel marginTop={18}>Email address</FormLabel>
            <Input type='email' />
            <FormHelperText>We'll never share your email.</FormHelperText>
            <FormLabel marginTop={18}>Password</FormLabel>
            <PasswordInput />
            <FormHelperText>Password has to be between 8-32 characters long, contain at least one number, contain at least one lowercase letter, contain at least one uppercase letter, contain at least one special character</FormHelperText>
            <FormLabel marginTop={18}>First Name</FormLabel>
            <Input type='text' />
            <FormLabel marginTop={18}>Last Name</FormLabel>
            <Input type='text' />   
        </FormControl>
        <DarkModeSwitch />
    </Container>
)

export default Register;