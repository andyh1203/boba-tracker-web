import React from "react";
import { Box, Link, Flex, Button, Heading } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });

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
      <Flex align="center">
        <NextLink href="add-boba">
          <Button as={Link} mr={4} ml="auto">Add Boba</Button>
        </NextLink>
        <Box mr={2} >
          Hello, {data.me.firstName} {data.me.lastName}!
        </Box>
        <Button
          variant="link"
          onClick={async () => {
            await logout();
            router.reload();
          }}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex zIndex={1} position="sticky" top={0} bg="#6666ff" p={4} ml={"auto"} >
      <Flex flex={1} m='auto' maxW={800} align="center">
      <NextLink href="/">
        <Link>
        <Heading>Boba Tracker</Heading>
        </Link>
      </NextLink>
      <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
