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

interface LinkSettings {
  isVisible: boolean;
  url: string;
}

interface MainButtonSettings {
  url: string;
  text: string;
}

interface NFCContent {
  type: "link" | "file";
  title: string;
  description: string;
  mainButton: MainButtonSettings;
  socialMedia: SocialMediaSettings;
  givingLink?: LinkSettings | null;
  memberRegistrationLink?: LinkSettings | null;
  eventsLink?: LinkSettings | null;
}

interface NFCConfigFormProps {
  initialData?: {
    title: string;
    description: string;
    mainButton: MainButtonSettings;
    socialMedia?: SocialMediaSettings;
    givingLink?: LinkSettings | null;
    memberRegistrationLink?: LinkSettings | null;
    eventsLink?: LinkSettings | null;
  };
  onSave: (data: {
    title: string;
    description: string;
    mainButton: MainButtonSettings;
    socialMedia?: SocialMediaSettings;
    givingLink?: LinkSettings | null;
    memberRegistrationLink?: LinkSettings | null;
    eventsLink?: LinkSettings | null;
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
    mainButton: {
      url: initialData?.mainButton.url || "",
      text: initialData?.mainButton.text || "",
    },
    description: initialData?.description || "",
    socialMedia: {
      facebook: initialData?.socialMedia?.facebook || false,
      instagram: initialData?.socialMedia?.instagram || false,
      twitter: initialData?.socialMedia?.twitter || false,
    },
    givingLink: {
      isVisible: initialData?.givingLink?.isVisible || false,
      url: initialData?.givingLink?.url || "",
    },
    memberRegistrationLink: {
      isVisible: initialData?.memberRegistrationLink?.isVisible || false,
      url: initialData?.memberRegistrationLink?.url || "",
    },
    eventsLink: {
      isVisible: initialData?.eventsLink?.isVisible || false,
      url: initialData?.eventsLink?.url || "",
    },
  });

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setNfcContent({
        type: "link",
        title: initialData.title,
        description: initialData.description,
        mainButton: {
          url: initialData.mainButton.url,
          text: initialData.mainButton.text,
        },
        socialMedia: {
          facebook: initialData.socialMedia?.facebook || false,
          instagram: initialData.socialMedia?.instagram || false,
          twitter: initialData.socialMedia?.twitter || false,
        },
        givingLink: {
          isVisible: initialData.givingLink?.isVisible || false,
          url: initialData.givingLink?.url || "",
        },
        memberRegistrationLink: {
          isVisible: initialData.memberRegistrationLink?.isVisible || false,
          url: initialData.memberRegistrationLink?.url || "",
        },
        eventsLink: {
          isVisible: initialData.eventsLink?.isVisible || false,
          url: initialData.eventsLink?.url || "",
        },
      });
    }
  }, [initialData]);

  const handleSave = async () => {
    await onSave({
      title: nfcContent.title.trim(),
      description: nfcContent.description.trim(),
      mainButton: nfcContent.mainButton,
      socialMedia: nfcContent.socialMedia,
      givingLink: nfcContent.givingLink,
      memberRegistrationLink: nfcContent.memberRegistrationLink,
      eventsLink: nfcContent.eventsLink,
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
                <IonLabel position="stacked">Center Button Label</IonLabel>
                <IonInput
                  type="text"
                  value={nfcContent.mainButton.text}
                  onIonInput={(e) =>
                    setNfcContent({
                      ...nfcContent,
                      mainButton: {
                        ...nfcContent.mainButton,
                        text: e.detail.value!,
                      },
                    })
                  }
                  placeholder="Enter button label"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Center Button URL</IonLabel>
                <IonInput
                  type="url"
                  value={nfcContent.mainButton.url}
                  onIonInput={(e) =>
                    setNfcContent({
                      ...nfcContent,
                      mainButton: {
                        ...nfcContent.mainButton,
                        url: e.detail.value!,
                      },
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
                setNfcContent({
                  ...nfcContent,
                  mainButton: {
                    ...nfcContent.mainButton,
                    url: url,
                  },
                });
              }}
            />
          )}

          <IonItem>
            <IonCheckbox
              checked={nfcContent.givingLink?.isVisible}
              onIonChange={(e) => {
                setNfcContent({
                  ...nfcContent,
                  givingLink: {
                    isVisible: e.detail.checked,
                    url: nfcContent.givingLink?.url || "",
                  },
                });
              }}
            >
              Enable Giving Link
            </IonCheckbox>
          </IonItem>

          {nfcContent.givingLink?.isVisible && (
            <IonItem>
              <IonLabel position="stacked">Giving Link URL</IonLabel>
              <IonInput
                type="url"
                value={nfcContent.givingLink?.url}
                onIonInput={(e) =>
                  setNfcContent({
                    ...nfcContent,
                    givingLink: {
                      isVisible: true,
                      url: e.detail.value || "",
                    },
                  })
                }
                placeholder="Enter giving link URL"
              />
            </IonItem>
          )}

          <IonItem>
            <IonCheckbox
              checked={nfcContent.memberRegistrationLink?.isVisible}
              onIonChange={(e) => {
                setNfcContent({
                  ...nfcContent,
                  memberRegistrationLink: {
                    isVisible: e.detail.checked,
                    url: nfcContent.memberRegistrationLink?.url || "",
                  },
                });
              }}
            >
              Enable Member Registration Link
            </IonCheckbox>
          </IonItem>

          {nfcContent.memberRegistrationLink?.isVisible && (
            <IonItem>
              <IonLabel position="stacked">Member Registration URL</IonLabel>
              <IonInput
                type="url"
                value={nfcContent.memberRegistrationLink?.url}
                onIonInput={(e) =>
                  setNfcContent({
                    ...nfcContent,
                    memberRegistrationLink: {
                      isVisible: true,
                      url: e.detail.value || "",
                    },
                  })
                }
                placeholder="Enter member registration URL"
              />
            </IonItem>
          )}

          <IonItem>
            <IonCheckbox
              checked={nfcContent.eventsLink?.isVisible}
              onIonChange={(e) => {
                setNfcContent({
                  ...nfcContent,
                  eventsLink: {
                    isVisible: e.detail.checked,
                    url: nfcContent.eventsLink?.url || "",
                  },
                });
              }}
            >
              Enable Events Link
            </IonCheckbox>
          </IonItem>

          {nfcContent.eventsLink?.isVisible && (
            <IonItem>
              <IonLabel position="stacked">Events Link URL</IonLabel>
              <IonInput
                type="url"
                value={nfcContent.eventsLink?.url}
                onIonInput={(e) =>
                  setNfcContent({
                    ...nfcContent,
                    eventsLink: {
                      isVisible: true,
                      url: e.detail.value || "",
                    },
                  })
                }
                placeholder="Enter events link URL"
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
