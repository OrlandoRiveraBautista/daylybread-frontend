import React from "react";
import { IonIcon, IonText } from "@ionic/react";

import "./EmptyState.scss";

interface IEmptyState {
  /** The ionicon to display */
  icon: string;
  /** The heading text */
  title: string;
  /** The description/subtitle text */
  description: string;
  /** Optional custom icon size (default: 64px) */
  iconSize?: string;
  /** Optional action button or additional content */
  children?: React.ReactNode;
}

const EmptyState: React.FC<IEmptyState> = ({
  icon,
  title,
  description,
  iconSize = "64px",
  children,
}) => {
  return (
    <div className="empty-state">
      <IonIcon
        icon={icon}
        className="empty-state__icon"
        style={{ fontSize: iconSize }}
      />
      <IonText className="empty-state__content">
        <h2 className="empty-state__title">{title}</h2>
        <p className="empty-state__description">{description}</p>
      </IonText>
      {children && <div className="empty-state__actions">{children}</div>}
    </div>
  );
};

export default EmptyState;
