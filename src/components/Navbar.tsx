import React from "react";
import { Box, Link, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();

  let body = null;

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={4}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white" mr={4}>
            Register
          </Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={2}>
          Hello, {data.me.firstName} {data.me.lastName}!
        </Box>
        <Button variant="link">Logout</Button>
      </Flex>
    );
  }
  return (
    <Flex bg="tomato" p={4} ml={"auto"}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};

export default Navbar;
