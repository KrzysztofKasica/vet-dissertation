import { Container } from "@chakra-ui/react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { FormikRegister } from "../components/FormikRegister";

const Register = () => (
    <Container>
        <FormikRegister/>
        <DarkModeSwitch />
    </Container>
)

export default Register;