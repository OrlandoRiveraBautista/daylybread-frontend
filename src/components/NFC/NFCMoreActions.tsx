import React from "react";
import { IonFab, IonFabButton, IonIcon, IonFabList } from "@ionic/react";
import { ellipsisVertical, cash, personAdd, calendar } from "ionicons/icons";

interface NFCMoreActionProps {
  onCash?: () => void;
  onNewMember?: () => void;
  onEventLink?: () => void;
}

export const NFCMoreActions: React.FC<NFCMoreActionProps> = ({
  onCash,
  onNewMember,
  onEventLink,
}) => {
  return (
    <>
      <IonFab
        slot="fixed"
        vertical="bottom"
        horizontal="end"
        className="nfc-more-actions"
      >
        <IonFabButton>
          <IonIcon icon={ellipsisVertical} />
        </IonFabButton>
        <IonFabList side="top">
          {onCash && (
            <IonFabButton color="secondary" onClick={onCash}>
              <IonIcon icon={cash} />
            </IonFabButton>
          )}
          {onNewMember && (
            <IonFabButton color="secondary" onClick={onNewMember}>
              <IonIcon icon={personAdd} />
            </IonFabButton>
          )}
          {onEventLink && (
            <IonFabButton color="secondary" onClick={onEventLink}>
              <IonIcon icon={calendar} />
            </IonFabButton>
          )}
        </IonFabList>
      </IonFab>
    </>
  );
};
