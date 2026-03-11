import React, { useState, useMemo } from "react";
import { IonButton, IonIcon, IonBadge } from "@ionic/react";
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";
import {
  parseChordPro,
  transposeChordPro,
  getTransposedKeyName,
  shouldUseFlats,
  ParsedLine,
} from "../../../../utils/chordUtils";
import "./ChordSheet.scss";

interface ChordSheetProps {
  /** ChordPro formatted string */
  chordPro: string;
  /** Original key of the song (e.g. "G", "Am") */
  originalKey?: string;
  /** Font size in px for lyrics (chords scale proportionally) */
  fontSize?: number;
}

export const ChordSheet: React.FC<ChordSheetProps> = ({
  chordPro,
  originalKey = "",
  fontSize = 15,
}) => {
  const [transpose, setTranspose] = useState(0);

  const useFlats = useMemo(
    () => shouldUseFlats(originalKey || "C"),
    [originalKey]
  );

  const transposedText = useMemo(
    () => transposeChordPro(chordPro, transpose, useFlats),
    [chordPro, transpose, useFlats]
  );

  const parsedLines = useMemo(() => parseChordPro(transposedText), [transposedText]);

  const currentKey = useMemo(
    () => (originalKey ? getTransposedKeyName(originalKey, transpose) : ""),
    [originalKey, transpose]
  );

  const handleTranspose = (delta: number) => {
    setTranspose((prev) => {
      const next = prev + delta;
      // Wrap around at ±12
      if (next >= 12) return next - 12;
      if (next <= -12) return next + 12;
      return next;
    });
  };

  return (
    <div className="chord-sheet">
      {/* Transpose Controls */}
      <div className="chord-sheet__controls">
        <div className="chord-sheet__transpose">
          <IonButton
            fill="clear"
            size="small"
            shape="round"
            onClick={() => handleTranspose(-1)}
            className="transpose-btn"
          >
            <IonIcon slot="icon-only" icon={removeCircleOutline} />
          </IonButton>

          <div className="chord-sheet__key-display">
            {currentKey && (
              <IonBadge color="tertiary" className="key-badge">
                {currentKey}
              </IonBadge>
            )}
            {transpose !== 0 && (
              <span className="transpose-indicator">
                {transpose > 0 ? `+${transpose}` : transpose}
              </span>
            )}
          </div>

          <IonButton
            fill="clear"
            size="small"
            shape="round"
            onClick={() => handleTranspose(1)}
            className="transpose-btn"
          >
            <IonIcon slot="icon-only" icon={addCircleOutline} />
          </IonButton>

          {transpose !== 0 && (
            <IonButton
              fill="clear"
              size="small"
              color="medium"
              onClick={() => setTranspose(0)}
              className="reset-btn"
            >
              Reset
            </IonButton>
          )}
        </div>
      </div>

      {/* Chord Sheet Content */}
      <div className="chord-sheet__content" style={{ fontSize: `${fontSize}px` }}>
        {parsedLines.map((line, idx) => (
          <ChordLine key={idx} line={line} />
        ))}
      </div>
    </div>
  );
};

const ChordLine: React.FC<{ line: ParsedLine }> = ({ line }) => {
  if (line.type === "empty") {
    return <div className="chord-line chord-line--empty" />;
  }

  if (line.type === "section") {
    return (
      <div className="chord-line chord-line--section">
        <span className="section-label">{line.section}</span>
      </div>
    );
  }

  if (!line.pairs || line.pairs.length === 0) return null;

  const hasChords = line.pairs.some((p) => p.chord);

  return (
    <div className={`chord-line chord-line--lyrics ${hasChords ? "has-chords" : ""}`}>
      {line.pairs.map((pair, idx) => (
        <span key={idx} className="chord-pair">
          {pair.chord && <span className="chord">{pair.chord}</span>}
          <span className="lyric">{pair.lyric || (pair.chord ? "\u00A0" : "")}</span>
        </span>
      ))}
    </div>
  );
};
