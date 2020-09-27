import Box from '@chakra-ui/core/dist/Box';
import Heading from '@chakra-ui/core/dist/Heading';
import { withUrqlClient } from 'next-urql';
import { Router, useRouter } from 'next/router';
import React from 'react'
import { Layout } from '../../components/Layout';
import { useBobaQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';

interface BobaProps {

}

export const Boba: React.FC<BobaProps> = ({}) => {
    const router = useRouter();
    const [{data, fetching}] = useBobaQuery({
        variables: {
            bobaId: router.query.id as string
        }
    })

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
      <Layout>
          <Heading>{data?.boba.drinkName}</Heading>
          {data?.boba.drinkName}
      </Layout>
  )
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Boba);