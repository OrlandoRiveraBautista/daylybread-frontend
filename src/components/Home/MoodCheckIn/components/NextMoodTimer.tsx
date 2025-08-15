import React, { useState, useEffect } from "react";
import { IonText, IonIcon } from "@ionic/react";
import { timeOutline, checkmarkCircleOutline } from "ionicons/icons";
import "./NextMoodTimer.scss";

interface NextMoodTimerProps {
  nextRequestAllowed?: string | Date | null;
  className?: string;
}

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
  isReady: boolean;
}

const NextMoodTimer: React.FC<NextMoodTimerProps> = ({
  nextRequestAllowed,
  className = "",
}) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isReady: true,
  });

  useEffect(() => {
    if (!nextRequestAllowed) {
      setTimeRemaining({ hours: 0, minutes: 0, seconds: 0, isReady: true });
      return;
    }

    const updateTimer = () => {
      const now = new Date().getTime();

      // Parse the target time more robustly
      let targetTime: number;
      try {
        if (typeof nextRequestAllowed === "string") {
          targetTime = new Date(nextRequestAllowed).getTime();
        } else {
          targetTime = new Date(nextRequestAllowed).getTime();
        }

        // Check if the parsed date is valid
        if (isNaN(targetTime)) {
          console.warn("Invalid nextRequestAllowed date:", nextRequestAllowed);
          setTimeRemaining({ hours: 0, minutes: 0, seconds: 0, isReady: true });
          return;
        }
      } catch (error) {
        console.warn(
          "Error parsing nextRequestAllowed date:",
          nextRequestAllowed,
          error
        );
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0, isReady: true });
        return;
      }

      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0, isReady: true });
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ hours, minutes, seconds, isReady: false });
    };

    // Update immediately
    updateTimer();

    // Set up interval to update every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [nextRequestAllowed]);

  // Don't render if no next request time is set
  if (!nextRequestAllowed) {
    return null;
  }

  // If ready, show a subtle ready indicator
  if (timeRemaining.isReady) {
    return (
      <div className={`next-mood-timer ready ${className}`}>
        <IonIcon
          icon={checkmarkCircleOutline}
          className="timer-icon ready-icon"
        />
        <IonText className="timer-text ready-text">
          <span>Ready for next check-in</span>
        </IonText>
      </div>
    );
  }

  // Format time display
  const formatTime = () => {
    const { hours, minutes, seconds } = timeRemaining;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  return (
    <div className={`next-mood-timer waiting ${className}`}>
      <IonIcon icon={timeOutline} className="timer-icon waiting-icon" />
      <IonText className="timer-text waiting-text">
        <span className="timer-label">Next check-in in</span>
        <span className="timer-value">{formatTime()}</span>
      </IonText>
    </div>
  );
};

export default NextMoodTimer;
