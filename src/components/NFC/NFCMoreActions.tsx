import React from "react";
import { IonFab, IonFabButton, IonIcon, IonFabList } from "@ionic/react";
import { ellipsisVertical, cash, personAdd, calendar } from "ionicons/icons";

interface NFCMoreActionProps {
  onCash?: () => void;
  onNewMember?: () => void;
  onNewEvent?: () => void;
}

export const NFCMoreActions: React.FC<NFCMoreActionProps> = ({
  onCash,
  onNewMember,
  onNewEvent,
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
          {onNewEvent && (
            <IonFabButton color="secondary" onClick={onNewEvent}>
              <IonIcon icon={calendar} />
            </IonFabButton>
          )}
        </IonFabList>
      </IonFab>
    </>
  );
};
