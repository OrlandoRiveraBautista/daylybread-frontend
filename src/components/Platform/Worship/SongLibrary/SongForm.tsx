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
import { ChordImporter, ChordImportMeta } from "../ChordSheet/ChordImporter";
import { PlatformBottomSheet } from "../../PlatformBottomSheet";

export interface SongFormValues {
  title: string;
  artist: string;
  defaultKey: string;
  bpm: string;
  lyrics: string;
  chordChart: string;
  youtubeLink: string;
  chordsUrl: string;
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
  chordsUrl: "",
  notes: "",
};

/** Map API song object to form values */
export function songToFormValues(song: {
  title?: string | null;
  artist?: string | null;
  defaultKey?: string | null;
  bpm?: number | null;
  lyrics?: string | null;
  chordChart?: string | null;
  youtubeLink?: string | null;
  chordsUrl?: string | null;
  notes?: string | null;
}): SongFormValues {
  return {
    title: song.title ?? "",
    artist: song.artist ?? "",
    defaultKey: song.defaultKey ?? "",
    bpm: song.bpm != null ? String(song.bpm) : "",
    lyrics: song.lyrics ?? "",
    chordChart: song.chordChart ?? "",
    youtubeLink: song.youtubeLink ?? "",
    chordsUrl: song.chordsUrl ?? "",
    notes: song.notes ?? "",
  };
}

interface SongFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  values: SongFormValues;
  onChange: (values: SongFormValues) => void;
  isSaving: boolean;
  showImporter: boolean;
  onShowImporter: (show: boolean) => void;
  /** "create" shows Add Song; "edit" shows Edit Song */
  mode?: "create" | "edit";
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
  mode = "create",
}) => {
  const isEdit = mode === "edit";
  const set = (field: keyof SongFormValues) => (val: string) =>
    onChange({ ...values, [field]: val });

  return (
    <PlatformBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Song" : "Add Song"}
      onSave={onSave}
      saveLabel={isEdit ? "Save Changes" : "Add Song"}
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

      {/* Chord Chart — importer lives right here, after Artist */}
      <IonItem lines="none">
        <IonLabel position="stacked">Chord Chart</IonLabel>
        {showImporter ? (
          <ChordImporter
            onImport={(chordPro, meta: ChordImportMeta = {}) => {
              onChange({
                ...values,
                chordChart: chordPro,
                chordsUrl: meta.chordsUrl || values.chordsUrl,
                title: meta.title && !values.title.trim() ? meta.title : values.title,
                artist: meta.artist && !values.artist.trim() ? meta.artist : values.artist,
                defaultKey: meta.key && !values.defaultKey.trim() ? meta.key : values.defaultKey,
              });
              onShowImporter(false);
            }}
            onCancel={() => onShowImporter(false)}
          />
        ) : (
          <>
            <IonTextarea
              value={values.chordChart}
              onIonInput={(e) => set("chordChart")(e.detail.value || "")}
              placeholder={`ChordPro format: [Am]Lyrics go [G]here\nOr use the import button below to fetch from a URL or paste from another site.`}
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
              Import from URL or site
            </IonButton>
          </>
        )}
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
        <IonLabel position="stacked">Chords Reference URL</IonLabel>
        <IonInput
          value={values.chordsUrl}
          onIonInput={(e) => set("chordsUrl")(e.detail.value || "")}
          placeholder="https://lacuerda.net/... or cifraclub.com/..."
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
