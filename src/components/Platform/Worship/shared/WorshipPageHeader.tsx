import React from "react";
import { add } from "ionicons/icons";
import { PageHeader } from "../../PageHeader";

interface WorshipPageHeaderProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  actionLabel?: string;
  actionIcon?: string;
  onAction?: () => void;
  showAction?: boolean;
  actionColor?: string;
  rightSlot?: React.ReactNode;
  /** @deprecated classPrefix is no longer needed — styles come from PageHeader */
  classPrefix?: string;
}

/**
 * Thin wrapper around PageHeader for worship management list pages.
 * Keeps the existing call-sites working without changes.
 */
export const WorshipPageHeader: React.FC<WorshipPageHeaderProps> = ({
  title,
  subtitle,
  onBack,
  actionLabel,
  actionIcon = add,
  onAction,
  showAction = true,
  actionColor = "primary",
  rightSlot,
}) => (
  <PageHeader
    title={title}
    subtitle={subtitle}
    onBack={onBack}
    rightSlot={rightSlot}
    actions={
      showAction && actionLabel && onAction
        ? [{ label: actionLabel, icon: actionIcon, color: actionColor, onClick: onAction }]
        : []
    }
  />
);
