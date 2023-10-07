import { IonPage } from "@ionic/react";
import { Redirect } from "react-router";

/* Components */
import Profile from "./Profile/Profile";

/* Styles */
import "./Tab3.scss";

/* Context */
import { useAppContext } from "../context/context";

const Tab3: React.FC = () => {
  const { userInfo } = useAppContext();

  return (
    <IonPage>
      <>
        {!document.cookie.includes("refresh-token") && !userInfo ? (
          <Redirect to="/login" />
        ) : (
          <Profile />
        )}
      </>
    </IonPage>
  );
};

export default Tab3;
