import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonSpinner,
  IonText,
  IonTextarea,
  IonTitle,
} from "@ionic/react";

/* Styles */
import "./UserBio.scss";

/* GraphQL API/Hooks */
import { useUserUpdate } from "../../hooks/UserHooks";

/* Types */
import { User } from "../../__generated__/graphql";
interface IUserBio {
  user: User;
}

const UserBio: React.FC<IUserBio> = ({ user }: IUserBio) => {
  const [bioText, setBioText] = useState(user.bioText);
  const [inputActive, setInputActive] = useState<boolean>(false);

  const { setUserUpdate, data, loading, error } = useUserUpdate();

  useEffect(() => {
    if (!data) return;

    setInputActive(!inputActive);
  }, [data]);

  const handleSubmit = () => {
    setUserUpdate({
      variables: {
        options: {
          bioText,
        },
      },
    });
  };
  return (
    <div id="profile-user-bio" className="user-bio-container">
      <IonTitle className="ion-no-padding">
        {user.firstName} {user.lastName}
      </IonTitle>
      {/* I should make this here into a clickable text */}
      {/* <IonText className="text-user-handle">@IWillBeAHandle</IonText> */}
      {user.bioText || inputActive ? (
        <>
          {user.bioText && !inputActive ? (
            <IonText>{user.bioText}</IonText>
          ) : (
            <IonTextarea
              labelPlacement="floating"
              color="primary"
              value={bioText}
              fill="outline"
              autoGrow={true}
              onIonInput={(e) => setBioText(e.target.value)}
            />
          )}
          <div className="bio-text-input-actions">
            {inputActive ? (
              <>
                <IonButton
                  shape="round"
                  fill="clear"
                  color="medium"
                  className="flat"
                  onClick={() => setInputActive(!inputActive)}
                  disabled={loading}
                >
                  Cancel
                </IonButton>
                <IonButton
                  shape="round"
                  disabled={loading ? true : false}
                  fill={
                    !loading && !data
                      ? "solid"
                      : error
                      ? "clear"
                      : loading && !data
                      ? "default"
                      : "outline"
                  }
                  onClick={handleSubmit}
                  color={
                    !loading && !data
                      ? "primary"
                      : error
                      ? "danger"
                      : loading && !data
                      ? "warning"
                      : "success"
                  }
                >
                  {!loading && !data ? (
                    "Save"
                  ) : loading && !data ? (
                    <IonSpinner />
                  ) : error ? (
                    "Something went wrong"
                  ) : (
                    "Success"
                  )}
                </IonButton>
              </>
            ) : (
              <>
                <IonButton
                  shape="round"
                  fill="solid"
                  color="secondary"
                  className="flat"
                  onClick={() => setInputActive(!inputActive)}
                  disabled={loading}
                >
                  Edit
                </IonButton>
              </>
            )}
          </div>
        </>
      ) : (
        <IonButton
          shape="round"
          fill="solid"
          color="secondary"
          className="flat"
          onClick={() => setInputActive(!inputActive)}
        >
          Add a text
        </IonButton>
      )}
    </div>
  );
};

export default UserBio;
