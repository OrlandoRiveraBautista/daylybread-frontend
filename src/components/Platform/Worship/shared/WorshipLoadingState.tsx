import React from "react";
import { IonSpinner } from "@ionic/react";

interface WorshipLoadingStateProps {
  message?: string;
  className?: string;
}

export const WorshipLoadingState: React.FC<WorshipLoadingStateProps> = ({
  message = "Loading...",
  className,
}) => (
  <div className={`loading-state${className ? ` ${className}` : ""}`}>
    <IonSpinner name="crescent" />
    <p>{message}</p>
  </div>
);
