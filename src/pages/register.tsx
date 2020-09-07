import React from "react";

import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/core";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const { handleSubmit, errors, register, formState } = useForm();

  function validateUsername(value) {
    let error;
    if (!value) {
      error = "Name is required";
    }
    return error || true;
  }

  function validatePassword(value) {
    let error;
    if (!value) {
      error = "Password is required";
    }
    if (value.length < 8) {
      error = "Password must be at least 8 characters long";
    }
    return error || true;
  }

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          name="username"
          placeholder="username"
          ref={register({ validate: validateUsername })}
        />
        <FormErrorMessage>
          {errors.username && errors.username.message}
        </FormErrorMessage>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          name="password"
          placeholder="password"
          ref={register({ validate: validatePassword })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        mt={4}
        variantColor="teal"
        isLoading={formState.isSubmitting}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default Register;
