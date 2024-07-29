import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { GoogleLogin } from "@react-oauth/google";

/* Graphql Hooks */
import { useLoginWithGoogle } from "../../hooks/AuthHooks";
import { LoginWithGoogleMutationMutation } from "../../__generated__/graphql";

/* State */
import { useAppContext } from "../../context/context";

interface IGoogleAuth {
  onSuccess?: (data: LoginWithGoogleMutationMutation) => void;
  onError?: () => void;
}

const GoogleAuth: React.FC<IGoogleAuth> = ({ onSuccess }: IGoogleAuth) => {
  // router history
  const history = useHistory();

  // global state
  const { setUser } = useAppContext();

  // GraphQL api
  const { loginWithGoogle, data } = useLoginWithGoogle();

  useEffect(() => {
    if (!data?.loginWithGoogle) return;

    const { user, errors } = data.loginWithGoogle;
    if (!user?._id) return;
    if (errors?.length) return;

    setUser(user);

    if (!user.dob) {
      history.push("/signupupdateuser");
    } else {
      history.push("/me");
    }

    if (onSuccess) {
      onSuccess(data);
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          loginWithGoogle({
            variables: {
              options: {
                credentials: credentialResponse.credential!,
              },
            },
          });
        }}
        onError={() => {
          alert("Login Failed");
        }}
        useOneTap
        shape="pill"
        theme={
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "filled_black"
            : "outline"
        }
      />
    </>
  );
};

export default GoogleAuth;
