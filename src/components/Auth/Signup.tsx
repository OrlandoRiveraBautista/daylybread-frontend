import React from "react";
import { IonInput, IonButton, IonText } from "@ionic/react";
import { useHistory } from "react-router";

const Signup: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <div className="auth-form-input">
        <IonInput
          label="Email"
          labelPlacement="floating"
          placeholder="Please enter your email"
        />
        <IonInput
          label="Password"
          labelPlacement="floating"
          placeholder="Please enter your password"
        />
      </div>
      <div className="auth-form-submit">
        <IonButton shape="round">Continue</IonButton>
        <IonButton
          shape="round"
          color="light"
          onClick={(e) => {
            e.preventDefault();
            history.push("/login");
          }}
        >
          <IonText>
            <b>
              Have an account? <u>Login</u>
            </b>
          </IonText>
        </IonButton>
      </div>
    </>
  );
};

export default Signup;
