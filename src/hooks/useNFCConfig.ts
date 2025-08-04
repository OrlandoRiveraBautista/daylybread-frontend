import { useState } from "react";
import {
  useCreateNFCConfig,
  useGetNFCConfigByOwner,
  useUpdateNFCConfig,
} from "./NFCConfigHooks";

interface SocialMediaSettings {
  facebook?: boolean;
  instagram?: boolean;
  twitter?: boolean;
}

interface LinkSettings {
  isVisible?: boolean;
  url?: string;
}

interface MainButton {
  url: string;
  text: string;
}

interface NFCConfigFormData {
  type: string;
  title: string;
  description: string;
  mainButton: MainButton;
  socialMedia?: SocialMediaSettings;
  givingLink?: LinkSettings;
  memberRegistrationLink?: LinkSettings;
  eventsLink?: LinkSettings;
  mediaId?: string;
}

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
