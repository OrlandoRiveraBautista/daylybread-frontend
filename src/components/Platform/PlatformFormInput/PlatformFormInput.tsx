import React, { ComponentProps } from "react";
import { IonItem, IonLabel, IonInput } from "@ionic/react";
import "../../../pages/Platform/Platform/Platform.scss";

type IonInputProps = ComponentProps<typeof IonInput>;

export interface PlatformFormInputProps {
  /** Stacked label above the input */
  label: string;
  value?: string | null;
  placeholder?: string;
  type?: IonInputProps["type"];
  disabled?: boolean;
  clearInput?: boolean;
  /** Prefer onIonInput for live updates while typing */
  onIonInput?: IonInputProps["onIonInput"];
  onIonChange?: IonInputProps["onIonChange"];
  /** Optional class on the wrapping IonItem */
  className?: string;
  /** Forwarded to the native input for autofocus / a11y */
  autocapitalize?: IonInputProps["autocapitalize"];
  autocomplete?: IonInputProps["autocomplete"];
  inputmode?: IonInputProps["inputmode"];
  maxlength?: number;
}

/**
 * Glass-styled platform text input with stacked label.
 * Use inside a PlatformForm (or any .platform-form container).
 */
export const PlatformFormInput: React.FC<PlatformFormInputProps> = ({
  label,
  value,
  placeholder,
  type = "text",
  disabled,
  clearInput,
  onIonInput,
  onIonChange,
  className,
  autocapitalize,
  autocomplete,
  inputmode,
  maxlength,
}) => {
  return (
    <IonItem className={className}>
      <IonLabel position="stacked">{label}</IonLabel>
      <IonInput
        value={value ?? ""}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        clearInput={clearInput}
        onIonInput={onIonInput}
        onIonChange={onIonChange}
        autocapitalize={autocapitalize}
        autocomplete={autocomplete}
        inputmode={inputmode}
        maxlength={maxlength}
      />
    </IonItem>
  );
};

export default PlatformFormInput;
