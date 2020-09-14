import { useState } from "react";
import { NextPage } from "next";
import { Wrapper } from "../../components/Wrapper";
import { InputField } from "../../components/InputField";
import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "../../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Box, Button, Link, Flex } from "@chakra-ui/core";
import { useRouter } from "next/router";
import NextLink from "next/link";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const { handleSubmit, formState, errors, register, setError } = useForm();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");

  const onSubmit = async ({ password, confirmNewPassword }: any) => {
    if (password !== confirmNewPassword) {
      setError("confirmNewPassword", {
        type: "validation",
        message: "Passwords do not match!",
      });
    }
    const response = await changePassword({ password, token });
    if (response.data?.changePassword?.errors) {
      response.data?.changePassword?.errors.forEach((error: any) => {
        const { field, type, message } = error;
        if (field === "token") {
          setTokenError(message);
        }
        setError(field, {
          type,
          message,
        });
      });
    } else if (response.data?.changePassword?.user) {
      router.push("/");
    }
  };

  return (
    <Wrapper variant="small">
      {/* {alert && (
        <Alert status="info">
          <AlertIcon />
          {alert}
        </Alert>
      )} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="password"
          label="Password"
          errors={errors}
          type="password"
          inputRefs={register({
            required: "Password Required",
          })}
        />
        <InputField
          name="confirmNewPassword"
          label="Confirm New Password"
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
          Change Password
        </Button>
      </form>
      {tokenError ? (
        <Flex>
          <Box mr={2} style={{ color: "red" }}>
            {tokenError}
          </Box>
          <NextLink href="/forgot-password">
            <Link>Request New Token</Link>
          </NextLink>
        </Flex>
      ) : null}
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
