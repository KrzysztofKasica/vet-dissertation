import { Center, Flex, } from "@chakra-ui/react";
import { FormikLogin } from "../components/FormikLogin";
import NavBar from "../components/NavBar";

const Login = () => (
    <Flex direction={"column"} justifyContent='center' alignContent={'center'}>
        <NavBar/>
        <Center>
            <Flex maxW='100%' mt={'10vh'}>
                <FormikLogin/>
            </Flex>
        </Center>
    </Flex>
)

export default Login;