import React from "react";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
} from "@ionic/react";

/* Components */
import UserBio from "../../components/UserBio/UserBio";
import UserAssetsViewer from "../../components/UserAssetsViewer/UserAssetsViewer";

/* Context */
import { useAppContext } from "../../context/context";

/* Styles */
import "./Profile.scss";

const Profile: React.FC = () => {
  const { userInfo } = useAppContext();

  return !userInfo ? null : (
    <div id="profile">
      {/* Header */}
      <IonHeader className="ion-no-border padding-left-right">
        {/* Toolbar */}
        <IonToolbar>
          {/* Header Title Button */}
          <IonButton
            fill="clear"
            color="dark"
            className="header-profile-button"
          >
            <img
              alt="Silhouette of a person's head"
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
            />
          </IonButton>

          {/* Header secondary buttons */}
          <IonButtons slot="end">
            <IonButton
              shape="round"
              fill="outline"
              color="primary"
              size="large"
              className="translation-button"
            ></IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <UserBio user={userInfo} />
        <UserAssetsViewer />
      </IonContent>
    </div>
  );
};

export default Profile;
