import { useState } from "react";
import { NextPage } from "next";
import { Wrapper } from "../../components/Wrapper";
import { InputField } from "../../components/InputField";
import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/core";
import { useChangePasswordMutation } from "../../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Alert, AlertIcon } from "@chakra-ui/core";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const { handleSubmit, formState, errors, register, setError } = useForm();

  const [, changePassword] = useChangePasswordMutation();
  const [alert, setAlert] = useState<string | null>(null);

  const onSubmit = async ({ password, confirmNewPassword }: any) => {
    if (password !== confirmNewPassword) {
      setError("confirmNewPassword", {
        type: "validation",
        message: "Passwords do not match!",
      });
    }
    const response = await changePassword({ password, token });
    if (response.data?.changePassword) {
      setAlert("Successfully changed password!");
    }
  };

  return (
    <Wrapper variant="small">
      {alert && (
        <Alert status="info">
          <AlertIcon />
          {alert}
        </Alert>
      )}
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
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  console.log(query);
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
