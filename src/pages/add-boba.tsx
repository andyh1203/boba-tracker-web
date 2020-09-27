import { Button } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useAddBobaMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

interface AddBobaProps {}

export const AddBoba: React.FC<AddBobaProps> = ({}) => {
  const {
    handleSubmit,
    formState,
    errors,
    register,
    setError,
    clearErrors,
  } = useForm();
  const [, addBoba] = useAddBobaMutation();
  const router = useRouter();
  useIsAuth();
  const onSubmit = async (values: any) => {
    const { error } = await addBoba(values);
    if (!error) {
      router.push("/");
    }
  };

  return (
    <Layout variant="small">
      {/* {alert && (
        <Alert status="error">
          <AlertIcon />
          {alert}
        </Alert>
      )} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="drinkName"
          label="Drink Name"
          errors={errors}
          inputRefs={register({
            required: "Drink name required",
          })}
        />
        <InputField
          name="sugarLevel"
          label="Sugar Level"
          errors={errors}
          inputRefs={register({
            required: "Sugar Level required",
          })}
        />
        <InputField
          name="iceLevel"
          label="Ice Level"
          errors={errors}
          inputRefs={register({
            required: "Ice Level required",
          })}
        />
        <Button
          mt={4}
          variantColor="teal"
          isLoading={formState.isSubmitting}
          type="submit"
        >
          Add
        </Button>
      </form>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(AddBoba);
