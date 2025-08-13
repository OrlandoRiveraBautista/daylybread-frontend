import React from "react";
import { IonChip } from "@ionic/react";
import { MoodOption } from "../hooks/useMoodCheckIn";
import MoodLoadingAnimation from "./MoodLoadingAnimation";
import "./MoodSelector.scss";

interface MoodSelectorProps {
  moodOptions: MoodOption[];
  onMoodSelect: (mood: MoodOption) => void;
  isLoading: boolean;
  disabled?: boolean;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({
  moodOptions,
  onMoodSelect,
  isLoading,
  disabled = false,
}) => {
  if (isLoading) {
    return <MoodLoadingAnimation />;
  }

  return (
    <div className="mood-options">
      {moodOptions.map((mood, index) => (
        <IonChip
          key={index}
          className={`mood-chip chip-${mood.color}`}
          onClick={() => onMoodSelect(mood)}
          disabled={disabled}
        >
          <span className="mood-emoji">{mood.emoji}</span>
          <span className="mood-label">{mood.label}</span>
        </IonChip>
      ))}
    </div>
  );
};

export default MoodSelector;
