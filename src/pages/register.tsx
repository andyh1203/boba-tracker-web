import React from "react";

import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/core";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";

interface RegisterProps {}

const toErrorMap = (validationErrors) => {
  const errorMap = {};
  validationErrors.forEach((validationError) => {
    errorMap[validationError.property] = "testing";
  });
};

export const Register: React.FC<RegisterProps> = ({}) => {
  const { handleSubmit, formState, errors, register, setError } = useForm();
  const [, registerUser] = useRegisterMutation();

  const onSubmit = async (values: any) => {
    const response = await registerUser(values);
    if (response.error) {
      setError(
        toErrorMap(response.error.graphQLErrors[0].extensions.validationErrors)
      );
    }
  };

  return (
    <Wrapper variant="small">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="firstName"
          label="First Name"
          errors={errors}
          inputRefs={register({
            required: "First Name Required",
          })}
        />
        <InputField
          name="lastName"
          label="Last Name"
          errors={errors}
          inputRefs={register({
            required: "Last Name Required",
          })}
        />
        <InputField
          name="email"
          label="Email"
          errors={errors}
          inputRefs={register({
            required: "Email Required",
          })}
        />
        <InputField
          name="password"
          label="Password"
          errors={errors}
          type="password"
          inputRefs={register({
            required: "Password Required",
          })}
        />
        <Button
          mt={4}
          variantColor="teal"
          isLoading={formState.isSubmitting}
          type="submit"
        >
          Register
        </Button>
      </form>
    </Wrapper>
  );
};

export default Register;
