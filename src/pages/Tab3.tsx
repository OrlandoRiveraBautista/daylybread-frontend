import { IonContent, IonPage } from "@ionic/react";

/* Components */
import Auth from "../components/Auth/Auth";

/* Styles */
import "./Tab3.scss";

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <Auth />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
