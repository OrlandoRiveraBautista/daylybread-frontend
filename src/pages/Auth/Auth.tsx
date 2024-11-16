import React from "react";
import { IonImg, IonText, IonTitle } from "@ionic/react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

/* Components */
import Login from "./Login";
import Signup from "./Signup";
import UpdateUserAfterSignup from "./UpdateUserAfterSignup";

/* Styles */
import "./Auth.scss";

/* Images */
import SmallWordLogo from "../../assets/images/small-word-logo.svg";
import SmallWordLogoDark from "../../assets/images/small-word-logo-dark.svg";

const Auth: React.FC = () => {
  const location = useLocation();
  const canonicalUrl = window.location.href;

  const pathToString: any = {
    login: "Welcome back to Daylybread | Login",
    signup: "Welcome to Daylybread | Signup",
    signupupdateuser: "Just a few more things | Welcome to Daylybread | Signup",
  };

  return (
    <div className="container" id="auth">
      <Helmet>
        <title>{pathToString[location.pathname.substring(1)]}</title>
        <meta
          name="description"
          content={pathToString[location.pathname.substring(1)]}
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <div className="auth-welcome-container">
        <IonImg
          src={
            window.matchMedia("(prefers-color-scheme: dark)").matches
              ? SmallWordLogoDark
              : SmallWordLogo
          }
          alt="Daylybread Small Logo"
        />
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
      ) : location.pathname === "/signupupdateuser" ? (
        <UpdateUserAfterSignup />
      ) : null}
    </div>
  );
};

export default Auth;
