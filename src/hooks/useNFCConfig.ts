import { useState } from "react";
import {
  useCreateNFCConfig,
  useGetNFCConfigByOwner,
  useUpdateNFCConfig,
} from "./NFCConfigHooks";
import { TileConfig } from "../components/NFC/iPhoneHomeScreen/types";

interface NFCConfigFormData {
  tiles?: TileConfig[];
  wallpaper?: string;
  nfcIds?: string[];
}

export const useNFCConfig = (userId: string) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [getNFCConfigByOwner, { data: nfcConfigData }] =
    useGetNFCConfigByOwner();
  const [createNFCConfig] = useCreateNFCConfig();
  const [updateNFCConfig] = useUpdateNFCConfig();

  const fetchConfig = async () => {
    if (userId) {
      return getNFCConfigByOwner({ variables: { ownerId: userId } });
    }
    return Promise.resolve();
  };

  const saveConfig = async (formData: NFCConfigFormData) => {
    try {
      setIsSaving(true);
      const nfcConfig = nfcConfigData?.getNFCConfigByOwner.results;

      if (nfcConfig) {
        const { data: updateData } = await updateNFCConfig({
          variables: {
            id: nfcConfig._id,
            options: formData,
          },
        });

        if (updateData?.updateNFCConfig.errors) {
          throw new Error(updateData.updateNFCConfig.errors[0].message);
        }
      } else {
        const { data: createData } = await createNFCConfig({
          variables: {
            options: formData,
          },
        });

        if (createData?.createNFCConfig.errors) {
          throw new Error(createData.createNFCConfig.errors[0].message);
        }

        // reload the config
        fetchConfig();
      }

      return true;
    } catch (error) {
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    nfcConfigData,
    isSaving,
    isUpdating,
    setIsUpdating,
    fetchConfig,
    saveConfig,
  };
};
