import { Center, Flex } from "@chakra-ui/react";
import { FormikRegister } from "../components/FormikRegister";
import NavBar from "../components/NavBar";

const Register = () => (
    <Flex direction={"column"} justifyContent='center' alignContent={'center'}>
        <NavBar/>
        <Center>
            <Flex maxW='40%'>
                <FormikRegister/>
            </Flex>
        </Center>
    </Flex>
)

export default Register;