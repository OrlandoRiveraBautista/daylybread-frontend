import React from "react";
import "../../../pages/Platform/Platform/Platform.scss";

export interface PlatformFormProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper that applies platform glass form field styles to child IonItems.
 */
export const PlatformForm: React.FC<PlatformFormProps> = ({
  children,
  className,
}) => {
  return (
    <div className="platform-form-container">
      <div className={["platform-form", className].filter(Boolean).join(" ")}>
        {children}
      </div>
    </div>
  );
};

export default PlatformForm;
