import React, { useState } from "react";
import {
  IonButton,
  IonIcon,
  IonTextarea,
  IonInput,
  IonSpinner,
} from "@ionic/react";
import {
  checkmarkCircle,
  swapHorizontalOutline,
  linkOutline,
  documentTextOutline,
  alertCircleOutline,
  arrowBackOutline,
  sparklesOutline,
} from "ionicons/icons";
import { plainTextToChordPro } from "../../../../utils/chordUtils";
import { useFetchChordsFromUrl } from "../../../../hooks/SongHooks";
import "./ChordImporter.scss";

type ImportMode = "url" | "paste";

export interface ChordImportMeta {
  chordsUrl?: string;
  title?: string;
  artist?: string;
  key?: string;
}

interface ChordImporterProps {
  onImport: (chordPro: string, meta?: ChordImportMeta) => void;
  onCancel: () => void;
}

export const ChordImporter: React.FC<ChordImporterProps> = ({ onImport, onCancel }) => {
  const [mode, setMode] = useState<ImportMode>("url");

  const [url, setUrl] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [fetchChordsFromUrl, { loading: isFetching }] = useFetchChordsFromUrl();

  const [rawText, setRawText] = useState("");

  const [preview, setPreview] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewMeta, setPreviewMeta] = useState<ChordImportMeta>({});

  const handleFetchFromUrl = async () => {
    if (!url.trim()) return;
    setFetchError("");
    try {
      const { data } = await fetchChordsFromUrl({ variables: { url: url.trim() } });
      const result = data?.fetchChordsFromUrl;
      if (result?.errors?.length) {
        setFetchError(result.errors[0].message);
        return;
      }
      if (result?.rawText) {
        setPreview(plainTextToChordPro(result.rawText));
        setPreviewMeta({
          chordsUrl: url.trim(),
          title: result.title || undefined,
          artist: result.artist || undefined,
          key: result.key || undefined,
        });
        setShowPreview(true);
      }
    } catch {
      setFetchError("Failed to fetch chords. Please check the URL and try again.");
    }
  };

  const handleConvertPaste = () => {
    setPreview(plainTextToChordPro(rawText));
    setPreviewMeta({});
    setShowPreview(true);
  };

  const handleConfirm = () => {
    onImport(preview, previewMeta);
  };

  const handleBack = () => {
    setShowPreview(false);
    setPreview("");
  };

  // ── Preview ──────────────────────────────────────────────────
  if (showPreview) {
    return (
      <div className="chord-importer chord-importer--preview">
        <div className="chord-importer__preview-header">
          <span className="chord-importer__preview-badge">
            <IonIcon icon={sparklesOutline} />
            ChordPro preview
          </span>
          {previewMeta.title && (
            <span className="chord-importer__preview-song">
              {previewMeta.title}{previewMeta.artist ? ` — ${previewMeta.artist}` : ""}
            </span>
          )}
          {previewMeta.key && (
            <span className="chord-importer__preview-key">Key of {previewMeta.key}</span>
          )}
        </div>
        <IonTextarea
          value={preview}
          onIonInput={(e) => setPreview(e.detail.value || "")}
          rows={9}
          autoGrow
          className="chord-importer__textarea chord-importer__textarea--preview"
        />
        <p className="chord-importer__hint">
          Edit freely before importing. Chords in [brackets] appear above lyrics.
        </p>
        <div className="chord-importer__actions">
          <IonButton fill="clear" color="medium" size="small" onClick={handleBack}>
            <IonIcon slot="start" icon={arrowBackOutline} />
            Back
          </IonButton>
          <IonButton fill="solid" shape="round" color="success" onClick={handleConfirm}>
            <IonIcon slot="start" icon={checkmarkCircle} />
            Use This
          </IonButton>
        </div>
      </div>
    );
  }

  // ── Main ─────────────────────────────────────────────────────
  return (
    <div className="chord-importer">
      <div className="chord-importer__tabs">
        <button
          className={`chord-importer__tab ${mode === "url" ? "chord-importer__tab--active" : ""}`}
          onClick={() => { setMode("url"); setFetchError(""); }}
        >
          <IonIcon icon={linkOutline} />
          From URL
        </button>
        <button
          className={`chord-importer__tab ${mode === "paste" ? "chord-importer__tab--active" : ""}`}
          onClick={() => setMode("paste")}
        >
          <IonIcon icon={documentTextOutline} />
          Paste Text
        </button>
      </div>

      <div className="chord-importer__body">
        {mode === "url" ? (
          <>
            <p className="chord-importer__hint">
              Paste a link from La Cuerda, CifraClub, or Ultimate Guitar and we'll pull the chords automatically.
            </p>
            <div className={`chord-importer__url-row ${fetchError ? "chord-importer__url-row--error" : ""}`}>
              <IonIcon icon={linkOutline} className="chord-importer__url-icon" />
              <IonInput
                value={url}
                onIonInput={(e) => { setUrl(e.detail.value || ""); setFetchError(""); }}
                placeholder="https://acordes.lacuerda.net/..."
                type="url"
                className="chord-importer__url-input"
              />
            </div>
            {fetchError && (
              <div className="chord-importer__error">
                <IonIcon icon={alertCircleOutline} />
                <span>{fetchError}</span>
              </div>
            )}
            <div className="chord-importer__chips">
              <span className="chord-importer__chip">La Cuerda</span>
              <span className="chord-importer__chip">CifraClub</span>
              <span className="chord-importer__chip">Ultimate Guitar</span>
            </div>
            <div className="chord-importer__actions">
              <IonButton fill="clear" color="medium" size="small" onClick={onCancel}>
                Cancel
              </IonButton>
              <IonButton
                fill="solid"
                shape="round"
                onClick={handleFetchFromUrl}
                disabled={!url.trim() || isFetching}
              >
                {isFetching
                  ? <IonSpinner name="crescent" className="chord-importer__spinner" />
                  : <IonIcon slot="start" icon={sparklesOutline} />
                }
                {isFetching ? "Fetching…" : "Fetch Chords"}
              </IonButton>
            </div>
          </>
        ) : (
          <>
            <p className="chord-importer__hint">
              Copy the chord chart from any site and paste it below. We'll convert it to ChordPro.
            </p>
            <IonTextarea
              value={rawText}
              onIonInput={(e) => setRawText(e.detail.value || "")}
              placeholder={"  Am           G\nQue se llene tu casa\n  C        F      G\nDe tu satisfacción"}
              rows={8}
              autoGrow
              className="chord-importer__textarea"
            />
            <div className="chord-importer__actions">
              <IonButton fill="clear" color="medium" size="small" onClick={onCancel}>
                Cancel
              </IonButton>
              <IonButton
                fill="solid"
                shape="round"
                onClick={handleConvertPaste}
                disabled={!rawText.trim()}
              >
                <IonIcon slot="start" icon={swapHorizontalOutline} />
                Convert & Preview
              </IonButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
