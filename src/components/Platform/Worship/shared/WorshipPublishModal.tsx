import React from "react";
import {
  IonModal,
  IonContent,
  IonButton,
  IonIcon,
  IonSpinner,
} from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";

interface WorshipPublishModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
  isPublishing: boolean;
  serviceName: string;
}

export const WorshipPublishModal: React.FC<WorshipPublishModalProps> = ({
  isOpen,
  onDismiss,
  onConfirm,
  isPublishing,
  serviceName,
}) => (
  <IonModal
    isOpen={isOpen}
    onDidDismiss={onDismiss}
    breakpoints={[0, 0.5]}
    initialBreakpoint={0.5}
  >
    <IonContent>
      <div className="worship-publish-confirm">
        <IonIcon icon={checkmarkCircle} className="worship-publish-icon" />
        <h2>Publish "{serviceName}"?</h2>
        <p>
          This will mark the service as scheduled and send email and in-app
          notifications to all assigned team members.
        </p>
        <IonButton
          expand="block"
          fill="solid"
          shape="round"
          color="success"
          onClick={onConfirm}
          disabled={isPublishing}
          className="worship-publish-confirm__action-btn"
        >
          {isPublishing ? (
            <IonSpinner name="crescent" />
          ) : (
            <>
              <IonIcon slot="start" icon={checkmarkCircle} />
              Publish Service
            </>
          )}
        </IonButton>
        <IonButton
          expand="block"
          fill="clear"
          shape="round"
          color="medium"
          onClick={onDismiss}
          disabled={isPublishing}
          className="worship-publish-confirm__cancel-btn"
        >
          Cancel
        </IonButton>
      </div>
    </IonContent>
  </IonModal>
);
