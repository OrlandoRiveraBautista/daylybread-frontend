import React, { useEffect, useState } from "react";
import {
  IonAlert,
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

/* Services */
import { hapticService } from "../../services/hapticService";

/* Styles */
import "./Profile.scss";

const Profile: React.FC = () => {
  const {
    userInfo,
    selectedUserAssets,
    resetUserAssetList,
    handleGetBookmarks,
    bookmarksResponse,
  } = useAppContext();

  const { deleteBookmarks, loading, data } = useDeleteBookmarks();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  useEffect(() => {
    if (!data || !data.deleteBookmarks) return;
    resetUserAssetList();
    void hapticService.triggerSuccessHaptic();

    // ?-- for some reason just waiting 50ms allows for the refresh to work, I guess cache takes some time to update
    setTimeout(() => {
      handleGetBookmarks();
    }, 50);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteAssets = () => {
    const assetIds = selectedUserAssets.map((asset) => asset._id);
    deleteBookmarks({ variables: { ids: assetIds } });
    setShowDeleteAlert(false);
  };

  const handleCancelSelection = () => {
    void hapticService.triggerNavigationHaptic();
    resetUserAssetList();
  };

  const bookmarkCount =
    bookmarksResponse?.getMyBookmarks?.results?.length ?? 0;

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

  const isSelecting = selectedUserAssets.length > 0;

  return !userInfo ? null : (
    <div id="profile" className={isSelecting ? "is-selecting" : undefined}>
      <SEOHead {...profileSEO} />

      <IonHeader
        className={`ion-no-border profile-header ${
          isSelecting ? "profile-header--selecting" : "profile-header--idle"
        }`}
      >
        <IonToolbar>
          {isSelecting ? (
            <>
              <IonButtons slot="start">
                <IonButton
                  fill="clear"
                  className="profile-chrome-btn"
                  onClick={handleCancelSelection}
                  aria-label="Cancel selection"
                >
                  <span className="material-icons-round">close</span>
                </IonButton>
              </IonButtons>
              <IonText className="profile-selection-count header-helper">
                {selectedUserAssets.length} selected
              </IonText>
              <IonButtons slot="end">
                <IonButton
                  fill="clear"
                  color="danger"
                  className="profile-chrome-btn"
                  onClick={() => setShowDeleteAlert(true)}
                  disabled={loading}
                  aria-label="Delete selected bookmarks"
                >
                  {loading ? (
                    <IonSpinner name="crescent" />
                  ) : (
                    <span className="material-icons-round">delete_outline</span>
                  )}
                </IonButton>
              </IonButtons>
            </>
          ) : (
            <IonText className="profile-nav-title">Profile</IonText>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="profile-content">
        <div className="profile-atmosphere" aria-hidden="true" />

        <section
          className="profile-identity"
          aria-label={userName || "Your profile"}
        >
          <div className="profile-avatar-wrap">
            <Avatar
              name={
                `${userInfo.firstName || ""} ${userInfo.lastName || ""}`.trim() ||
                userInfo.email
              }
              size={96}
              variant="beam"
              colors={["#2989e3", "#f02c89", "#724498", "#a2c9ff", "#ffd9e2"]}
            />
          </div>
          <UserBio user={userInfo} />
        </section>

        <UserAssetsViewer bookmarkCount={bookmarkCount} />
      </IonContent>

      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header={
          selectedUserAssets.length === 1
            ? "Delete Bookmark"
            : "Delete Bookmarks"
        }
        message={
          selectedUserAssets.length === 1
            ? "This bookmark will be permanently removed."
            : `${selectedUserAssets.length} bookmarks will be permanently removed.`
        }
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Delete",
            role: "destructive",
            handler: handleDeleteAssets,
          },
        ]}
      />
    </div>
  );
};

export default Profile;
