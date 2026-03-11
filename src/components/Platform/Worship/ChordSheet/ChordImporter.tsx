import React, { useState } from "react";
import { IonButton, IonIcon, IonTextarea, IonItem, IonLabel } from "@ionic/react";
import { cloudUploadOutline, checkmarkCircle, swapHorizontalOutline } from "ionicons/icons";
import { plainTextToChordPro } from "../../../../utils/chordUtils";
import "./ChordImporter.scss";

interface ChordImporterProps {
  /** Called when the user confirms the import with the converted ChordPro text */
  onImport: (chordPro: string) => void;
  /** Called when the user cancels */
  onCancel: () => void;
}

export const ChordImporter: React.FC<ChordImporterProps> = ({ onImport, onCancel }) => {
  const [rawText, setRawText] = useState("");
  const [preview, setPreview] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleConvert = () => {
    const converted = plainTextToChordPro(rawText);
    setPreview(converted);
    setShowPreview(true);
  };

  const handleConfirm = () => {
    onImport(preview || plainTextToChordPro(rawText));
  };

  return (
    <div className="chord-importer">
      <div className="chord-importer__header">
        <IonIcon icon={cloudUploadOutline} className="chord-importer__icon" />
        <h3>Import Chord Chart</h3>
        <p>
          Copy a chord chart from any website (La Cuerda, Ultimate Guitar, CifraClub, etc.)
          and paste it below. We'll convert it automatically.
        </p>
      </div>

      {!showPreview ? (
        <>
          <IonItem lines="none" className="chord-importer__input">
            <IonLabel position="stacked">Paste chord chart here</IonLabel>
            <IonTextarea
              value={rawText}
              onIonInput={(e) => setRawText(e.detail.value || "")}
              placeholder={`Example:\n\n  Am           G\nQue se llene tu casa\n  C        F      G\nDe tu satisfacción`}
              rows={10}
              autoGrow
              className="chord-importer__textarea"
            />
          </IonItem>

          <div className="chord-importer__actions">
            <IonButton fill="clear" color="medium" onClick={onCancel}>
              Cancel
            </IonButton>
            <IonButton
              fill="solid"
              shape="round"
              onClick={handleConvert}
              disabled={!rawText.trim()}
            >
              <IonIcon slot="start" icon={swapHorizontalOutline} />
              Convert & Preview
            </IonButton>
          </div>
        </>
      ) : (
        <>
          <div className="chord-importer__preview">
            <IonLabel position="stacked" className="chord-importer__preview-label">
              Preview (ChordPro format)
            </IonLabel>
            <IonTextarea
              value={preview}
              onIonInput={(e) => setPreview(e.detail.value || "")}
              rows={10}
              autoGrow
              className="chord-importer__textarea chord-importer__textarea--preview"
            />
            <p className="chord-importer__hint">
              You can edit the result above before importing. Chords in [brackets] will appear above the lyrics.
            </p>
          </div>

          <div className="chord-importer__actions">
            <IonButton fill="clear" color="medium" onClick={() => setShowPreview(false)}>
              Back
            </IonButton>
            <IonButton
              fill="solid"
              shape="round"
              color="success"
              onClick={handleConfirm}
            >
              <IonIcon slot="start" icon={checkmarkCircle} />
              Use This
            </IonButton>
          </div>
        </>
      )}
    </div>
  );
};
