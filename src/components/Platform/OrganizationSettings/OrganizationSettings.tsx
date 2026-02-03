import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import "./OrganizationSettings.scss";

interface OrganizationSettingsProps {
  organizationName?: string;
  onSave?: (data: any) => void;
}

export const OrganizationSettings: React.FC<OrganizationSettingsProps> = ({
  organizationName: initialOrgName,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: initialOrgName || "",
    type: "church",
    description: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
    },
  });

  const handleSubmit = () => {
    if (onSave) {
      onSave(formData);
    }
  };

  return (
    <div className="organization-settings-container">
      <IonCard className="settings-card">
        <IonCardHeader>
          <IonCardTitle>Organization Details</IonCardTitle>
          <IonText color="medium">
            <p>Manage your church or organization information</p>
          </IonText>
        </IonCardHeader>
        <IonCardContent>
          <div className="settings-form">
            <IonItem>
              <IonLabel position="stacked">Organization Name *</IonLabel>
              <IonInput
                value={formData.name}
                onIonInput={(e) =>
                  setFormData({ ...formData, name: e.detail.value! })
                }
                placeholder="Enter organization name"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Type *</IonLabel>
              <IonSelect
                value={formData.type}
                onIonChange={(e) =>
                  setFormData({ ...formData, type: e.detail.value })
                }
              >
                <IonSelectOption value="church">Church</IonSelectOption>
                <IonSelectOption value="nonprofit">
                  Non-Profit Organization
                </IonSelectOption>
                <IonSelectOption value="ministry">Ministry</IonSelectOption>
                <IonSelectOption value="charity">Charity</IonSelectOption>
                <IonSelectOption value="other">Other</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Description</IonLabel>
              <IonTextarea
                value={formData.description}
                onIonInput={(e) =>
                  setFormData({ ...formData, description: e.detail.value! })
                }
                placeholder="Brief description of your organization"
                rows={4}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Address</IonLabel>
              <IonTextarea
                value={formData.address}
                onIonInput={(e) =>
                  setFormData({ ...formData, address: e.detail.value! })
                }
                placeholder="Physical address"
                rows={2}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Phone</IonLabel>
              <IonInput
                type="tel"
                value={formData.phone}
                onIonInput={(e) =>
                  setFormData({ ...formData, phone: e.detail.value! })
                }
                placeholder="Contact phone number"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput
                type="email"
                value={formData.email}
                onIonInput={(e) =>
                  setFormData({ ...formData, email: e.detail.value! })
                }
                placeholder="Contact email"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Website</IonLabel>
              <IonInput
                type="url"
                value={formData.website}
                onIonInput={(e) =>
                  setFormData({ ...formData, website: e.detail.value! })
                }
                placeholder="https://yourwebsite.com"
              />
            </IonItem>
          </div>
        </IonCardContent>
      </IonCard>

      <IonCard className="settings-card">
        <IonCardHeader>
          <IonCardTitle>Social Media</IonCardTitle>
          <IonText color="medium">
            <p>Connect your social media accounts</p>
          </IonText>
        </IonCardHeader>
        <IonCardContent>
          <div className="settings-form">
            <IonItem>
              <IonLabel position="stacked">Facebook</IonLabel>
              <IonInput
                value={formData.socialMedia.facebook}
                onIonInput={(e) =>
                  setFormData({
                    ...formData,
                    socialMedia: {
                      ...formData.socialMedia,
                      facebook: e.detail.value!,
                    },
                  })
                }
                placeholder="Facebook page URL"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Instagram</IonLabel>
              <IonInput
                value={formData.socialMedia.instagram}
                onIonInput={(e) =>
                  setFormData({
                    ...formData,
                    socialMedia: {
                      ...formData.socialMedia,
                      instagram: e.detail.value!,
                    },
                  })
                }
                placeholder="Instagram profile URL"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Twitter/X</IonLabel>
              <IonInput
                value={formData.socialMedia.twitter}
                onIonInput={(e) =>
                  setFormData({
                    ...formData,
                    socialMedia: {
                      ...formData.socialMedia,
                      twitter: e.detail.value!,
                    },
                  })
                }
                placeholder="Twitter/X profile URL"
              />
            </IonItem>
          </div>
        </IonCardContent>
      </IonCard>

      <IonButton
        expand="block"
        size="large"
        onClick={handleSubmit}
        className="save-button"
      >
        Save Changes
      </IonButton>
    </div>
  );
};
