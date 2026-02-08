import { useState, useCallback, useEffect } from "react";
import { gql as gqlTag, useLazyQuery, useMutation } from "@apollo/client";
import {
  useUpdateNFCConfig,
  useDeleteNFCConfig,
} from "./NFCConfigHooks";
import { useAppContext } from "../context/context";

interface NFCConfigInput {
  nfcId: string;
  name: string;
  deviceType?: string;
  homeScreenId?: string;
  ownerId?: string;
}

// GraphQL queries and mutations for admin operations
const SearchUsers = gqlTag`
  query SearchUsers($searchTerm: String!, $limit: Float) {
    searchUsers(searchTerm: $searchTerm, limit: $limit) {
      results {
        _id
        email
        firstName
        lastName
        churchName
      }
      errors {
        field
        message
      }
    }
  }
` as any;

const AdminGetAllNFCConfigs = gqlTag`
  query AdminGetAllNFCConfigs($limit: Float) {
    adminGetAllNFCConfigs(limit: $limit) {
      results {
        _id
        nfcId
        name
        deviceType
        views
        lastScannedAt
        createdAt
        updatedAt
        owner {
          _id
          email
          firstName
          lastName
        }
        homeScreen {
          _id
          name
          shareableLink
        }
      }
      errors {
        field
        message
      }
    }
  }
` as any;

const AdminCreateNFCConfig = gqlTag`
  mutation AdminCreateNFCConfig($options: AdminNFCConfigInput!) {
    adminCreateNFCConfig(options: $options) {
      results {
        _id
        nfcId
        name
        deviceType
        views
        createdAt
        owner {
          _id
          email
          firstName
          lastName
        }
        homeScreen {
          _id
          name
          shareableLink
        }
      }
      errors {
        field
        message
      }
    }
  }
` as any;

const GetHomeScreensByOwnerId = gqlTag`
  query GetHomeScreensByOwnerId($ownerId: String!) {
    getHomeScreensByOwnerId(ownerId: $ownerId) {
      results {
        _id
        name
        shareableLink
      }
      errors {
        field
        message
      }
    }
  }
` as any;

interface UserSearchResult {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  churchName?: string;
}

interface UseAdminNFCConfigsResult {
  nfcConfigs: any[];
  homeScreens: any[];
  users: UserSearchResult[];
  selectedOwner: UserSearchResult | null;
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isSearchingUsers: boolean;
  error: string | null;
  successMessage: string | null;
  createNFCConfig: (input: NFCConfigInput) => Promise<void>;
  updateNFCConfig: (id: string, input: NFCConfigInput) => Promise<void>;
  deleteNFCConfig: (id: string) => Promise<void>;
  searchUsers: (searchTerm: string) => Promise<void>;
  setSelectedOwner: (user: UserSearchResult | null) => void;
  fetchHomeScreensForOwner: (ownerId: string) => Promise<void>;
  refetch: () => Promise<void>;
  clearMessages: () => void;
}

/**
 * Custom hook for admin NFC configuration management.
 * Provides CRUD operations for NFC configs with loading states and error handling.
 */
