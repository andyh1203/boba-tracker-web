import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useBobasQuery } from "../generated/graphql";
import React from "react";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import { Link } from "@chakra-ui/core";

const Index = () => {
  const [{ data }] = useBobasQuery();
  return (
    <Layout>
      <NextLink href="add-boba">
        <Link>Add Boba</Link>
      </NextLink>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.bobas.map((p) => <div key={p._id}>{p.drinkName}</div>)
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
