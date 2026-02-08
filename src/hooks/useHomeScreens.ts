import { useState } from "react";
import {
  useCreateHomeScreen,
  useGetHomeScreensByOwner,
  useUpdateHomeScreen,
  useDeleteHomeScreen,
} from "./HomeScreenHooks";
import { TileConfig } from "../components/NFC/iPhoneHomeScreen/types";

interface HomeScreenFormData {
  name: string;
  tiles?: TileConfig[];
  wallpaper?: string;
}

/**
 * Composite hook for managing home screens
 * Provides simplified methods for CRUD operations
 */
export const useHomeScreens = (userId: string) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [getHomeScreensByOwner, { data: homeScreensData, loading, refetch }] =
    useGetHomeScreensByOwner();
  const [createHomeScreen] = useCreateHomeScreen();
  const [updateHomeScreen] = useUpdateHomeScreen();
  const [deleteHomeScreen] = useDeleteHomeScreen();

  const fetchHomeScreens = async () => {
    return getHomeScreensByOwner();
  };

  const createNewHomeScreen = async (formData: HomeScreenFormData) => {
    try {
      setIsSaving(true);
      const { data } = await createHomeScreen({
        variables: {
          options: formData,
        },
      });

      if (data?.createHomeScreen.errors) {
        throw new Error(data.createHomeScreen.errors[0].message);
      }

      // Refetch home screens
      await refetch?.();

      return data?.createHomeScreen.results;
    } catch (error) {
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const updateExistingHomeScreen = async (
    id: string,
    formData: HomeScreenFormData
  ) => {
    try {
      setIsSaving(true);
      const { data } = await updateHomeScreen({
        variables: {
          id,
          options: formData,
        },
      });

      if (data?.updateHomeScreen.errors) {
        throw new Error(data.updateHomeScreen.errors[0].message);
      }

      // Refetch home screens
      await refetch?.();

      return data?.updateHomeScreen.results;
    } catch (error) {
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteExistingHomeScreen = async (id: string) => {
    try {
      setIsDeleting(true);
      const { data } = await deleteHomeScreen({
        variables: { id },
      });

      if (data?.deleteHomeScreen.errors) {
        throw new Error(data.deleteHomeScreen.errors[0].message);
      }

      // Refetch home screens
      await refetch?.();

      return true;
    } catch (error) {
      throw error;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    homeScreens: homeScreensData?.getHomeScreensByOwner.results || [],
    loading,
    isSaving,
    isDeleting,
    fetchHomeScreens,
    createHomeScreen: createNewHomeScreen,
    updateHomeScreen: updateExistingHomeScreen,
    deleteHomeScreen: deleteExistingHomeScreen,
    refetch,
  };
};
