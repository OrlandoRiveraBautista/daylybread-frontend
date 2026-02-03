import React from "react";
import { IonIcon, IonSpinner } from "@ionic/react";
import { sparkles, sendOutline, closeOutline, text } from "ionicons/icons";
import { StaticAIPromptBarProps } from "../types";

export const StaticAIPromptBar: React.FC<StaticAIPromptBarProps> = ({
  prompt,
  isGenerating,
  onPromptChange,
  onSubmit,
  inputRef,
  selectedText,
  onClearSelection,
}) => {
  const getPlaceholder = () => {
    if (selectedText) {
      return "What would you like me to do with this text?";
    }
    return "Ask AI to write, edit, or improve anything...";
  };

  return (
    <div className="static-ai-prompt-bar">
      <div className="static-prompt-content">
        <IonIcon icon={sparkles} className="static-sparkle-icon" />
        
        {selectedText && (
          <div className="selection-indicator">
            <IonIcon icon={text} className="selection-icon" />
            <span className="selection-text">
              "{selectedText.substring(0, 50)}
              {selectedText.length > 50 ? "..." : ""}"
            </span>
            <button
              onClick={onClearSelection}
              className="clear-selection-btn"
              aria-label="Clear selection"
              title="Clear selection"
            >
              <IonIcon icon={closeOutline} />
            </button>
          </div>
        )}

        <div className="input-row">
          <input
            ref={inputRef}
            type="text"
            placeholder={getPlaceholder()}
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSubmit();
              }
            }}
            disabled={isGenerating}
            className="static-prompt-input"
          />
          {isGenerating ? (
            <div className="static-generating-indicator">
              <IonSpinner name="dots" />
              <span>Writing...</span>
            </div>
          ) : (
            <button
              onClick={onSubmit}
              disabled={!prompt.trim()}
              className="static-send-btn"
            >
              <IonIcon icon={sendOutline} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
