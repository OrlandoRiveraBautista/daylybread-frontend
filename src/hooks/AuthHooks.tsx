import { gql } from "../__generated__/gql";
import { useLazyQuery } from "@apollo/client";

/* Queries */
const Login = gql(`
    query Login($options: UsernamePasswordInput!) {
        login(options: $options) {
            user {
                _id
                count
                createdAt
                email
                updatedAt
                firstName
                gender
                lastName
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
