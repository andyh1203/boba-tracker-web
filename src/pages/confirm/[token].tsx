import React, { useEffect, useState } from "react";
import { useConfirmMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";

interface ConfirmProps {}

const Confirm: React.FC<ConfirmProps> = ({}) => {
  const router = useRouter();
  const token = router.query.token as string;

  const [, confirm] = useConfirmMutation();
  const [confirmed, setConfirmed] = useState<Boolean | null>(null);

  useEffect(() => {
    const confirmation = async () => {
      if (token) {
        const response = await confirm({ token });
        if (response.data?.confirmUser) {
          setConfirmed(true);
          router.push("/login");
        } else {
          setConfirmed(false);
        }
      }
    };
    confirmation();
  }, [token]);

  if (confirmed === null) {
    return <></>;
  }

  return (
    <div>
      {confirmed
        ? "Your account has been confirmed"
        : "Your account has already been confirmed or this link is no longer valid"}
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(Confirm);
