import { gql } from "../__generated__/gql";
import { useLazyQuery, useMutation } from "@apollo/client";

/* Queries */
const Login = gql(`
    query Login($options: UsernamePasswordInput!) {
        login(options: $options) {
            user {
               _id
                createdAt
                updatedAt
                email
                firstName
                lastName
                churchName
                dob
                count
                bioText
            }
            errors {
              field
              message
            }
        }
    }
`);

const Register = gql(`
    mutation Register($options: UsernamePasswordInput!) {
      register(options: $options) {
        user {
          _id
          createdAt
          updatedAt
          email
          firstName
          lastName
          churchName
          dob
          count
          bioText
        }
        errors {
          field
          message
        }
      }
    }
`);

const LoginWithGoogleMutation = gql(`
    mutation LoginWithGoogleMutation($options: LogInWithGoogleArgs!) {
      loginWithGoogle(options: $options) {
        user {
          _id
          createdAt
          updatedAt
          email
          firstName
          lastName
          churchName
          dob
          count
          bioText
        }
        errors {
          field
          message
        }
      }
    }
`);

/* When using lazy  */
export const useLogin = () => {
  const [getLogin, { loading, error, data }] = useLazyQuery(Login);

  return {
    getLogin,
    loading,
    error,
    data,
  };
};

/* When using lazy  */
export const useSignup = () => {
  const [getSignup, { loading, error, data }] = useMutation(Register);

  return {
    getSignup,
    loading,
    error,
    data,
  };
};

export const useLoginWithGoogle = () => {
  const [loginWithGoogle, { loading, error, data }] = useMutation(
    LoginWithGoogleMutation
  );

  return {
    loginWithGoogle,
    loading,
    error,
    data,
  };
};
