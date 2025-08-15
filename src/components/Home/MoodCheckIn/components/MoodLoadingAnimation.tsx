import React from "react";
import "./MoodLoadingAnimation.scss";

interface MoodLoadingAnimationProps {
  message?: string;
}

const MoodLoadingAnimation: React.FC<MoodLoadingAnimationProps> = ({
  message = "Finding your verse...",
}) => {
  return (
    <div className="mood-loading-container">
      <div className="mood-loading-spinner">
        <div className="loading-ring"></div>
        <div className="loading-ring"></div>
        <div className="loading-ring"></div>
      </div>
      <p className="mood-loading-text">{message}</p>
    </div>
  );
};

export default MoodLoadingAnimation;
