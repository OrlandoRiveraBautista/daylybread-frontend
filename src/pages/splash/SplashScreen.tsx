import { useEffect, useState } from "react";
import {
  IonContent,
  IonImg,
  IonPage,
  IonText,
  CreateAnimation,
} from "@ionic/react";

/* Styles */
import "./SplashScreen.scss";

/* Images */
import WhiteLogo from "../../assets/images/daylybread-logo-white.svg";

const Tab1: React.FC = () => {
  const [playAnimation, setPlayAnimation] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setPlayAnimation(!playAnimation);
    }, 2000);
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen className="splash-container">
        <div className="splash-container">
          <CreateAnimation
            play={playAnimation}
            duration={1500}
            iterations={Infinity}
            keyframes={[
              { offset: 0, transform: "scale(1)" },
              { offset: 0.5, transform: "scale(.9)" },
              { offset: 1, transform: "scale(1)" },
            ]}
          >
            <IonImg src={WhiteLogo}></IonImg>
          </CreateAnimation>
          <IonText className="product-sans">
            <h2>Daylybread ®</h2>
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
