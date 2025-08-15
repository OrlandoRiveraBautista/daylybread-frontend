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

/* Components */
import SEOHead from "../../components/SEO/SEOHead";
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

  // Generate SEO data
  const userName = `${userInfo?.firstName || ""} ${
    userInfo?.lastName || ""
  }`.trim();
  const profileSEO = {
    title: userName
      ? `${userName} | My Profile - Daylybread`
      : "My Profile - Daylybread",
    description: userName
      ? `${userName}'s personal profile on Daylybread. View bookmarks, reading history, and spiritual journey progress.`
      : "Manage your personal Bible reading profile, bookmarks, and spiritual growth journey on Daylybread.",
    keywords:
      "Bible profile, Christian profile, Bible bookmarks, spiritual journey, Bible reading history, Christian growth tracker, faith profile, Bible study progress",
    url: "https://bible.daylybread.com/me",
    type: "profile",
    section: "User Profile",
    noindex: true, // Keep user profiles private from search engines
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        name: userName,
        description: `${userName}'s spiritual journey on Daylybread`,
      },
      about: {
        "@type": "WebApplication",
        name: "Daylybread",
        description: "Smart Bible reading platform with AI assistance",
      },
    },
  };

  return !userInfo ? null : (
    <div id="profile">
      {/* Enhanced SEO Head */}
      <SEOHead {...profileSEO} />
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
