import React, {useEffect} from 'react';
import Router, { useRouter } from "next/router";
import { Layout } from '../../../components/Layout';
import { useIsAuth } from '../../../utils/useIsAuth';
import { useAddBobaMutation, useBobaQuery, useUpdateBobaMutation } from '../../../generated/graphql';
import { useForm } from 'react-hook-form';
import { InputField } from '../../../components/InputField';
import { Box, Button } from '@chakra-ui/core';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../../utils/createUrqlClient';

interface EditBobaProps {}

export const EditBoba: React.FC<EditBobaProps> = ({}) => {
    const {
        handleSubmit,
        formState,
        errors,
        register,
        setError,
        clearErrors,
        setValue
    } = useForm();
    const [, updateBoba] = useUpdateBobaMutation();
    const router = useRouter();
    useIsAuth();
    const onSubmit = async (values: any) => {
        const { error } = await updateBoba({bobaId: router.query.id as string, updatedInput: values});
        if (!error) {
          router.push("/");
        }
    }

    const [{data, fetching}] = useBobaQuery({
        variables: {
            bobaId: router.query.id as string
        }
    })

    useEffect(() => {
        if (data?.boba) {
            setValue("drinkName", data.boba.drinkName)
            setValue("sugarLevel", data.boba.sugarLevel)
            setValue("iceLevel", data.boba.iceLevel)
        }
    }, [data?.boba])

    if (fetching) {
        return (
            <Layout>
                loading...
            </Layout>
        )
    }

    if (!data?.boba) {
        <Layout>
            <Box>Could not find a Boba entry</Box>
        </Layout>
    }

  return (
    <Layout variant="small">
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
        Update
      </Button>
    </form>
  </Layout>
  )
}

export default withUrqlClient(createUrqlClient, {ssr: true})(EditBoba);