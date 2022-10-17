import { Container, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";

const Login = () => (
    <Container>
        <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type='email' />
            <FormHelperText>We'll never share your email.</FormHelperText>
            <FormLabel>Password</FormLabel>
            <Input type='password' />
        </FormControl>
        <DarkModeSwitch />
    </Container>
)

export default Login;