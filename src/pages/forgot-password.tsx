import React, { useState } from "react";
import { Button, Box } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";

import { useForm } from "react-hook-form";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
// import { Alert, AlertIcon } from "@chakra-ui/core";

export const ForgotPassword: React.FC<{}> = ({}) => {
  const { handleSubmit, formState, errors, register } = useForm();
  const [, forgotPassword] = useForgotPasswordMutation();
  // const [alert, setAlert] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);

  const onSubmit = async (values: any) => {
    await forgotPassword(values);
    setComplete(true);
    // setAlert(`Change password email sent to ${values.email}`);
    // setTimeout(() => setAlert(null), 5000);
  };

  return (
    <Wrapper variant="small">
      {/* {alert && (
        <Alert status="info">
          <AlertIcon />
          {alert}
        </Alert>
      )} */}
      {complete ? (
        <Box>
          If an account with that email exists, change password link sent
        </Box>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="email"
            label="Email"
            errors={errors}
            inputRefs={register({
              required: "Email Required",
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
      )}
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
