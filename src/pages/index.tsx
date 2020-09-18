import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useBobasQuery } from "../generated/graphql";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 25,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = useBobasQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>Query failed</div>;
  }

  return (
    <Layout>
      <Flex>
        <Heading>Boba Tracker</Heading>{" "}
        <NextLink href="add-boba">
          <Link ml="auto">Add Boba</Link>
        </NextLink>
      </Flex>
      <br />
      {fetching && !data ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.bobas.bobas.map((p) => (
            <Box key={p._id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.drinkName}</Heading>
              <Text mt={4}>
                Ice: {p.iceLevel}, Sugar: {p.sugarLevel}
              </Text>
            </Box>
          ))}
        </Stack>
      )}
      {data && data.bobas.hasMore ? (
        <Flex>
          <Button
            my={8}
            isLoading={fetching}
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.bobas.bobas[data.bobas.bobas.length - 1].createdAt,
              })
            }
          >
            Load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
