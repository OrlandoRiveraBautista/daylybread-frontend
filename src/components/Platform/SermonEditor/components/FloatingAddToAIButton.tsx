import React from "react";
import { IonIcon } from "@ionic/react";
import { sparklesOutline } from "ionicons/icons";

interface FloatingAddToAIButtonProps {
  show: boolean;
  position: { x: number; y: number };
  onAddToAI: () => void;
}

export const FloatingAddToAIButton: React.FC<FloatingAddToAIButtonProps> = ({
  show,
  position,
  onAddToAI,
}) => {
  if (!show) return null;

  return (
    <button
      className="floating-add-to-ai-btn"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onClick={onAddToAI}
      title="Add selection to AI context"
    >
      <IonIcon icon={sparklesOutline} />
      <span>Add to AI Chat</span>
    </button>
  );
};
