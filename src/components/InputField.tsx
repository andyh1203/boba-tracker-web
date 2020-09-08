import React from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
} from "@chakra-ui/core";

interface InputFieldProps {
  name: string;
  label: string;
  inputRefs?: any;
  errors: Object;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  errors,
  inputRefs,
  ...props
}) => {
  return (
    <FormControl isInvalid={errors[props.name]}>
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      <Input id={props.name} {...props} ref={inputRefs} />
      <FormErrorMessage>
        {errors[props.name] && errors[props.name].message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
