import React, { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";

/* Graphql Hooks */
import { useLoginWithGoogle } from "../../hooks/AuthHooks";
import { LoginWithGoogleMutationMutation } from "../../__generated__/graphql";

interface IGoogleAuth {
  onSuccess: (data: LoginWithGoogleMutationMutation) => void;
  onError?: () => void;
}

const GoogleAuth: React.FC<IGoogleAuth> = ({ onSuccess }: IGoogleAuth) => {
  const { loginWithGoogle, data } = useLoginWithGoogle();

  useEffect(() => {
    if (!data?.loginWithGoogle.user?._id) return;

    onSuccess(data);
  }, [data]);

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
      />
    </>
  );
};

export default GoogleAuth;
