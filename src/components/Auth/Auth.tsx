import React from "react";
import { IonImg, IonText, IonTitle } from "@ionic/react";
import { useLocation } from "react-router-dom";

/* Components */
import Login from "./Login";

/* Styles */
import "./Auth.scss";

/* Images */
import SmallWordLogo from "../../assets/images/small-word-logo.svg";
import Signup from "./Signup";

const Auth: React.FC = () => {
  const location = useLocation();

  return (
    <div className="container" id="auth">
      <div className="auth-welcome-container">
        <IonImg src={SmallWordLogo} alt="Daylybread Small Logo" />
        <div className="auth-welcome-text">
          <IonTitle className="welcoming-title">
            {location.pathname === "/login" ? "Welcome back" : "Welcome"}
          </IonTitle>
          <IonText className="welcoming-description">
            {location.pathname === "/login"
              ? "Good to see you again"
              : "Just a few quick things to get started"}
          </IonText>
        </div>
      </div>
      {location.pathname === "/login" ? (
        <Login />
      ) : location.pathname === "/signup" ? (
        <Signup />
      ) : null}
    </div>
  );
};

export default Auth;
