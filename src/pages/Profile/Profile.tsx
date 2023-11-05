import React, { useEffect } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonSpinner,
  IonText,
  IonToolbar,
} from "@ionic/react";

/* Components */
import UserBio from "../../components/UserBio/UserBio";
import UserAssetsViewer from "../../components/UserAssetsViewer/UserAssetsViewer";

/* Context */
import { useAppContext } from "../../context/context";

/* Graphql API/Hooks */
import { useDeleteBookmarks } from "../../hooks/UserHooks";

/* Styles */
import "./Profile.scss";

const Profile: React.FC = () => {
  // global context
  const {
    userInfo,
    selectedUserAssets,
    resetUserAssetList,
    handleGetBookmarks,
  } = useAppContext();

  // api/graphql
  const { deleteBookmarks, loading, data } = useDeleteBookmarks();

  useEffect(() => {
    if (!data || !data.deleteBookmarks) return;
    resetUserAssetList();

    // ?-- for some reason just waiting 50ms allows for the refresh to work, I guess cache takes some time to update
    setTimeout(() => {
      handleGetBookmarks();
    }, 50);
  }, [data]);

  const handleDeleteAssets = () => {
    const assetIds = selectedUserAssets.map((asset) => asset._id);

    deleteBookmarks({ variables: { ids: assetIds } });
  };

  return !userInfo ? null : (
    <div id="profile">
      {/* Header */}
      <IonHeader className="ion-no-border padding-left-right">
        {/* Toolbar */}
        <IonToolbar>
          {/* Header Title Button */}
          {!selectedUserAssets.length ? (
            <>
              <IonButton
                fill="clear"
                color="dark"
                className="header-profile-button"
              >
                <img
                  alt="Silhouette of a person's head"
                  src={`https://source.boringavatars.com/beam/120/${userInfo.firstName}-${userInfo.lastName}`} // randomized images for now
                />
              </IonButton>

              {/* Header secondary buttons */}
              {/* <IonButtons slot="end">
            <IonButton
              shape="round"
              fill="outline"
              color="primary"
              size="large"
              className="translation-button"
            ></IonButton>
          </IonButtons> */}
            </>
          ) : (
            <>
              <IonButtons slot="start">
                <IonButton
                  fill="clear"
                  color="dark"
                  className="header-profile-button"
                  onClick={resetUserAssetList}
                >
                  <span className="material-icons-round">close</span>
                </IonButton>
              </IonButtons>
              <IonText className="header-helper">
                {selectedUserAssets.length} selected
              </IonText>
              {/* Header secondary buttons */}
              <IonButtons slot="end">
                <IonButton
                  fill="clear"
                  color="dark"
                  className="header-profile-button"
                  onClick={handleDeleteAssets}
                  disabled={loading}
                >
                  {loading ? (
                    <IonSpinner />
                  ) : (
                    <span className="material-icons-round">delete_outline</span>
                  )}
                </IonButton>
              </IonButtons>
            </>
          )}
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
