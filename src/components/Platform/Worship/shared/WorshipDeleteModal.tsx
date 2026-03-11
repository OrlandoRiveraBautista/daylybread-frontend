import React from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonSpinner,
} from "@ionic/react";
import { trash } from "ionicons/icons";

interface WorshipDeleteModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
}

export const WorshipDeleteModal: React.FC<WorshipDeleteModalProps> = ({
  isOpen,
  onDismiss,
  onConfirm,
  isDeleting,
  title,
  message,
  confirmLabel,
}) => (
  <IonModal
    isOpen={isOpen}
    onDidDismiss={onDismiss}
    breakpoints={[0, 0.45]}
    initialBreakpoint={0.45}
  >
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div className="worship-delete-confirm">
        <IonIcon icon={trash} className="worship-delete-icon" />
        <h2>{title}?</h2>
        <p>{message}</p>
        <IonButton
          expand="block"
          fill="solid"
          shape="round"
          color="danger"
          className="worship-delete-confirm__action-btn"
          onClick={onConfirm}
          disabled={isDeleting}
        >
          {isDeleting ? <IonSpinner name="crescent" /> : (confirmLabel ?? title)}
        </IonButton>
      </div>
    </IonContent>
  </IonModal>
);
