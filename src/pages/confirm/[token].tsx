import React, { useEffect, useState } from "react";
import { useConfirmMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { NextPage } from "next";

const Confirm: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();

  const [, confirm] = useConfirmMutation();

  useEffect(() => {
    const confirmation = async () => {
      if (token) {
        await confirm({ token });
        router.push("/login");
      }
    };
    confirmation();
  }, [token]);

  return <></>;
};

Confirm.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(Confirm);
