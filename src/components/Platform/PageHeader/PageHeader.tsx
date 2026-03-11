import React from "react";
import { IonButton, IonIcon, IonBadge, IonSpinner } from "@ionic/react";
import { arrowBack, add } from "ionicons/icons";
import "./PageHeader.scss";

export interface PageHeaderAction {
  /** Button label text */
  label: string;
  /** Ionicons icon string. Defaults to add icon. */
  icon?: string;
  /** Ionic color token. Defaults to "primary". */
  color?: string;
  /** Fill style. Defaults to "solid". */
  fill?: "solid" | "outline" | "clear";
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export interface PageHeaderBadge {
  label: string;
  /** Ionic color token */
  color?: string;
}

export interface PageHeaderProps {
  /** Main heading */
  title: string;
  /** Optional secondary line below the title */
  subtitle?: string;
  /**
   * Renders a back-arrow button. Pass a callback to handle navigation.
   * If omitted, no back button is shown (e.g. dashboard root pages).
   */
  onBack?: () => void;
  /**
   * One or more action buttons rendered in the right slot.
   * Rendered in order — last item is the primary CTA.
   */
  actions?: PageHeaderAction[];
  /** Status / info badges rendered before the action buttons */
  badges?: PageHeaderBadge[];
  /** Arbitrary extra content in the right slot (e.g. a zen-mode toggle) */
  rightSlot?: React.ReactNode;
  /**
   * Extra content rendered below the title row (e.g. a meta-info line with
   * date, time, team name).
   */
  metaSlot?: React.ReactNode;
  /** Additional className on the root element */
  className?: string;
  /**
   * Visual variant.
   * - "page"  (default) — full-width page header with large title
   * - "section" — compact header for in-page sections
   */
  variant?: "page" | "section";
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  onBack,
  actions = [],
  badges = [],
  rightSlot,
  metaSlot,
  className = "",
  variant = "page",
}) => {
  const hasRight = actions.length > 0 || badges.length > 0 || rightSlot;

  return (
    <div
      className={`page-header page-header--${variant} ${className}`.trim()}
      role="banner"
    >
      {/* ── Left: back button + title block ── */}
      <div className="page-header__left">
        {onBack && (
          <IonButton
            className="page-header__back"
            fill="clear"
            size="small"
            shape="round"
            onClick={onBack}
            aria-label="Go back"
          >
            <IonIcon slot="icon-only" icon={arrowBack} />
          </IonButton>
        )}

        <div className="page-header__title-block">
          <h1 className="page-header__title">{title}</h1>
          {subtitle && (
            <p className="page-header__subtitle">{subtitle}</p>
          )}
          {metaSlot && (
            <div className="page-header__meta">{metaSlot}</div>
          )}
        </div>
      </div>

      {/* ── Right: badges + action buttons + custom slot ── */}
      {hasRight && (
        <div className="page-header__right">
          {badges.map((badge, i) => (
            <IonBadge
              key={i}
              color={badge.color ?? "medium"}
              className="page-header__badge"
            >
              {badge.label}
            </IonBadge>
          ))}

          {rightSlot}

          {actions.map((action, i) => (
            <IonButton
              key={i}
              fill={action.fill ?? "solid"}
              shape="round"
              color={action.color ?? "primary"}
              onClick={action.onClick}
              disabled={action.disabled || action.loading}
              className="page-header__action"
            >
              {action.loading ? (
                <IonSpinner slot="start" name="crescent" />
              ) : (
                <IonIcon slot="start" icon={action.icon ?? add} />
              )}
              {action.label}
            </IonButton>
          ))}
        </div>
      )}
    </div>
  );
};
