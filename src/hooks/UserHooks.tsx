import { gql } from "../__generated__/gql";
import { useLazyQuery } from "@apollo/client";

/* Queries */
const Me = gql(`
    query Me {
        me {
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
            }
        }
    }
`);

/* When using lazy  */
export const useMe = () => {
  const [getMe, { loading, error, data }] = useLazyQuery(Me);

  return {
    getMe,
    loading,
    error,
    data,
  };
};
