import React from "react";
import { IonPage, IonSpinner, IonText, IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";

const CheckingAuthentication: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <div className="platform-loading">
        <IonSpinner name="crescent" />

        <IonText>Checking authentication...</IonText>
        {/* Go to signup button */}
        <IonButton
          shape="round"
          color="light"
          onClick={(e) => {
            e.preventDefault();
            history.push("/signup");
          }}
        >
          <IonText>
            <b>
              Don&apos;t have an account? <u>Sign up</u>
            </b>
          </IonText>
        </IonButton>
        {/* Go to Login button */}
        <IonButton
          shape="round"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            history.push("/login");
          }}
        >
          <IonText>
            <b>
              Have an account? <u style={{ color: "white" }}>Login</u>
            </b>
          </IonText>
        </IonButton>
      </div>
    </IonPage>
  );
};

export default CheckingAuthentication;
