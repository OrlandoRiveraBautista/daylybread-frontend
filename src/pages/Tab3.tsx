import { IonContent, IonPage } from "@ionic/react";

/* Components */

/* Styles */
import "./Tab3.scss";

/* Context */
import { useAppContext } from "../context/context";
import { Redirect } from "react-router";

const Tab3: React.FC = () => {
  const { userInfo } = useAppContext();

  return (
    <IonPage>
      <IonContent>
        {!userInfo ? (
          <Redirect to="/login" />
        ) : (
          <div>Hello welcome mate to your profile {userInfo.firstName}</div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