export const useAdminNFCConfigs = (): UseAdminNFCConfigsResult => {
  const { userInfo } = useAppContext();
  const [nfcConfigs, setNfcConfigs] = useState<any[]>([]);
  const [homeScreens, setHomeScreens] = useState<any[]>([]);
  const [users, setUsers] = useState<UserSearchResult[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<UserSearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // GraphQL hooks
  const [fetchAllNFCConfigs] = useLazyQuery(AdminGetAllNFCConfigs);
  const [searchUsersQuery, { loading: isSearchingUsers }] = useLazyQuery(SearchUsers);
  const [fetchHomeScreensForOwnerQuery] = useLazyQuery(GetHomeScreensByOwnerId);
  const [adminCreateNFCConfigMutation, { loading: isCreating }] = useMutation(AdminCreateNFCConfig);
  const [updateNFCConfigMutation, { loading: isUpdating }] = useUpdateNFCConfig();
  const [deleteNFCConfigMutation, { loading: isDeleting }] = useDeleteNFCConfig();

  /**
   * Fetch all NFC configs (admin view - all configs)
   */
  const refetch = useCallback(async () => {
    if (!userInfo?._id) return;

    setIsLoading(true);
    setError(null);

    try {
      // Fetch all NFC configs (admin)
      const nfcResult = await fetchAllNFCConfigs({
        variables: { limit: 100 },
      });

      if (nfcResult.data?.adminGetAllNFCConfigs?.results) {
        setNfcConfigs(nfcResult.data.adminGetAllNFCConfigs.results);
      } else if (nfcResult.data?.adminGetAllNFCConfigs?.errors) {
        setError(nfcResult.data.adminGetAllNFCConfigs.errors[0]?.message || "Failed to fetch NFC configs");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [userInfo?._id, fetchAllNFCConfigs]);

  /**
   * Search users by email, name, or church name
   */
  const searchUsers = useCallback(
    async (searchTerm: string) => {
      if (!searchTerm || searchTerm.length < 2) {
        setUsers([]);
        return;
      }

      try {
        const result = await searchUsersQuery({
          variables: { searchTerm, limit: 10 },
        });

        if (result.data?.searchUsers?.results) {
          setUsers(result.data.searchUsers.results);
        } else if (result.data?.searchUsers?.errors) {
          console.error("Search error:", result.data.searchUsers.errors);
          setUsers([]);
        }
      } catch (err) {
        console.error("Error searching users:", err);
        setUsers([]);
      }
    },
    [searchUsersQuery]
  );

  /**
   * Fetch home screens for a specific owner
   */
  const fetchHomeScreensForOwner = useCallback(
    async (ownerId: string) => {
      if (!ownerId) {
        setHomeScreens([]);
        return;
      }

      try {
        const result = await fetchHomeScreensForOwnerQuery({
          variables: { ownerId },
        });

        if (result.data?.getHomeScreensByOwnerId?.results) {
          setHomeScreens(result.data.getHomeScreensByOwnerId.results);
        } else {
          setHomeScreens([]);
        }
      } catch (err) {
        console.error("Error fetching home screens:", err);
        setHomeScreens([]);
      }
    },
    [fetchHomeScreensForOwnerQuery]
  );

  // Initial fetch on mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  /**
   * Create a new NFC configuration (admin - can specify owner)
   */
  const createNFCConfig = useCallback(
    async (input: NFCConfigInput) => {
      setError(null);
      setSuccessMessage(null);

      if (!input.ownerId) {
        setError("Please select an owner for the NFC config");
        throw new Error("Owner is required");
      }

      try {
        const result = await adminCreateNFCConfigMutation({
          variables: {
            options: {
              nfcId: input.nfcId,
              name: input.name,
              deviceType: input.deviceType || undefined,
              homeScreenId: input.homeScreenId || undefined,
              ownerId: input.ownerId,
            },
          },
        });

        if (result.data?.adminCreateNFCConfig?.errors) {
          const errorMessage = result.data.adminCreateNFCConfig.errors[0]?.message || "Failed to create NFC config";
          setError(errorMessage);
          throw new Error(errorMessage);
        }

        if (result.data?.adminCreateNFCConfig?.results) {
          setSuccessMessage(`NFC config "${input.name}" created successfully!`);
          await refetch();
        }
      } catch (err: any) {
        if (!error) {
          setError(err.message || "Failed to create NFC config");
        }
        throw err;
      }
    },
    [adminCreateNFCConfigMutation, refetch, error]
  );

  /**
   * Update an existing NFC configuration
   */
  const updateNFCConfig = useCallback(
    async (id: string, input: NFCConfigInput) => {
      setError(null);
      setSuccessMessage(null);

      try {
        const result = await updateNFCConfigMutation({
          variables: {
            id,
            options: {
              nfcId: input.nfcId,
              name: input.name,
              deviceType: input.deviceType || undefined,
              homeScreenId: input.homeScreenId || undefined,
            },
          },
        });

        if (result.data?.updateNFCConfig?.errors) {
          const errorMessage = result.data.updateNFCConfig.errors[0]?.message || "Failed to update NFC config";
          setError(errorMessage);
          throw new Error(errorMessage);
        }

        if (result.data?.updateNFCConfig?.results) {
          setSuccessMessage(`NFC config "${input.name}" updated successfully!`);
          await refetch();
        }
      } catch (err: any) {
        if (!error) {
          setError(err.message || "Failed to update NFC config");
        }
        throw err;
      }
    },
    [updateNFCConfigMutation, refetch, error]
  );

  /**
   * Delete an NFC configuration
   */
  const deleteNFCConfig = useCallback(
    async (id: string) => {
      setError(null);
      setSuccessMessage(null);

      try {
        const result = await deleteNFCConfigMutation({
          variables: { id },
        });

        if (result.data?.deleteNFCConfig?.errors) {
          const errorMessage = result.data.deleteNFCConfig.errors[0]?.message || "Failed to delete NFC config";
          setError(errorMessage);
          throw new Error(errorMessage);
        }

        if (result.data?.deleteNFCConfig?.results) {
          setSuccessMessage("NFC config deleted successfully!");
          await refetch();
        }
      } catch (err: any) {
        if (!error) {
          setError(err.message || "Failed to delete NFC config");
        }
        throw err;
      }
    },
    [deleteNFCConfigMutation, refetch, error]
  );

  /**
   * Clear error and success messages
   */
  const clearMessages = useCallback(() => {
    setError(null);
    setSuccessMessage(null);
  }, []);

  return {
    nfcConfigs,
    homeScreens,
    users,
    selectedOwner,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    isSearchingUsers,
    error,
    successMessage,
    createNFCConfig,
    updateNFCConfig,
    deleteNFCConfig,
    searchUsers,
    setSelectedOwner,
    fetchHomeScreensForOwner,
    refetch,
    clearMessages,
  };
};
