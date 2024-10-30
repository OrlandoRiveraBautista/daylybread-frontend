import React, { useEffect, useState } from "react";
import { IonInput, IonButton, IonText, IonSpinner } from "@ionic/react";
import { useHistory } from "react-router";

/* Interfaces */

/* Styles */
import "./Auth.scss";

/* Graphql Hooks */
import { useUserUpdate } from "../../hooks/UserHooks";

/* Context */
import { useAppContext } from "../../context/context";

/* Validation Interfaces */
interface IIsValid {
  firstName?: boolean;
  lastName?: boolean;
  churchName?: boolean;
  dob?: boolean;
}

interface IUpdateInput {
  firstName: string;
  lastName: string;
  churchName?: string;
  dob: Date | undefined;
}

const UpdateUserAfterSignup: React.FC = () => {
  const history = useHistory();
  const { setUser, userInfo } = useAppContext();
  const [updateOptions, setUpdateOptions] = useState<IUpdateInput>({
    firstName: userInfo?.firstName!,
    lastName: userInfo?.lastName!,
    churchName: undefined,
    dob: undefined,
  });
  const [isValid, setIsValid] = useState<IIsValid>({
    firstName: undefined,
    lastName: undefined,
    churchName: undefined,
    dob: undefined,
  });
  const [isTouched, setIsTouched] = useState<IIsValid>({
    firstName: undefined,
    lastName: undefined,
    churchName: undefined,
    dob: undefined,
  });

  /** Hooks declaration */
  const { setUserUpdate, loading, data } = useUserUpdate();

  /**
   * Function will validate the inputed fiields
   * @param ev event delivered by ion-input
   * @returns void
   */
  const validateAndSet = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    const type = (ev.target as any).is;

    setUpdateOptions((prev) => ({ ...prev, [type]: value })); // set the values to the options object

    // email validation
    setIsValid((prev) => ({ ...prev, [type]: undefined }));
    if (!value || value === "") {
      setIsValid((prev) => ({ ...prev, [type]: false }));
    } else {
      setIsValid((prev) => ({ ...prev, [type]: true }));
    }
  };

  /**
   * Function will mark a field that has been touched
   * @param ev event delivered by ion-input
   */
  const markTouched = (ev: Event) => {
    const type = (ev.target as any).is;

    setIsTouched({ ...isTouched, [type]: true });
  };

  /**
   * Function handles calling the signup route.
   * @returns void
   */
  const handleUpdate = () => {
    if (
      !updateOptions.firstName ||
      !updateOptions.lastName ||
      !updateOptions.dob
    )
      return; // check for empty values
    if (!isValid.firstName || !isValid.lastName || !isValid.dob) return; // check the validation
    setUserUpdate({
      variables: {
        options: updateOptions,
      },
    });
  };

  /**
   * Calls after signup has been successfull to get the user
   */
  useEffect(() => {
    if (!data?.updateUser.user?._id) return;
    setUser(data.updateUser.user);
    history.push("/me");
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="auth-form-input">
        <IonInput
          label="First Name"
          type="text"
          labelPlacement="floating"
          placeholder="Please enter your first name"
          is="firstName"
          className={`${isValid.firstName && "ion-valid"} ${
            isValid.firstName === false && "ion-invalid"
          } ${isTouched.firstName && "ion-touched"}`}
          errorText="Please enter your first name"
          onIonInput={(event) => validateAndSet(event)}
          onIonBlur={(event) => markTouched(event)}
          value={updateOptions.firstName}
        />
        <IonInput
          label="Last Name"
          type="text"
          labelPlacement="floating"
          placeholder="Please enter your last name"
          is="lastName"
          className={`${isValid.lastName && "ion-valid"} ${
            isValid.lastName === false && "ion-invalid"
          } ${isTouched.lastName && "ion-touched"}`}
          errorText="Please enter your last name"
          onIonInput={(event) => validateAndSet(event)}
          onIonBlur={(event) => markTouched(event)}
          value={updateOptions.lastName}
        />
        <IonInput
          label="Church Name (optional)"
          type="text"
          labelPlacement="floating"
          placeholder="Please enter your church name"
          is="churchName"
          onIonInput={(event) => validateAndSet(event)}
        />

        <IonInput
          label="Birthday"
          type="date"
          labelPlacement="floating"
          placeholder="Please enter your birthday"
          id="datetime"
          is="dob"
          className={`${isValid.dob && "ion-valid"} ${
            isValid.dob === false && "ion-invalid"
          } ${isTouched.dob && "ion-touched"}`}
          errorText="Please enter your birthday"
          onIonInput={(event) => validateAndSet(event)}
          onIonBlur={(event) => markTouched(event)}
        />

        {/* Server error messages */}
        {data?.updateUser.errors ? (
          <IonText color="danger">{data?.updateUser.errors[0].message}</IonText>
        ) : null}
      </div>
      <div className="auth-form-submit">
        <IonButton
          shape="round"
          onClick={handleUpdate}
          color={!data ? "primary" : "success"}
        >
          {!loading && !data ? (
            "Finish"
          ) : loading && !data ? (
            <IonSpinner />
          ) : (
            "Success"
          )}
        </IonButton>
      </div>
    </>
  );
};

export default UpdateUserAfterSignup;
