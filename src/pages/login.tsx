import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/core";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { Alert, AlertIcon } from "@chakra-ui/core";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  const {
    handleSubmit,
    formState,
    errors,
    register,
    setError,
    clearErrors,
  } = useForm();
  const [, login] = useLoginMutation();
  const router = useRouter();
  const [alert, setAlert] = useState<string | null>(null);

  const onSubmit = async (values: any) => {
    clearErrors();
    const response = await login(values);
    if (response.error) {
      const validationErrors =
        response.error.graphQLErrors[0].extensions.exception.validationErrors;
      validationErrors.forEach((validationError) => {
        setError(validationError.property, {
          type: "validation",
          message: Object.values(validationError.constraints)[0] as string,
        });
      });
    } else if (response.data.login) {
      router.push("/");
    } else {
      setAlert("Incorrect username or password");
      setTimeout(() => setAlert(null), 5000);
    }
  };

  return (
    <Wrapper variant="small">
      {alert && (
        <Alert status="error">
          <AlertIcon />
          {alert}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
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
          Login
        </Button>
      </form>
    </Wrapper>
  );
};

export default Login;
