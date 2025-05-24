import { useState } from "react";
import {
  useCreateNFCConfig,
  useGetNFCConfigByOwner,
  useUpdateNFCConfig,
} from "./NFCConfigHooks";

export const useNFCConfig = (userId: string) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [getNFCConfigByOwner, { data: nfcConfigData }] =
    useGetNFCConfigByOwner();
  const [createNFCConfig] = useCreateNFCConfig();
  const [updateNFCConfig] = useUpdateNFCConfig();

  const fetchConfig = () => {
    if (userId) {
      getNFCConfigByOwner({ variables: { ownerId: userId } });
    }
  };

  const saveConfig = async (formData: {
    title: string;
    description: string;
    url: string;
  }) => {
    try {
      setIsSaving(true);
      const nfcConfig = nfcConfigData?.getNFCConfigByOwner;

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
