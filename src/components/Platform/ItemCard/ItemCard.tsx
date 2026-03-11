import React, { ReactNode } from "react";
import { IonCard, IonCardContent, IonIcon, IonBadge, IonButton } from "@ionic/react";
import { create, trash } from "ionicons/icons";
import Highlighter from "react-highlight-words";
import "./ItemCard.scss";

export interface ItemCardAction {
  icon: string;
  color?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger";
  onClick: (e: React.MouseEvent) => void;
  hidden?: boolean;
}

export interface ItemCardBadge {
  text: string | number;
  color?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "medium";
}

export interface ItemCardProps {
  icon: string;
  iconClassName?: string;
  title: string;
  subtitle?: string;
  badges?: ItemCardBadge[];
  metadata?: ReactNode;
  onEdit?: (e: React.MouseEvent) => void;
  onDelete?: (e: React.MouseEvent) => void;
  customActions?: ItemCardAction[];
  onClick?: () => void;
  isDeleting?: boolean;
  className?: string;
  color?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger";
  /** Words to highlight in title and subtitle */
  searchWords?: string[];
}

export const ItemCard: React.FC<ItemCardProps> = ({
  icon,
  iconClassName = "",
  title,
  subtitle,
  badges = [],
  metadata,
  onEdit,
  onDelete,
  customActions,
  onClick,
  isDeleting = false,
  className = "",
  color = "primary",
  searchWords = [],
}) => {
  const activeSearchWords = searchWords.filter(Boolean);
  const handleCardClick = () => {
    if (!isDeleting && onClick) {
      onClick();
    }
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const hasActions = onEdit || onDelete || (customActions && customActions.length > 0);

  return (
    <IonCard
      className={`item-card item-card--${color} ${isDeleting ? "deleting" : ""} ${className}`}
      onClick={handleCardClick}
      button={!isDeleting && !!onClick}
    >
      <IonCardContent>
        <div className="item-card__header">
          <IonIcon icon={icon} className={`item-card__icon ${iconClassName}`} />
          <div className="item-card__badges">
            {badges.map((badge, index) => (
              <IonBadge key={index} color={badge.color || "primary"}>
                {badge.text}
              </IonBadge>
            ))}
          </div>
        </div>

        <h3 className="item-card__title">
          {activeSearchWords.length > 0 ? (
            <Highlighter
              searchWords={activeSearchWords}
              autoEscape
              textToHighlight={title}
              highlightClassName="item-card__highlight"
            />
          ) : title}
        </h3>
        {subtitle && (
          <p className="item-card__subtitle">
            {activeSearchWords.length > 0 ? (
              <Highlighter
                searchWords={activeSearchWords}
                autoEscape
                textToHighlight={subtitle}
                highlightClassName="item-card__highlight"
              />
            ) : subtitle}
          </p>
        )}

        {metadata && <div className="item-card__metadata">{metadata}</div>}

        {hasActions && (
          <div className="item-card__actions" onClick={stopPropagation}>
            {customActions?.map((action, index) => (
              !action.hidden && (
                <IonButton
                  key={index}
                  fill="clear"
                  size="small"
                  shape="round"
                  color={action.color || "primary"}
                  disabled={isDeleting}
                  onClick={(e) => {
                    stopPropagation(e);
                    action.onClick(e);
                  }}
                >
                  <IonIcon slot="icon-only" icon={action.icon} />
                </IonButton>
              )
            ))}
            {onEdit && (
              <IonButton
                fill="clear"
                size="small"
                shape="round"
                color="primary"
                disabled={isDeleting}
                onClick={(e) => {
                  stopPropagation(e);
                  onEdit(e);
                }}
              >
                <IonIcon slot="icon-only" icon={create} />
              </IonButton>
            )}
            {onDelete && (
              <IonButton
                fill="clear"
                size="small"
                shape="round"
                color="danger"
                disabled={isDeleting}
                onClick={(e) => {
                  stopPropagation(e);
                  onDelete(e);
                }}
              >
                <IonIcon slot="icon-only" icon={trash} />
              </IonButton>
            )}
          </div>
        )}
      </IonCardContent>
    </IonCard>
  );
};
