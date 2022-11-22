import { Center, Flex, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { dateProps, FormikBookAVisit } from "../components/FormikBookAVisit";
import NavBar from "../components/NavBar";

type isDoctorType = {
    data: string
}

type petsType = {
    pet_name: string
}

const BookAVisit = () => {
    const [isDoctor, setIsDoctor] = useState<isDoctorType>({data: ''});
    const [status, setStatus] = useState<number>();
    const [pets, setPets] = useState<Array<petsType>>();
    const [dates, setDates] =useState<Array<dateProps>>();
    useEffect(() => {
        fetch('http://localhost:4000/auth/isdoctor', {
        credentials: 'include',
        method: 'get',
        headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            setStatus(res.status);
            return res.json();
        })
        .then(data => setIsDoctor(data))
        .catch(err => console.log(err))

        fetch('http://localhost:4000/pet/getpetsnamelistbyuser', {
        credentials: 'include',
        method: 'get',
        headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(data => setPets(data))
        .catch(err => console.log(err))

        fetch('http://localhost:4000/avaliabledates/getdates', {
        credentials: 'include',
        method: 'get',
        headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(data => setDates(data))
        .catch(err => console.log(err))
    }, [])
    if(status===200 && isDoctor.data==="false") {
        return (
            <Flex direction={"column"} justifyContent='center' alignContent={'center'}>
                <NavBar/>
                <Center>
                    <Flex maxW='100%' mt={'10vh'}>
                        {pets ? dates ? <FormikBookAVisit dates={dates} pets={pets} />: null: null}
                    </Flex>
                </Center>
            </Flex>
        )
    } else {
        return (
            "401 Unauthorized"
        )
    }
}

export default BookAVisit;