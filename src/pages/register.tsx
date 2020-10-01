import React from "react";

import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = ({}) => {
  const {
    handleSubmit,
    formState,
    errors,
    register,
    setError,
    clearErrors,
  } = useForm();
  const [, registerUser] = useRegisterMutation();
  const router = useRouter();

  const onSubmit = async (values: any) => {
    clearErrors();
    const response = await registerUser(values);
    if (response.data?.register.errors) {
      response.data?.register.errors.forEach((error: any) => {
        const { field, type, message } = error;
        setError(field, {
          type,
          message,
        });
      });
    } else {
      router.push('/');
    }
  };

  return (
    <Layout>
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
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
