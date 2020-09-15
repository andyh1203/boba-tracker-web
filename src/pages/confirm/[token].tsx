import React, { useEffect } from "react";
import { useConfirmMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Confirm: React.FC<{}> = () => {
  const router = useRouter();

  const [, confirm] = useConfirmMutation();

  useEffect(() => {
    const confirmation = async () => {
      if (router.query.token) {
        await confirm({
          token:
            typeof router.query.token === "string" ? router.query.token : "",
        });
        router.push("/login");
      }
    };
    confirmation();
  }, [router.query.token]);

  return <></>;
};

export default withUrqlClient(createUrqlClient)(Confirm);
