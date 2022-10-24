import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react"
type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  helperText?: string;
};

export const PasswordInput: React.FC<InputFieldProps> = ({label, size: _, ...props}) => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [field, {error}] = useField(props);
    return (
      <FormControl>
        <FormLabel marginTop={18} htmlFor={field.name}>{label}</FormLabel>
        <InputGroup size='md'>
          <Input 
            {...field}
            {...props}
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder='Enter password'
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        {props.helperText ? <FormHelperText>{props.helperText}</FormHelperText> : null}
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    )
}