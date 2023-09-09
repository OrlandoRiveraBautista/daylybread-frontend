import React from "react";
import { IonText, IonTitle } from "@ionic/react";

/* Styles */
import "./UserBio.scss";

/* Types */
import { User } from "../../__generated__/graphql";
interface IUserBio {
  user: User;
}
const UserBio: React.FC<IUserBio> = ({ user }: IUserBio) => {
  return (
    <div id="profile-user-bio" className="user-bio-container">
      <IonTitle className="ion-no-padding">
        {user.firstName} {user.lastName}
      </IonTitle>
      {/* I should make this here into a clickable text */}
      <IonText className="text-user-handle">@IWillBeAHandle</IonText>
      <IonText>
        Here is a great place to put anything about yourself. Perhaps your goals
        and what not.
      </IonText>
    </div>
  );
};

export default UserBio;
