import { Text, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";

export type visitProps ={
    visit_id: number;
    visit_status: string;
    visit_startDate: Date;
    doctorId: number;
    petId: number;
};

interface visitListProps {
    visits: visitProps[]
}

export const VisitList = (props: visitListProps) => {
    const gowno = props.visits

    return (
        <div>

            {gowno.map(visit => (
                <Text key={visit.visit_id}>{visit.doctorId}</Text>
            ))}
        </div>
    )
}