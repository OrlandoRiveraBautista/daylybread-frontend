import { IonContent, IonPage, IonText } from "@ionic/react";

import "./Tab1.scss";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <IonText>
            <h2>Daylybread</h2>
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
