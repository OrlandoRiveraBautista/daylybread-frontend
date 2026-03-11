import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
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
  removeOutline,
  addOutline,
} from "ionicons/icons";
import { useGetWorshipService } from "../../../../hooks/WorshipServiceHooks";
import { ChordSheet } from "../ChordSheet/ChordSheet";
import { LiveSetlistDrawer } from "./LiveSetlistDrawer";
import {
  transposeChordPro,
  shouldUseFlats,
  getSemitonesBetweenKeys,
} from "../../../../utils/chordUtils";
import "./LiveService.scss";

export const LiveService: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const initialSong = parseInt(
    new URLSearchParams(location.search).get("song") || "0",
    10,
  );
  const [currentIndex, setCurrentIndex] = useState(initialSong);
  const [showSetlist, setShowSetlist] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(2);
  const [showSpeedControl, setShowSpeedControl] = useState(false);
  const scrollFrameRef = useRef<number | null>(null);
  const scrollSpeedRef = useRef(scrollSpeed);
  const ionScrollElRef = useRef<HTMLElement | null>(null);
  const scrollPosRef = useRef(0);

  useEffect(() => {
    scrollSpeedRef.current = scrollSpeed;
  }, [scrollSpeed]);

  // Resolve IonContent's shadow DOM scroll element once
  useEffect(() => {
    const ionContent = document.querySelector(
      "ion-content.dashboard-content",
    ) as any;
    if (ionContent?.getScrollElement) {
      ionContent.getScrollElement().then((el: HTMLElement) => {
        ionScrollElRef.current = el;
      });
    }
  }, []);

  const { data, loading } = useGetWorshipService(id);
  const service = data?.getWorshipService?.results;

  const sortedItems = useMemo(() => {
    if (!service?.setlist?.items) return [];
    return [...service.setlist.items].sort(
      (a: any, b: any) => a.order - b.order,
    );
  }, [service]);

  const currentItem = sortedItems[currentIndex] as any;
  const totalSongs = sortedItems.length;

  const stopAutoScroll = useCallback(() => {
    if (scrollFrameRef.current !== null) {
      cancelAnimationFrame(scrollFrameRef.current);
      scrollFrameRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!autoScroll) {
      stopAutoScroll();
      return;
    }

    const el = ionScrollElRef.current;
    if (el) scrollPosRef.current = el.scrollTop;

    const scroll = () => {
      const el = ionScrollElRef.current;
      if (el) {
        scrollPosRef.current += 0.01 + scrollSpeedRef.current * 0.1;
        el.scrollTo({ top: scrollPosRef.current });
      }
      scrollFrameRef.current = requestAnimationFrame(scroll);
    };

    scrollFrameRef.current = requestAnimationFrame(scroll);
    return stopAutoScroll;
  }, [autoScroll, stopAutoScroll]);

  const navigateTo = (index: number) => {
    setAutoScroll(false);
    scrollPosRef.current = 0;
    setCurrentIndex(index);
    setShowSetlist(false);
    ionScrollElRef.current?.scrollTo({ top: 0, behavior: "smooth" });
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
          <IonButton
            fill="clear"
            size="small"
            shape="round"
            onClick={() => history.goBack()}
          >
            <IonIcon slot="icon-only" icon={arrowBack} />
          </IonButton>
          <span className="live-service__service-name">{service.name}</span>
          <div />
        </div>
        <div className="live-service__empty">
          <p>No songs in the setlist. Add songs to the service first.</p>
          <IonButton
            fill="solid"
            shape="round"
            onClick={() => history.push(`/worship/services/${id}`)}
          >
            Go to Service
          </IonButton>
        </div>
      </div>
    );
  }

  const song = currentItem?.song;
  const setlistKey = currentItem?.key;
  const songDefaultKey = song?.defaultKey || "";
  const displayKey = setlistKey || songDefaultKey;

  let chordPro = song?.chordChart || "";
  let effectiveOriginalKey = displayKey;

  if (setlistKey && songDefaultKey && setlistKey !== songDefaultKey) {
    const semitones = getSemitonesBetweenKeys(songDefaultKey, setlistKey);
    if (semitones !== 0) {
      chordPro = transposeChordPro(
        chordPro,
        semitones,
        shouldUseFlats(setlistKey),
      );
    }
  }

  return (
    <div className="live-service">
      {/* Top Bar */}
      <div className="live-service__top-bar">
        <IonButton
          fill="clear"
          size="small"
          shape="round"
          onClick={() => history.goBack()}
        >
          <IonIcon slot="icon-only" icon={arrowBack} />
        </IonButton>
        <span className="live-service__service-name">{service.name}</span>
        <IonButton
          fill="clear"
          size="small"
          shape="round"
          onClick={() => setShowSetlist(!showSetlist)}
        >
          <IonIcon
            slot="icon-only"
            icon={showSetlist ? closeOutline : listOutline}
          />
        </IonButton>
      </div>

      {showSetlist && (
        <LiveSetlistDrawer
          items={sortedItems}
          currentIndex={currentIndex}
          onNavigate={navigateTo}
          onClose={() => setShowSetlist(false)}
        />
      )}

      {/* Song Header */}
      <div className="live-service__song-header">
        <div className="live-service__song-info">
          <h2>{song?.title}</h2>
          {song?.artist && (
            <p className="live-service__song-artist">{song.artist}</p>
          )}
        </div>
        <div className="live-service__song-meta">
          {displayKey && <IonBadge color="tertiary">{displayKey}</IonBadge>}
          {(currentItem?.bpm || song?.bpm) && (
            <IonBadge color="medium">
              {currentItem?.bpm || song?.bpm} BPM
            </IonBadge>
          )}
          <IonBadge color="primary" className="live-service__song-counter">
            {currentIndex + 1} / {totalSongs}
          </IonBadge>
        </div>
      </div>

      {currentItem?.notes && (
        <div className="live-service__item-notes">
          <p>{currentItem.notes}</p>
        </div>
      )}

      {/* Chord Sheet Content */}
      <div className="live-service__content">
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

      {/* Auto-scroll FAB */}
      <div className="live-service__scroll-fab-wrap">
        {showSpeedControl && (
          <div className="live-service__speed-popover">
            <button
              className="live-service__speed-step"
              onClick={() => setScrollSpeed((s) => Math.min(10, s + 1))}
              disabled={scrollSpeed >= 10}
              aria-label="Faster"
            >
              <IonIcon icon={addOutline} />
            </button>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={scrollSpeed}
              onChange={(e) => setScrollSpeed(Number(e.target.value))}
              className="live-service__speed-slider"
              aria-label="Scroll speed"
            />
            <button
              className="live-service__speed-step"
              onClick={() => setScrollSpeed((s) => Math.max(1, s - 1))}
              disabled={scrollSpeed <= 1}
              aria-label="Slower"
            >
              <IonIcon icon={removeOutline} />
            </button>
          </div>
        )}
        {autoScroll && (
          <button
            className="live-service__speed-badge"
            onClick={() => setShowSpeedControl((v) => !v)}
            aria-label="Adjust speed"
          >
            {scrollSpeed}
            <span>x</span>
          </button>
        )}
        <button
          className={`live-service__scroll-fab${autoScroll ? " live-service__scroll-fab--active" : ""}`}
          onClick={() => {
            setAutoScroll((v) => !v);
            setShowSpeedControl(false);
          }}
          aria-label={autoScroll ? "Stop auto-scroll" : "Start auto-scroll"}
        >
          <IonIcon icon={autoScroll ? pauseOutline : playOutline} />
        </button>
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
