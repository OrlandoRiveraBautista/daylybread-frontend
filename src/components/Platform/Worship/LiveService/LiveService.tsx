import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import {
  IonButton,
  IonIcon,
  IonSpinner,
  IonBadge,
} from "@ionic/react";
import {
  arrowBack,
  chevronBackOutline,
  chevronForwardOutline,
  listOutline,
  closeOutline,
  playOutline,
  pauseOutline,
} from "ionicons/icons";
import { useGetWorshipService } from "../../../../hooks/WorshipServiceHooks";
import { ChordSheet } from "../ChordSheet/ChordSheet";
import {
  transposeChordPro,
  shouldUseFlats,
} from "../../../../utils/chordUtils";
import "./LiveService.scss";

/**
 * Calculate the semitone difference between two keys to auto-transpose.
 * If the song's default key is G and the setlist says D, we transpose -5 semitones.
 */
function getSemitonesBetweenKeys(fromKey: string, toKey: string): number {
  const NOTE_TO_INDEX: Record<string, number> = {
    C: 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3,
    E: 4, F: 5, "F#": 6, Gb: 6, G: 7, "G#": 8, Ab: 8,
    A: 9, "A#": 10, Bb: 10, B: 11,
  };

  const extractRoot = (key: string) => {
    const match = key.match(/^([A-G][#b]?)/);
    return match ? match[1] : null;
  };

  const fromRoot = extractRoot(fromKey);
  const toRoot = extractRoot(toKey);
  if (!fromRoot || !toRoot) return 0;

  const fromIdx = NOTE_TO_INDEX[fromRoot];
  const toIdx = NOTE_TO_INDEX[toRoot];
  if (fromIdx === undefined || toIdx === undefined) return 0;

  let diff = toIdx - fromIdx;
  if (diff > 6) diff -= 12;
  if (diff < -6) diff += 12;
  return diff;
}

export const LiveService: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const initialSong = parseInt(new URLSearchParams(location.search).get("song") || "0", 10);
  const [currentIndex, setCurrentIndex] = useState(initialSong);
  const [showSetlist, setShowSetlist] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);

  const { data, loading } = useGetWorshipService(id);
  const service = data?.getWorshipService?.results;

  const sortedItems = useMemo(() => {
    if (!service?.setlist?.items) return [];
    return [...service.setlist.items].sort((a: any, b: any) => a.order - b.order);
  }, [service]);

  const currentItem = sortedItems[currentIndex] as any;
  const totalSongs = sortedItems.length;

  // Auto-scroll: speed based on BPM. Higher BPM = faster scroll.
  // Base: ~0.5px/frame at 120 BPM (~30px/sec). Scale linearly.
  const currentBpm = (currentItem?.bpm || currentItem?.song?.bpm || 120) as number;

  const stopAutoScroll = useCallback(() => {
    if (scrollFrameRef.current !== null) {
      cancelAnimationFrame(scrollFrameRef.current);
      scrollFrameRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!autoScroll || !contentRef.current) {
      stopAutoScroll();
      return;
    }

    const pixelsPerFrame = (currentBpm / 120) * 0.5;

    const scroll = () => {
      if (contentRef.current) {
        contentRef.current.scrollTop += pixelsPerFrame;
      }
      scrollFrameRef.current = requestAnimationFrame(scroll);
    };

    scrollFrameRef.current = requestAnimationFrame(scroll);
    return stopAutoScroll;
  }, [autoScroll, currentBpm, stopAutoScroll]);

  // Stop auto-scroll when changing songs
  const navigateTo = (index: number) => {
    setAutoScroll(false);
    setCurrentIndex(index);
    setShowSetlist(false);
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goNext = () => {
    if (currentIndex < totalSongs - 1) navigateTo(currentIndex + 1);
  };

  const goPrev = () => {
    if (currentIndex > 0) navigateTo(currentIndex - 1);
  };

  if (loading) {
    return (
      <div className="live-service">
        <div className="live-service__loading">
          <IonSpinner name="crescent" />
          <p>Loading service...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="live-service">
        <IonButton fill="clear" onClick={() => history.goBack()}>
          <IonIcon slot="start" icon={arrowBack} /> Back
        </IonButton>
        <p>Service not found.</p>
      </div>
    );
  }

  if (totalSongs === 0) {
    return (
      <div className="live-service">
        <div className="live-service__top-bar">
          <IonButton fill="clear" size="small" shape="round" onClick={() => history.goBack()}>
            <IonIcon slot="icon-only" icon={arrowBack} />
          </IonButton>
          <span className="live-service__service-name">{service.name}</span>
          <div />
        </div>
        <div className="live-service__empty">
          <p>No songs in the setlist. Add songs to the service first.</p>
          <IonButton fill="solid" shape="round" onClick={() => history.push(`/worship/services/${id}`)}>
            Go to Service
          </IonButton>
        </div>
      </div>
    );
  }

  // Determine the display key — use the setlist item's key override, or the song's default
  const song = currentItem?.song;
  const setlistKey = currentItem?.key;
  const songDefaultKey = song?.defaultKey || "";
  const displayKey = setlistKey || songDefaultKey;

  // Pre-transpose the chord chart if the setlist specifies a different key than the song's default
  let chordPro = song?.chordChart || "";
  let effectiveOriginalKey = displayKey;

  if (setlistKey && songDefaultKey && setlistKey !== songDefaultKey) {
    // Auto-transpose the chordPro to the setlist key
    const semitones = getSemitonesBetweenKeys(songDefaultKey, setlistKey);
    if (semitones !== 0) {
      const useFlats = shouldUseFlats(setlistKey);
      chordPro = transposeChordPro(chordPro, semitones, useFlats);
    }
  }

  return (
    <div className="live-service">
      {/* Top Bar */}
      <div className="live-service__top-bar">
        <IonButton fill="clear" size="small" shape="round" onClick={() => history.goBack()}>
          <IonIcon slot="icon-only" icon={arrowBack} />
        </IonButton>
        <span className="live-service__service-name">{service.name}</span>
        <IonButton
          fill="clear"
          size="small"
          shape="round"
          onClick={() => setShowSetlist(!showSetlist)}
        >
          <IonIcon slot="icon-only" icon={showSetlist ? closeOutline : listOutline} />
        </IonButton>
      </div>

      {/* Setlist Sidebar/Drawer */}
      {showSetlist && (
        <div className="live-service__setlist-overlay" onClick={() => setShowSetlist(false)}>
          <div className="live-service__setlist-drawer" onClick={(e) => e.stopPropagation()}>
            <h3>Setlist</h3>
            <div className="live-service__setlist-items">
              {sortedItems.map((item: any, idx: number) => (
                <button
                  key={item._id}
                  className={`live-service__setlist-item ${idx === currentIndex ? "active" : ""}`}
                  onClick={() => navigateTo(idx)}
                >
                  <span className="live-service__setlist-num">{idx + 1}</span>
                  <div className="live-service__setlist-info">
                    <span className="live-service__setlist-title">{item.song?.title}</span>
                    <span className="live-service__setlist-meta">
                      {item.key && <IonBadge color="tertiary">{item.key}</IonBadge>}
                      {item.song?.artist && <span>{item.song.artist}</span>}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Song Header */}
      <div className="live-service__song-header">
        <div className="live-service__song-info">
          <h2>{song?.title}</h2>
          {song?.artist && <p className="live-service__song-artist">{song.artist}</p>}
        </div>
        <div className="live-service__song-meta">
          {displayKey && <IonBadge color="tertiary">{displayKey}</IonBadge>}
          {(currentItem?.bpm || song?.bpm) && (
            <IonBadge color="medium">{currentItem?.bpm || song?.bpm} BPM</IonBadge>
          )}
          <IonBadge color="primary" className="live-service__song-counter">
            {currentIndex + 1} / {totalSongs}
          </IonBadge>
          <IonButton
            fill={autoScroll ? "solid" : "outline"}
            size="small"
            shape="round"
            color={autoScroll ? "success" : "medium"}
            onClick={() => setAutoScroll(!autoScroll)}
            className="live-service__autoscroll-btn"
          >
            <IonIcon slot="start" icon={autoScroll ? pauseOutline : playOutline} />
            {autoScroll ? "Scrolling" : "Auto-scroll"}
          </IonButton>
        </div>
      </div>

      {/* Notes for this setlist item */}
      {currentItem?.notes && (
        <div className="live-service__item-notes">
          <p>{currentItem.notes}</p>
        </div>
      )}

      {/* Chord Sheet Content */}
      <div className="live-service__content" ref={contentRef}>
        {chordPro ? (
          <ChordSheet
            chordPro={chordPro}
            originalKey={effectiveOriginalKey}
            fontSize={17}
          />
        ) : song?.lyrics ? (
          <pre className="live-service__lyrics">{song.lyrics}</pre>
        ) : (
          <div className="live-service__no-chart">
            <p>No chord chart available for this song.</p>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="live-service__nav">
        <IonButton
          fill="clear"
          size="large"
          shape="round"
          disabled={currentIndex === 0}
          onClick={goPrev}
          className="live-service__nav-btn"
        >
          <IonIcon slot="start" icon={chevronBackOutline} />
          {currentIndex > 0 && (
            <span className="live-service__nav-label">
              {sortedItems[currentIndex - 1]?.song?.title}
            </span>
          )}
        </IonButton>

        <IonButton
          fill="clear"
          size="large"
          shape="round"
          disabled={currentIndex === totalSongs - 1}
          onClick={goNext}
          className="live-service__nav-btn"
        >
          {currentIndex < totalSongs - 1 && (
            <span className="live-service__nav-label">
              {sortedItems[currentIndex + 1]?.song?.title}
            </span>
          )}
          <IonIcon slot="end" icon={chevronForwardOutline} />
        </IonButton>
      </div>
    </div>
  );
};
