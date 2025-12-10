import React, { useRef, useState } from "react";
import {
  IonModal,
  IonContent,
  IonTitle,
  IonRow,
  IonText,
  IonCol,
  IonButton,
  IonIcon,
  IonCheckbox,
} from "@ionic/react";
import { notificationsOutline, sparkles } from "ionicons/icons";

/* Styles */
import "./NotificationPromptModal.scss";

/* Interfaces */
interface INotificationPromptModal {
  isOpen: boolean;
  onDismiss: (permanent?: boolean) => void;
  onRequestPermission: () => Promise<boolean>;
}

const NotificationPromptModal: React.FC<INotificationPromptModal> = ({
  isOpen,
  onDismiss,
  onRequestPermission,
}) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [dontAskAgain, setDontAskAgain] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  const handleEnable = async () => {
    setIsRequesting(true);
    try {
      const granted = await onRequestPermission();
      if (granted) {
        modal.current?.dismiss();
      }
    } finally {
      setIsRequesting(false);
    }
  };

  const handleDismiss = () => {
    modal.current?.dismiss();
    onDismiss(dontAskAgain);
  };

  const handleModalDismiss = () => {
    onDismiss(dontAskAgain);
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={handleModalDismiss}
      initialBreakpoint={0.75}
      breakpoints={[0, 0.75]}
      ref={modal}
    >
      <IonContent className="ion-padding">
        {/* Decorative Icon */}
        <div className="notification-icon-container">
          <div className="icon-background">
            <IonIcon
              icon={notificationsOutline}
              className="notification-icon"
            />
          </div>
          <IonIcon icon={sparkles} className="sparkle-icon sparkle-1" />
          <IonIcon icon={sparkles} className="sparkle-icon sparkle-2" />
        </div>

        <IonTitle className="ion-text-center modal-title">
          Stay Connected
        </IonTitle>

        <div className="notification-text">
          <IonRow>
            <IonCol>
              <IonText>
                <p className="main-text">
                  Enable notifications to receive daily Bible verses, mood
                  check-ins, and spiritual encouragement right when you need it
                  most.
                </p>
              </IonText>
            </IonCol>
          </IonRow>

          <div className="benefits-list">
            <div className="benefit-item">
              <span className="benefit-emoji">📖</span>
              <span className="benefit-text">Daily verse reminders</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-emoji">💭</span>
              <span className="benefit-text">Personalized check-ins</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-emoji">✨</span>
              <span className="benefit-text">Spiritual encouragement</span>
            </div>
          </div>
        </div>

        <div className="notification-actions">
          <IonRow>
            <IonCol>
              <IonButton
                shape="round"
                fill="solid"
                color="primary"
                onClick={handleEnable}
                className="enable-button"
                disabled={isRequesting}
              >
                {isRequesting ? "Enabling..." : "Enable Notifications"}
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton
                shape="round"
                fill="clear"
                color="medium"
                onClick={handleDismiss}
                className="dismiss-button"
              >
                Not Now
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow className="dont-ask-row">
            <IonCol className="dont-ask-container">
              <IonCheckbox
                checked={dontAskAgain}
                onIonChange={(e) => setDontAskAgain(e.detail.checked)}
                className="dont-ask-checkbox"
              />
              <IonText color="medium" className="dont-ask-text">
                Don&apos;t ask me again
              </IonText>
            </IonCol>
          </IonRow>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default NotificationPromptModal;
