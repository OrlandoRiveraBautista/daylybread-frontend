import React, { useRef } from "react";
import {
  IonModal,
  IonContent,
  IonTitle,
  IonRow,
  IonText,
  IonCol,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router";

/* Styles */
import "./SignInModal.scss";

/* Interfaces */
interface ISignInModal {
  isOpen: boolean;
  onDismiss: () => void;
}

const SignInModal: React.FC<ISignInModal> = ({
  isOpen,
  onDismiss,
}: ISignInModal) => {
  const history = useHistory();
  const modal = useRef<HTMLIonModalElement>(null);

  const handleSignIn = () => {
    modal.current?.dismiss();
    history.push("/login");
  };

  const handleSignUp = () => {
    modal.current?.dismiss();
    history.push("/signup");
  };

  return (
    <IonModal
      trigger="openSignInModal"
      id="openSignInModal"
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      ref={modal}
    >
      <IonContent className="ion-padding signin-modal">
        <div className="modal-content-container">
          <IonTitle className="ion-text-center">Sign In Required</IonTitle>

          <div className="signin-content">
            <IonRow>
              <IonCol>
                <IonText>
                  <p>
                    To access personalized mood check-ins and save your
                    spiritual journey, please sign in to your Daylybread
                    account.
                  </p>
                </IonText>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonText color="medium">
                  <p className="signin-footer">
                    Already have an account? Sign in to continue your spiritual
                    journey.
                  </p>
                </IonText>
              </IonCol>
            </IonRow>
          </div>

          <div className="signin-actions">
            <IonRow>
              <IonCol>
                <IonButton
                  shape="round"
                  fill="solid"
                  color="primary"
                  onClick={handleSignIn}
                  className="signin-button"
                >
                  Login
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonButton
                  shape="round"
                  color="light"
                  onClick={handleSignUp}
                  className="signup-button"
                >
                  <IonText>
                    <b>
                      Don&apos;t have an account? <u>Sign up</u>
                    </b>
                  </IonText>
                </IonButton>
              </IonCol>
            </IonRow>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default SignInModal;
