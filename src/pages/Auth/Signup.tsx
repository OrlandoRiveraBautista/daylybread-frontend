import React, { useEffect, useState } from "react";
import {
  IonInput,
  IonButton,
  IonText,
  IonRow,
  IonCol,
  IonIcon,
  IonSpinner,
} from "@ionic/react";
import { useHistory } from "react-router";

/* Interfaces */
import { IUsernamePasswordInput } from "../../interfaces/AuthInterfaces";

/* Styles */
import "./Auth.scss";

/* Graphql Hooks */
import { useSignup, useLoginWithGoogle } from "../../hooks/AuthHooks";

/* Utils */
import { validateEmail, validatePassword } from "./utils";

/* Icons */
import { eyeOutline, eyeOffOutline } from "ionicons/icons";

/* Context */
import { useAppContext } from "../../context/context";
import GoogleAuth from "./GoogleAuth";

/* Validation Interfaces */
interface IIsValid {
  email?: boolean;
  password?: boolean;
  rePassword?: boolean;
}

interface ISignupInput extends IUsernamePasswordInput {
  rePassword: string;
}

const Signup: React.FC = () => {
  const history = useHistory();
  const { setUser } = useAppContext();
  const [signupOptions, setSignupOptions] = useState<ISignupInput>({
    email: "",
    password: "",
    rePassword: "",
  });
  const [isTouched, setIsTouched] = useState<IIsValid>({
    email: undefined,
    password: undefined,
    rePassword: undefined,
  });
  const [isValid, setIsValid] = useState<IIsValid>({
    email: undefined,
    password: undefined,
    rePassword: undefined,
  });
  const [showPass, setShowPass] = useState({
    password: false,
    rePassword: false,
  });

  /** Hooks declaration */
  const { getSignup, loading, data } = useSignup();

  /**
   * Function will validate the inputed email or password
   * @param ev event delivered by ion-input
   * @returns void
   */
  const validateAndSet = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    const label = (ev.target as any).label;

    if (label === "Re-Password") {
      setSignupOptions({ ...signupOptions, rePassword: value }); // set the values to the options object
    } else {
      setSignupOptions({ ...signupOptions, [label.toLowerCase()]: value }); // set the values to the options object
    }

    if (value === "") return; // check to validate an empty value

    // email validation
    if (label === "Email") {
      setIsValid({ ...isValid, email: undefined });
      validateEmail(value) !== null
        ? setIsValid({ ...isValid, email: true })
        : setIsValid({ ...isValid, email: false });
    }

    // password validation
    if (label === "Password") {
      setIsValid({ ...isValid, password: undefined });
      validatePassword(value)
        ? setIsValid({ ...isValid, password: true })
        : setIsValid({ ...isValid, password: false });
    }

    // password validation
    if (label === "Re-Password") {
      setIsValid({ ...isValid, rePassword: undefined });
      validatePassword(value) && value === signupOptions.password
        ? setIsValid({ ...isValid, rePassword: true })
        : setIsValid({ ...isValid, rePassword: false });
    }
  };

  /**
   * Function will mark a field that has been touched
   * @param ev event delivered by ion-input
   */
  const markTouched = (ev: Event) => {
    const label = (ev.target as any).label;

    if (label === "Email") {
      setIsTouched({ ...isTouched, email: true });
    }

    if (label === "Password") {
      setIsTouched({ ...isTouched, password: true });
    }

    if (label === "Re-Password") {
      setIsTouched({ ...isTouched, rePassword: true });
    }
  };

  /**
   * Function handles calling the signup route.
   * @returns void
   */
  const handleSignup = () => {
    if (!signupOptions.email || !signupOptions.password) return; // check for empty values
    if (!isValid.email || !isValid.password || !isValid.rePassword) return; // check the validation

    const { email, password } = signupOptions;
    getSignup({
      variables: {
        options: {
          email,
          password,
        },
      },
    });
  };

  /**
   * Calls after signup has been successfull to get the user
   */
  useEffect(() => {
    if (!data?.register.user?._id) return;
    setUser(data.register.user);
    history.push("/signupupdateuser");
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="auth-form-input">
        <IonInput
          label="Email"
          type="email"
          labelPlacement="floating"
          placeholder="Please enter your email"
          className={`${isValid.email && "ion-valid"} ${
            isValid.email === false && "ion-invalid"
          } ${isTouched.email && "ion-touched"}`}
          errorText="Invalid email format"
          onIonInput={(event) => validateAndSet(event)}
          onIonBlur={(event) => markTouched(event)}
        />
        <IonRow className="password-row">
          <IonCol>
            <IonInput
              label="Password"
              type={showPass.password ? "text" : "password"}
              labelPlacement="floating"
              placeholder="Please enter your password"
              className={`${isValid.password && "ion-valid"} ${
                isValid.password === false && "ion-invalid"
              } ${isTouched.password && "ion-touched"}`}
              errorText="Invalid password format"
              onIonInput={(event) => validateAndSet(event)}
              onIonBlur={(event) => markTouched(event)}
            />
          </IonCol>
          <IonCol size="auto">
            <IonButton
              className="passoword-button"
              fill="clear"
              color="dark"
              onClick={() =>
                setShowPass({ ...showPass, password: !showPass.password })
              }
            >
              <IonIcon icon={showPass.password ? eyeOffOutline : eyeOutline} />
            </IonButton>
          </IonCol>
        </IonRow>

        <IonRow className="password-row">
          <IonCol>
            <IonInput
              label="Re-Password"
              type={showPass.rePassword ? "text" : "password"}
              labelPlacement="floating"
              placeholder="Please enter your password again"
              className={`${isValid.rePassword && "ion-valid"} ${
                isValid.rePassword === false && "ion-invalid"
              } ${isTouched.rePassword && "ion-touched"}`}
              errorText="Password does not patch"
              onIonInput={(event) => validateAndSet(event)}
              onIonBlur={(event) => markTouched(event)}
            />
          </IonCol>
          <IonCol size="auto">
            <IonButton
              className="passoword-button"
              fill="clear"
              color="dark"
              onClick={() =>
                setShowPass({ ...showPass, rePassword: !showPass.rePassword })
              }
            >
              <IonIcon
                icon={showPass.rePassword ? eyeOffOutline : eyeOutline}
              />
            </IonButton>
          </IonCol>
        </IonRow>

        {/* Server error messages */}
        {data?.register.errors ? (
          <IonText color="danger">{data?.register.errors[0].message}</IonText>
        ) : null}
      </div>
      <div className="auth-form-submit">
        {/* Sign up button */}
        <IonButton
          shape="round"
          onClick={handleSignup}
          color={!data ? "primary" : "success"}
        >
          {!loading && !data ? (
            "Continue"
          ) : loading && !data ? (
            <IonSpinner />
          ) : (
            "Success"
          )}
        </IonButton>
        {/* Go to login */}
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
        <GoogleAuth />
      </div>
    </>
  );
};

export default Signup;
