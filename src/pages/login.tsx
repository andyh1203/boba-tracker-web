import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { Alert, AlertIcon, Box, Flex, Link } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { Layout } from "../components/Layout";

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
    if (response.data?.login?.errors) {
      response.data?.login?.errors.forEach((error: any) => {
        const { field, type, message } = error;
        setError(field, {
          type,
          message,
        });
      });
    } else if (response.data?.login?.user) {
      if (typeof router.query.next === "string") {
        router.push(router.query.next);
      } else {
        router.push("/");
      }
    } else {
      setAlert("Something went wrong");
      setTimeout(() => setAlert(null), 5000);
    }
  };

  return (
    <Layout>
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
          <Flex ml={2}>
            <Box ml="auto">
              <NextLink href="/forgot-password">
                <Link ml="auto">Forgot password?</Link>
              </NextLink>
            </Box>
          </Flex>
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
    </Layout>
   
  );
};

export default withUrqlClient(createUrqlClient)(Login);
