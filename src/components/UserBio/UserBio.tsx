import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonSpinner,
  IonText,
  IonTextarea,
} from "@ionic/react";

/* Styles */
import "./UserBio.scss";

/* GraphQL API/Hooks */
import { useUserUpdate } from "../../hooks/UserHooks";

/* Context */
import { useAppContext } from "../../context/context";

/* Services */
import { hapticService } from "../../services/hapticService";

/* Types */
import { User } from "../../__generated__/graphql";

interface IUserBio {
  user: User;
}

const UserBio: React.FC<IUserBio> = ({ user }: IUserBio) => {
  const { setUser } = useAppContext();
  const [bioText, setBioText] = useState(user.bioText ?? "");
  const [inputActive, setInputActive] = useState(false);

  const { setUserUpdate, data, loading, error } = useUserUpdate();

  useEffect(() => {
    if (!inputActive) {
      setBioText(user.bioText ?? "");
    }
  }, [user.bioText, inputActive]);

  useEffect(() => {
    if (!data?.updateUser?.user) return;

    setUser(data.updateUser.user);
    setInputActive(false);
    void hapticService.triggerSuccessHaptic();
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!error) return;
    void hapticService.triggerErrorHaptic();
  }, [error]);

  const displayName =
    `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Daylybread";

  const handleCancel = () => {
    setBioText(user.bioText ?? "");
    setInputActive(false);
    void hapticService.triggerNavigationHaptic();
  };

  const handleBeginEdit = () => {
    setBioText(user.bioText ?? "");
    setInputActive(true);
    void hapticService.triggerNavigationHaptic();
  };

  const handleSubmit = () => {
    setUserUpdate({
      variables: {
        options: {
          bioText: bioText?.trim() || "",
        },
      },
    });
  };

  const hasBio = Boolean(user.bioText?.trim());
  const canSave =
    (bioText?.trim() || "") !== (user.bioText?.trim() || "") && !loading;

  return (
    <div id="profile-user-bio" className="user-bio-container">
      <h1 className="user-display-name">{displayName}</h1>

      {user.churchName ? (
        <IonText className="user-meta">{user.churchName}</IonText>
      ) : null}

      {inputActive ? (
        <div className="bio-editor">
          <IonTextarea
            className="bio-textarea"
            color="primary"
            value={bioText}
            autoGrow={true}
            maxlength={280}
            placeholder="Share a little about your faith journey…"
            onIonInput={(e) => setBioText(e.target.value ?? "")}
          />
          <div className="bio-text-input-actions">
            <IonButton
              shape="round"
              fill="clear"
              color="medium"
              className="bio-action bio-action--ghost"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </IonButton>
            <IonButton
              shape="round"
              fill="solid"
              color={error ? "danger" : "primary"}
              className="bio-action"
              onClick={handleSubmit}
              disabled={!canSave && !error}
            >
              {loading ? (
                <IonSpinner name="crescent" />
              ) : error ? (
                "Try again"
              ) : (
                "Save"
              )}
            </IonButton>
          </div>
        </div>
      ) : hasBio ? (
        <button
          type="button"
          className="bio-text-button"
          onClick={handleBeginEdit}
          aria-label="Edit bio"
        >
          <IonText className="bio-text">{user.bioText}</IonText>
          <span className="bio-edit-hint">Edit</span>
        </button>
      ) : (
        <IonButton
          shape="round"
          fill="clear"
          color="primary"
          className="bio-add-button"
          onClick={handleBeginEdit}
        >
          Add a bio
        </IonButton>
      )}
    </div>
  );
};

export default UserBio;
