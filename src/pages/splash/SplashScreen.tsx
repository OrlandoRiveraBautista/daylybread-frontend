import { IonContent, IonImg, IonPage, IonText } from "@ionic/react";

/* Styles */
import "./SplashScreen.scss";

/* Images */
import WhiteLogo from "../../assets/images/daylybread-logo-white.svg";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen className="splash-container">
        <div className="splash-container">
          <IonImg src={WhiteLogo}></IonImg>
          <IonText className="product-sans">
            <h2>Daylybread ®</h2>
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
