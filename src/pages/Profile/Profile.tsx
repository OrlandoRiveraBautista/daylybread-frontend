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
import Avatar from "boring-avatars";
import { Helmet } from "react-helmet";

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

  const canonicalUrl = window.location.href;

  useEffect(() => {
    if (!data || !data.deleteBookmarks) return;
    resetUserAssetList();

    // ?-- for some reason just waiting 50ms allows for the refresh to work, I guess cache takes some time to update
    setTimeout(() => {
      handleGetBookmarks();
    }, 50);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteAssets = () => {
    const assetIds = selectedUserAssets.map((asset) => asset._id);

    deleteBookmarks({ variables: { ids: assetIds } });
  };

  return !userInfo ? null : (
    <div id="profile">
      <Helmet>
        <title>
          `${userInfo.firstName} ${userInfo.lastName} | Profile`
        </title>
        <meta
          name="description"
          content={`Welcome to ${userInfo.firstName} ${userInfo.lastName}'s profile!`}
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
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
                <Avatar
                  alt="Silhouette of a person's head"
                  name={`${userInfo.firstName} ${userInfo.lastName}`}
                  size={120}
                  variant="beam"
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
