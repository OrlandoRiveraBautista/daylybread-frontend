import React from "react";
import { IonButton, IonIcon, IonSpinner, IonChip } from "@ionic/react";
import {
  sparkles,
  chevronDown,
  chevronUp,
  stopCircleOutline,
} from "ionicons/icons";
import { AIBreadcrumbsBarProps } from "../types";
import { AI_PROMPT_CATEGORIES } from "../constants";

export const AIBreadcrumbsBar: React.FC<AIBreadcrumbsBarProps> = ({
  isExpanded,
  isGenerating,
  onToggle,
  onSuggestionClick,
  onStopGeneration,
}) => {
  return (
    <div
      className={`ai-breadcrumbs-bar ${isExpanded ? "expanded" : "collapsed"} ${isGenerating ? "generating" : ""}`}
    >
      <div
        className="ai-bar-header"
        onClick={() => !isGenerating && onToggle()}
      >
        <div className="ai-bar-title">
          <IonIcon icon={sparkles} />
          <span>AI Writing Assistant</span>
          {isGenerating && (
            <>
              <IonSpinner name="dots" className="ai-spinner" />
              <span className="generating-text">Writing...</span>
            </>
          )}
        </div>
        {isGenerating ? (
          <IonButton
            fill="clear"
            size="small"
            shape="round"
            color="danger"
            onClick={(e) => {
              e.stopPropagation();
              onStopGeneration();
            }}
            className="stop-button"
          >
            <IonIcon icon={stopCircleOutline} />
            <span>Stop</span>
          </IonButton>
        ) : (
          <IonIcon
            icon={isExpanded ? chevronUp : chevronDown}
            className="toggle-icon"
          />
        )}
      </div>

      {isExpanded && !isGenerating && (
        <div className="ai-bar-content">
          {/* Quick Suggestions */}
          <div className="quick-suggestions-label">Quick suggestions:</div>
          {AI_PROMPT_CATEGORIES.map((category) => (
            <div key={category.category} className="ai-category">
              <div className="category-header">
                <IonIcon icon={category.icon} />
                <span>{category.category}</span>
              </div>
              <div className="category-suggestions">
                {category.suggestions.map((suggestion, index) => (
                  <IonChip
                    key={index}
                    className="suggestion-chip"
                    onClick={() => onSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </IonChip>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
