import { Editable, EditableInput, EditablePreview, FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { useField } from "formik";

type EditFieldProps =  {
    label: string;
    name: string;
    type: string;
    defaultval: string;
};



export const EditField: React.FC<EditFieldProps> = ({label, ...props}) => {
    const [field, {error}] = useField(props);
    
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel marginTop={18} htmlFor={field.name}>{label}</FormLabel>
            <Editable borderRadius={10} borderWidth='thin' width={300} defaultValue={props.defaultval}>
                <EditablePreview />
                <EditableInput {...field} {...props} id={field.name}/>
            </Editable>
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    )
}