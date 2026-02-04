import React from "react";
import { IonPage, IonSpinner, IonText, IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./CheckingAuthentication.scss";
import SmallWordLogo from "../../assets/images/small-word-logo.svg";
import SmallWordLogoDark from "../../assets/images/small-word-logo-dark.svg";

const CheckingAuthentication: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <div className="auth-checking-container">
        {/* Background gradient overlay */}
        <div className="auth-checking-background">
          <div className="gradient-orb gradient-orb-1"></div>
          <div className="gradient-orb gradient-orb-2"></div>
          <div className="gradient-orb gradient-orb-3"></div>
        </div>

        {/* Main content card */}
        <div className="auth-checking-content">
          {/* Logo section */}
          <div className="auth-checking-logo-container">
            <img
              src={
                window.matchMedia("(prefers-color-scheme: dark)").matches
                  ? SmallWordLogoDark
                  : SmallWordLogo
              }
              alt="DaylyBread"
              className="auth-checking-logo"
            />
            <p className="auth-checking-subtitle">
              Ministry Management Platform
            </p>
          </div>

          {/* Loading indicator */}
          <div className="auth-checking-loader">
            <IonSpinner name="crescent" className="auth-checking-spinner" />
            <IonText className="auth-checking-status">
              Verifying your credentials...
            </IonText>
          </div>

          {/* Quick actions */}
          <div className="auth-checking-actions">
            <p className="auth-checking-help-text">
              Taking longer than expected?
            </p>

            <IonButton
              className="auth-action-button auth-action-primary"
              expand="block"
              onClick={(e) => {
                e.preventDefault();
                history.push("/login");
              }}
            >
              Sign in to your account
            </IonButton>

            <IonButton
              className="auth-action-button auth-action-secondary"
              expand="block"
              fill="clear"
              onClick={(e) => {
                e.preventDefault();
                history.push("/signup");
              }}
            >
              Create new account
            </IonButton>
          </div>

          {/* Footer */}
          <div className="auth-checking-footer">
            <IonText className="auth-checking-footer-text">
              Secure authentication
            </IonText>
          </div>
        </div>
      </div>
    </IonPage>
  );
};

export default CheckingAuthentication;
