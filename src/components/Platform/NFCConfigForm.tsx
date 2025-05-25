import React, { useState, useEffect } from "react";
import {
  IonCard,
  IonCardContent,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonSpinner,
  IonCheckbox,
} from "@ionic/react";
import { MediaUploader } from "../MediaUploader/MediaUploader";
import { MediaPurpose } from "../../__generated__/graphql";

interface SocialMediaSettings {
  facebook?: boolean;
  instagram?: boolean;
  twitter?: boolean;
}

interface NFCContent {
  type: "link" | "file";
  title: string;
  description: string;
  content: string;
  socialMedia: SocialMediaSettings;
  givingLink?: string | null;
  memberRegistrationLink?: string | null;
}

interface NFCConfigFormProps {
  initialData?: {
    title: string;
    description: string;
    url: string;
    socialMedia?: SocialMediaSettings;
    givingLink?: string | null;
    memberRegistrationLink?: string | null;
  };
  onSave: (data: {
    title: string;
    description: string;
    url: string;
    socialMedia?: SocialMediaSettings;
    givingLink?: string | null;
    memberRegistrationLink?: string | null;
  }) => Promise<void>;
  isSaving: boolean;
  isUpdating: boolean;
}

export const NFCConfigForm: React.FC<NFCConfigFormProps> = ({
  initialData,
  onSave,
  isSaving,
  isUpdating,
}) => {
  // local state
  const [nfcContent, setNfcContent] = useState<NFCContent>({
    type: "link",
    title: initialData?.title || "",
    description: initialData?.description || "",
    content: initialData?.url || "",
    socialMedia: {
      facebook: initialData?.socialMedia?.facebook || false,
      instagram: initialData?.socialMedia?.instagram || false,
      twitter: initialData?.socialMedia?.twitter || false,
    },
    givingLink: initialData?.givingLink || null,
    memberRegistrationLink: initialData?.memberRegistrationLink || null,
  });

  // form toggle state
  const [formToggles, setFormToggles] = useState({
    givingLinkEnabled: initialData?.givingLink ? true : false,
    memberRegistrationLinkEnabled: initialData?.memberRegistrationLink
      ? true
      : false,
  });

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setNfcContent({
        type: "link",
        title: initialData.title,
        description: initialData.description,
        content: initialData.url,
        socialMedia: {
          facebook: initialData.socialMedia?.facebook || false,
          instagram: initialData.socialMedia?.instagram || false,
          twitter: initialData.socialMedia?.twitter || false,
        },
        givingLink: initialData.givingLink || null,
        memberRegistrationLink: initialData.memberRegistrationLink || null,
      });
    }
  }, [initialData]);

  const handleSave = async () => {
    await onSave({
      title: nfcContent.title.trim(),
      description: nfcContent.description.trim(),
      url: nfcContent.content.trim(),
      socialMedia: nfcContent.socialMedia,
      givingLink: nfcContent.givingLink,
      memberRegistrationLink: nfcContent.memberRegistrationLink,
    });
  };

  return (
    <IonCard className="platform-card">
      <IonCardContent>
        <IonTitle className="platform-title">Church Tap</IonTitle>
        <div className="platform-form">
          <IonItem>
            <IonLabel position="stacked">Content Type</IonLabel>
            <IonSelect
              value={nfcContent.type}
              onIonChange={(e) =>
                setNfcContent({ ...nfcContent, type: e.detail.value })
              }
            >
              <IonSelectOption value="link">Link</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput
              value={nfcContent.title}
              onIonInput={(e) =>
                setNfcContent({ ...nfcContent, title: e.detail.value! })
              }
              placeholder="Enter title for the NFC tag"
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea
              value={nfcContent.description}
              onIonInput={(e) =>
                setNfcContent({
                  ...nfcContent,
                  description: e.detail.value!,
                })
              }
              placeholder="Enter description for the NFC tag"
              rows={3}
            />
          </IonItem>

          {nfcContent.type === "link" ? (
            <>
              <IonItem>
                <IonLabel position="stacked">URL</IonLabel>
                <IonInput
                  type="url"
                  value={nfcContent.content}
                  onIonInput={(e) =>
                    setNfcContent({
                      ...nfcContent,
                      content: e.detail.value!,
                    })
                  }
                  placeholder="Enter URL"
                />
              </IonItem>

              <IonItem>
                <IonCheckbox
                  checked={nfcContent.socialMedia.facebook}
                  onIonChange={(e) =>
                    setNfcContent({
                      ...nfcContent,
                      socialMedia: {
                        ...nfcContent.socialMedia,
                        facebook: e.detail.checked,
                      },
                    })
                  }
                >
                  Share on Facebook
                </IonCheckbox>
              </IonItem>

              {/* <IonItem>
                <IonCheckbox
                  checked={nfcContent.socialMedia.instagram}
                  onIonChange={(e) =>
                    setNfcContent({
                      ...nfcContent,
                      socialMedia: {
                        ...nfcContent.socialMedia,
                        instagram: e.detail.checked,
                      },
                    })
                  }
                >
                  Share on Instagram
                </IonCheckbox>
              </IonItem> */}

              {/* <IonItem>
                <IonCheckbox
                  checked={nfcContent.socialMedia.twitter}
                  onIonChange={(e) =>
                    setNfcContent({
                      ...nfcContent,
                      socialMedia: {
                        ...nfcContent.socialMedia,
                        twitter: e.detail.checked,
                      },
                    })
                  }
                >
                  Share on Twitter
                </IonCheckbox>
              </IonItem> */}
            </>
          ) : (
            <MediaUploader
              purpose={MediaPurpose.Other}
              onUploadSuccess={(mediaId, url) => {
                setNfcContent({ ...nfcContent, content: url });
              }}
            />
          )}

          <IonItem>
            <IonCheckbox
              checked={formToggles.givingLinkEnabled}
              onIonChange={(e) =>
                setFormToggles({
                  ...formToggles,
                  givingLinkEnabled: e.detail.checked,
                })
              }
            >
              Enable Giving Link
            </IonCheckbox>
          </IonItem>

          {formToggles.givingLinkEnabled && (
            <IonItem>
              <IonLabel position="stacked">Giving Link URL</IonLabel>
              <IonInput
                type="url"
                value={nfcContent.givingLink}
                onIonInput={(e) =>
                  setNfcContent({
                    ...nfcContent,
                    givingLink: e.detail.value || null,
                  })
                }
                placeholder="Enter giving link URL"
              />
            </IonItem>
          )}

          <IonItem>
            <IonCheckbox
              checked={formToggles.memberRegistrationLinkEnabled}
              onIonChange={(e) =>
                setFormToggles({
                  ...formToggles,
                  memberRegistrationLinkEnabled: e.detail.checked,
                })
              }
            >
              Enable Member Registration Link
            </IonCheckbox>
          </IonItem>

          {formToggles.memberRegistrationLinkEnabled && (
            <IonItem>
              <IonLabel position="stacked">Member Registration URL</IonLabel>
              <IonInput
                type="url"
                value={nfcContent.memberRegistrationLink}
                onIonInput={(e) =>
                  setNfcContent({
                    ...nfcContent,
                    memberRegistrationLink: e.detail.value || null,
                  })
                }
                placeholder="Enter member registration URL"
              />
            </IonItem>
          )}

          <IonButton
            expand="block"
            size="large"
            onClick={handleSave}
            className="platform-save-button"
          >
            {isSaving && <IonSpinner name="crescent" />}
            {isUpdating ? "Update NFC Content" : "Save NFC Content"}
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};
