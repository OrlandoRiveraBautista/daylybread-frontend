import React from "react";
import { IonCard, IonCardContent, IonIcon, IonButton } from "@ionic/react";
import { add } from "ionicons/icons";

import "./EmptyState.scss";

export type EmptyStateColor = "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "medium";

interface IEmptyState {
  /** The ionicon to display */
  icon: string;
  /** The heading text */
  title: string;
  /** The description/subtitle text */
  description: string;
  /** Accent color applied to the icon, glow, and action button. Defaults to "primary". */
  color?: EmptyStateColor;
  /** Optional custom icon size (default: 80px) */
  iconSize?: string;
  /** Label for the primary action button */
  actionLabel?: string;
  /** Icon for the action button (defaults to add) */
  actionIcon?: string;
  /** Callback for the primary action button */
  onAction?: () => void;
  /** Render inside a glassmorphism card. Defaults to true. */
  card?: boolean;
  /** Optional action button or additional content rendered below the description */
  children?: React.ReactNode;
}

const EmptyState: React.FC<IEmptyState> = ({
  icon,
  title,
  description,
  color = "primary",
  iconSize = "80px",
  actionLabel,
  actionIcon,
  onAction,
  card = true,
  children,
}) => {
  const content = (
    <div className={`empty-state empty-state--${color}`}>
      <div className="empty-state__icon-wrapper">
        <IonIcon
          icon={icon}
          className="empty-state__icon"
          style={{ fontSize: iconSize }}
        />
      </div>
      <h2 className="empty-state__title">{title}</h2>
      <p className="empty-state__description">{description}</p>
      {actionLabel && onAction && (
        <IonButton
          size="large"
          fill="solid"
          shape="round"
          color={color}
          onClick={onAction}
          className="empty-state__action"
        >
          <IonIcon slot="start" icon={actionIcon ?? add} />
          {actionLabel}
        </IonButton>
      )}
      {children && <div className="empty-state__children">{children}</div>}
    </div>
  );

  if (!card) return content;

  return (
    <div className="empty-state-container">
      <IonCard className="empty-state-card">
        <IonCardContent>{content}</IonCardContent>
      </IonCard>
    </div>
  );
};

export default EmptyState;
