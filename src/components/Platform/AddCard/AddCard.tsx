import React from "react";
import { IonCard, IonCardContent, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import "./AddCard.scss";

export interface AddCardProps {
  label: string;
  onClick: () => void;
  color?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger";
  size?: "small" | "medium" | "large";
  className?: string;
}

export const AddCard: React.FC<AddCardProps> = ({
  label,
  onClick,
  color = "primary",
  size = "medium",
  className = "",
}) => {
  return (
    <IonCard
      className={`add-card add-card--${color} add-card--${size} ${className}`}
      onClick={onClick}
      button
    >
      <IonCardContent>
        <div className="add-card__content">
          <IonIcon icon={add} className="add-card__icon" />
          <span className="add-card__label">{label}</span>
        </div>
      </IonCardContent>
    </IonCard>
  );
};
