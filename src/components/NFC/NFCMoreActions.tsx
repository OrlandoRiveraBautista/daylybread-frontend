import React from "react";
import { IonFab, IonFabButton, IonIcon, IonFabList } from "@ionic/react";
import { ellipsisVertical, cash, personAdd } from "ionicons/icons";

interface NFCMoreActionProps {
  onCash: () => void;
  onNewMember: () => void;
}

export const NFCMoreActions: React.FC<NFCMoreActionProps> = ({
  onCash,
  onNewMember,
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
          <IonFabButton color="secondary" onClick={onCash}>
            <IonIcon icon={cash} />
          </IonFabButton>
          <IonFabButton color="tertiary" onClick={onNewMember}>
            <IonIcon icon={personAdd} />
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </>
  );
};
