import React from "react";
import { IonIcon, IonSpinner } from "@ionic/react";
import { sparkles, sendOutline } from "ionicons/icons";
import { FloatingAIBarProps } from "../types";

export const FloatingAIBar: React.FC<FloatingAIBarProps> = ({
  show,
  position,
  prompt,
  isGenerating,
  onPromptChange,
  onSubmit,
  inputRef,
}) => {
  if (!show) return null;

  return (
    <div
      className="floating-ai-bar"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <IonIcon icon={sparkles} className="sparkle-icon" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Ask BreadCrumbs..."
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
          }
        }}
        disabled={isGenerating}
        className="floating-input"
      />
      {isGenerating ? (
        <IonSpinner name="dots" className="floating-spinner" />
      ) : (
        <button
          onClick={onSubmit}
          disabled={!prompt.trim()}
          className="floating-send-btn"
        >
          <IonIcon icon={sendOutline} />
        </button>
      )}
    </div>
  );
};
