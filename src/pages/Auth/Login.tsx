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
import { useLogin } from "../../hooks/AuthHooks";

/* Utils */
import { validateEmail, validatePassword } from "./utils";

/* Icons */
import { eyeOutline, eyeOffOutline } from "ionicons/icons";

/* Context */
import { useAppContext } from "../../context/context";

/* Validation Interfaces */
interface IIsValid {
  email?: boolean;
  password?: boolean;
}

const Login: React.FC = () => {
  const history = useHistory();
  const { setUser } = useAppContext();
  const [loginOptions, setLoginOptions] = useState<IUsernamePasswordInput>({
    email: "",
    password: "",
  });
  const [isTouched, setIsTouched] = useState<IIsValid>({
    email: undefined,
    password: undefined,
  });
  const [isValid, setIsValid] = useState<IIsValid>({
    email: undefined,
    password: undefined,
  });
  const [showPass, setShowPass] = useState<boolean>(false);

  /** Hooks declaration */
  const { getLogin, loading, data } = useLogin();

  /**
   * Function will validate the inputed email or password
   * @param ev event delivered by ion-input
   * @returns void
   */
  const validateAndSet = (ev: Event) => {
    const type = (ev.target as HTMLInputElement).type;
    const value = (ev.target as HTMLInputElement).value;

    setLoginOptions({ ...loginOptions, [type]: value }); // set the values to the options object

    if (value === "") return; // check to validate an empty value

    // email validation
    if (type === "email") {
      setIsValid({ ...isValid, email: undefined });
      validateEmail(value) !== null
        ? setIsValid({ ...isValid, email: true })
        : setIsValid({ ...isValid, email: false });
    }

    // password validation
    if (type === "password") {
      setIsValid({ ...isValid, password: undefined });
      validatePassword(value)
        ? setIsValid({ ...isValid, password: true })
        : setIsValid({ ...isValid, password: false });
    }
  };

  /**
   * Function will mark a field that has been touched
   * @param ev event delivered by ion-input
   */
  const markTouched = (ev: Event) => {
    const type = (ev.target as HTMLInputElement).type;

    if (type === "email") {
      setIsTouched({ ...isTouched, email: true });
    }

    if (type === "password") {
      setIsTouched({ ...isTouched, password: true });
    }
  };

  /**
   * Function handles calling the login route.
   * @returns void
   */
  const handleLogin = () => {
    if (!loginOptions.email || !loginOptions.password) return;
    if (!isValid.email || !isValid.password) return; // check the validation

    getLogin({
      variables: {
        options: { email: "someemail@email.com", password: "somepass123" },
      },
    });
  };

  /**
   * Calls after login has been successfull to get the user
   */
  useEffect(() => {
    if (!data?.login.user?._id) return;
    setUser(data.login.user);
    history.push("/me");
  }, [data]);

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
              type={showPass ? "text" : "password"}
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
              onClick={() => setShowPass(!showPass)}
            >
              <IonIcon icon={showPass ? eyeOffOutline : eyeOutline} />
            </IonButton>
          </IonCol>
        </IonRow>

        {/* Server error messages */}
        {data?.login.errors ? (
          <IonText color="danger">{data?.login.errors[0].message}</IonText>
        ) : null}
      </div>
      <div className="auth-form-submit">
        <IonButton
          shape="round"
          onClick={handleLogin}
          color={!data ? "primary" : "success"}
        >
          {!loading && !data ? (
            "Login"
          ) : loading && !data ? (
            <IonSpinner />
          ) : (
            "Success"
          )}
        </IonButton>
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
      </div>
    </>
  );
};

export default Login;
