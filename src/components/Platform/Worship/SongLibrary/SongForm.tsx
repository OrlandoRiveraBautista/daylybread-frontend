import React from "react";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { cloudUploadOutline } from "ionicons/icons";
import { ChordImporter } from "../ChordSheet/ChordImporter";
import { PlatformBottomSheet } from "../../PlatformBottomSheet";

export interface SongFormValues {
  title: string;
  artist: string;
  defaultKey: string;
  bpm: string;
  lyrics: string;
  chordChart: string;
  youtubeLink: string;
  notes: string;
}

export const EMPTY_SONG_FORM: SongFormValues = {
  title: "",
  artist: "",
  defaultKey: "",
  bpm: "",
  lyrics: "",
  chordChart: "",
  youtubeLink: "",
  notes: "",
};

interface SongFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  values: SongFormValues;
  onChange: (values: SongFormValues) => void;
  isSaving: boolean;
  showImporter: boolean;
  onShowImporter: (show: boolean) => void;
}

export const SongForm: React.FC<SongFormProps> = ({
  isOpen,
  onClose,
  onSave,
  values,
  onChange,
  isSaving,
  showImporter,
  onShowImporter,
}) => {
  const set = (field: keyof SongFormValues) => (val: string) =>
    onChange({ ...values, [field]: val });

  return (
    <PlatformBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Add Song"
      onSave={onSave}
      saveLabel="Add Song"
      saveDisabled={!values.title.trim()}
      isSaving={isSaving}
      breakpoints={[0, 0.85, 1]}
      initialBreakpoint={0.85}
    >
      <IonItem lines="none">
        <IonLabel position="stacked">Title *</IonLabel>
        <IonInput
          value={values.title}
          onIonInput={(e) => set("title")(e.detail.value || "")}
          placeholder="Song title"
          clearInput
        />
      </IonItem>
      <IonItem lines="none">
        <IonLabel position="stacked">Artist</IonLabel>
        <IonInput
          value={values.artist}
          onIonInput={(e) => set("artist")(e.detail.value || "")}
          placeholder="Artist or band"
          clearInput
        />
      </IonItem>
      <IonItem lines="none">
        <IonLabel position="stacked">Key</IonLabel>
        <IonInput
          value={values.defaultKey}
          onIonInput={(e) => set("defaultKey")(e.detail.value || "")}
          placeholder="e.g. G"
          clearInput
        />
      </IonItem>
      <IonItem lines="none">
        <IonLabel position="stacked">BPM</IonLabel>
        <IonInput
          value={values.bpm}
          onIonInput={(e) => set("bpm")(e.detail.value || "")}
          placeholder="e.g. 120"
          type="number"
          clearInput
        />
      </IonItem>
      <IonItem lines="none">
        <IonLabel position="stacked">Chord Chart</IonLabel>
        {!showImporter ? (
          <>
            <IonTextarea
              value={values.chordChart}
              onIonInput={(e) => set("chordChart")(e.detail.value || "")}
              placeholder={`ChordPro format: [Am]Lyrics go [G]here\nOr use the import button below to paste from another site.`}
              rows={6}
              autoGrow
              className="chordpro-textarea"
            />
            <IonButton
              fill="outline"
              size="small"
              shape="round"
              color="tertiary"
              onClick={() => onShowImporter(true)}
              style={{ marginTop: "8px", alignSelf: "flex-start" }}
            >
              <IonIcon slot="start" icon={cloudUploadOutline} />
              Import from another site
            </IonButton>
          </>
        ) : (
          <ChordImporter
            onImport={(chordPro) => {
              set("chordChart")(chordPro);
              onShowImporter(false);
            }}
            onCancel={() => onShowImporter(false)}
          />
        )}
      </IonItem>
      <IonItem lines="none">
        <IonLabel position="stacked">Lyrics (without chords)</IonLabel>
        <IonTextarea
          value={values.lyrics}
          onIonInput={(e) => set("lyrics")(e.detail.value || "")}
          placeholder="Optional — only needed if you want plain lyrics separate from the chord chart"
          rows={3}
          autoGrow
        />
      </IonItem>
      <IonItem lines="none">
        <IonLabel position="stacked">YouTube Link</IonLabel>
        <IonInput
          value={values.youtubeLink}
          onIonInput={(e) => set("youtubeLink")(e.detail.value || "")}
          placeholder="https://youtube.com/..."
          type="url"
          clearInput
        />
      </IonItem>
      <IonItem lines="none">
        <IonLabel position="stacked">Notes</IonLabel>
        <IonTextarea
          value={values.notes}
          onIonInput={(e) => set("notes")(e.detail.value || "")}
          placeholder="Optional notes..."
          rows={2}
          autoGrow
        />
      </IonItem>
    </PlatformBottomSheet>
  );
};
