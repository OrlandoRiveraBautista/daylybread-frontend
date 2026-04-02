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
  IonText,
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
  logoYoutube,
  downloadOutline,
} from "ionicons/icons";
import { useGetWorshipService } from "../../../../hooks/WorshipServiceHooks";
import { ChordSheet } from "../ChordSheet/ChordSheet";
import { LiveSetlistDrawer } from "../LiveService/LiveSetlistDrawer";
import { PracticeAudioPlayer } from "./PracticeAudioPlayer";
import { YouTubeEmbedPlayer } from "./YouTubeEmbedPlayer";
import {
  transposeChordPro,
  shouldUseFlats,
  getSemitonesBetweenKeys,
} from "../../../../utils/chordUtils";
import { extractYoutubeVideoId } from "../../../../utils/youtubeUtils";
import {
  disposePracticeAudioSession,
  runPracticeAudioPrefetch,
  type PracticePrefetchProgress,
} from "../../../../utils/practiceAudioSession";
import "../LiveService/LiveService.scss";
import "./PracticeMode.scss";

const PREFETCH_RING_SIZE = 28;
const PREFETCH_RING_STROKE = 2.25;
const PREFETCH_RING_RADIUS =
  (PREFETCH_RING_SIZE - PREFETCH_RING_STROKE) / 2 - 0.5;
const PREFETCH_RING_CIRCUMFERENCE = 2 * Math.PI * PREFETCH_RING_RADIUS;

export const PracticeMode: React.FC = () => {
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
  const [chordTransposeExtra, setChordTransposeExtra] = useState(0);
  const scrollFrameRef = useRef<number | null>(null);
  const scrollSpeedRef = useRef(scrollSpeed);
  const ionScrollElRef = useRef<HTMLElement | null>(null);
  const scrollPosRef = useRef(0);

  const onTransposeChange = useCallback((semi: number) => {
    setChordTransposeExtra(semi);
  }, []);

  useEffect(() => {
    scrollSpeedRef.current = scrollSpeed;
  }, [scrollSpeed]);

  useEffect(() => {
    const ionContent = document.querySelector(
      "ion-content.dashboard-content",
    ) as { getScrollElement?: () => Promise<HTMLElement> } | undefined;
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
      (a: { order: number }, b: { order: number }) => a.order - b.order,
    );
  }, [service]);

  const practiceVideoIdsInOrder = useMemo(() => {
    const out: string[] = [];
    for (const item of sortedItems) {
      const row = item as { song?: { youtubeLink?: string } };
      const v = extractYoutubeVideoId(row?.song?.youtubeLink);
      if (v) out.push(v);
    }
    return out;
  }, [sortedItems]);

  const practiceSetlistVideoKey = useMemo(
    () => practiceVideoIdsInOrder.join("|"),
    [practiceVideoIdsInOrder],
  );

  const currentIndexRef = useRef(currentIndex);
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const [prefetchProgress, setPrefetchProgress] =
    useState<PracticePrefetchProgress | null>(null);
  const [prefetchTipOpen, setPrefetchTipOpen] = useState(false);
  const prefetchSyncBtnRef = useRef<HTMLIonButtonElement | null>(null);

  /** Drop in-memory reference audio when leaving this service’s practice mode. */
  useEffect(() => {
    if (!id) return;
    return () => {
      disposePracticeAudioSession();
    };
  }, [id]);

  useEffect(() => {
    const done =
      !prefetchProgress ||
      prefetchProgress.total < 1 ||
      prefetchProgress.completed >= prefetchProgress.total;
    if (done) setPrefetchTipOpen(false);
  }, [prefetchProgress]);

  useEffect(() => {
    if (!prefetchTipOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const host = prefetchSyncBtnRef.current;
      if (!host) return;
      if (e.composedPath().includes(host)) return;
      setPrefetchTipOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, true);
  }, [prefetchTipOpen]);

  /** Pre-download setlist audio one-by-one (current song first); shares cache with the player. */
  useEffect(() => {
    if (!id || practiceVideoIdsInOrder.length === 0) {
      setPrefetchProgress(null);
      return;
    }
    const cur = extractYoutubeVideoId(
      (
        sortedItems[currentIndexRef.current] as {
          song?: { youtubeLink?: string };
        }
      )?.song?.youtubeLink,
    );
    const queue = cur
      ? [cur, ...practiceVideoIdsInOrder.filter((x) => x !== cur)]
      : [...practiceVideoIdsInOrder];
    return runPracticeAudioPrefetch(id, queue, setPrefetchProgress);
  }, [id, practiceSetlistVideoKey]); // eslint-disable-line react-hooks/exhaustive-deps -- queue uses currentIndexRef

  const currentItem = sortedItems[currentIndex] as {
    key?: string;
    bpm?: number;
    notes?: string;
    song?: {
      _id?: string;
      title?: string;
      artist?: string;
      defaultKey?: string;
      bpm?: number;
      lyrics?: string;
      chordChart?: string;
      youtubeLink?: string;
    };
  };
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
      const scEl = ionScrollElRef.current;
      if (scEl) {
        scrollPosRef.current += 0.01 + scrollSpeedRef.current * 0.1;
        scEl.scrollTo({ top: scrollPosRef.current });
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
      <div className="live-service practice-mode">
        <div className="live-service__loading">
          <IonSpinner name="crescent" />
          <p>Loading service...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="live-service practice-mode">
        <IonButton fill="clear" onClick={() => history.goBack()}>
          <IonIcon slot="start" icon={arrowBack} /> Back
        </IonButton>
        <p>Service not found.</p>
      </div>
    );
  }

  if (totalSongs === 0) {
    return (
      <div className="live-service practice-mode">
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

  const videoId = extractYoutubeVideoId(song?.youtubeLink);
  const basePitchSemitones =
    songDefaultKey && displayKey
      ? getSemitonesBetweenKeys(songDefaultKey, displayKey)
      : 0;
  const totalPitchSemitones = basePitchSemitones + chordTransposeExtra;

  // Use the embedded YouTube player in browser contexts where yt-dlp streaming
  // and Web Audio pitch-shifting are not available. On localhost (including
  // custom .local domains) the full PracticeAudioPlayer (yt-dlp + Tone.js) is
  // used instead.
  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "::1" ||
      window.location.hostname.endsWith(".local"));

  return (
    <div className="live-service practice-mode">
      <div className="live-service__top-bar practice-mode__top-bar">
        <IonButton
          fill="clear"
          size="small"
          shape="round"
          onClick={() => history.goBack()}
        >
          <IonIcon slot="icon-only" icon={arrowBack} />
        </IonButton>
        <div className="practice-mode__top-title">
          <IonBadge color="tertiary" className="practice-mode__mode-badge">
            Practice mode
          </IonBadge>
          <span className="live-service__service-name">{service.name}</span>
        </div>
        <div className="practice-mode__top-actions">
          {prefetchProgress &&
            prefetchProgress.total > 0 &&
            prefetchProgress.completed < prefetchProgress.total && (
              <IonButton
                ref={prefetchSyncBtnRef}
                fill="clear"
                color="primary"
                size="small"
                shape="round"
                className={
                  prefetchTipOpen
                    ? "practice-mode__prefetch-sync-btn practice-mode__prefetch-sync-btn--tip-open"
                    : "practice-mode__prefetch-sync-btn"
                }
                aria-label={
                  prefetchProgress.activeVideoId
                    ? `Preparing setlist audio: downloading a track now. ${prefetchProgress.completed} of ${prefetchProgress.total} songs cached so far.`
                    : `Preparing setlist audio: ${prefetchProgress.completed} of ${prefetchProgress.total} songs cached in the background for this practice session.`
                }
                aria-expanded={prefetchTipOpen}
                aria-haspopup="true"
                aria-controls="practice-prefetch-tip"
                aria-live="polite"
                onClick={(e) => {
                  e.stopPropagation();
                  setPrefetchTipOpen((v) => !v);
                }}
              >
                <span
                  className="practice-mode__prefetch-sync-inner"
                  aria-hidden
                >
                  <svg
                    className="practice-mode__prefetch-sync-svg"
                    width={PREFETCH_RING_SIZE}
                    height={PREFETCH_RING_SIZE}
                    viewBox={`0 0 ${PREFETCH_RING_SIZE} ${PREFETCH_RING_SIZE}`}
                  >
                    <circle
                      className="practice-mode__prefetch-sync-track"
                      cx={PREFETCH_RING_SIZE / 2}
                      cy={PREFETCH_RING_SIZE / 2}
                      r={PREFETCH_RING_RADIUS}
                      fill="none"
                      strokeWidth={PREFETCH_RING_STROKE}
                    />
                    <circle
                      className={
                        prefetchProgress.activeVideoId
                          ? "practice-mode__prefetch-sync-progress practice-mode__prefetch-sync-progress--working"
                          : "practice-mode__prefetch-sync-progress"
                      }
                      cx={PREFETCH_RING_SIZE / 2}
                      cy={PREFETCH_RING_SIZE / 2}
                      r={PREFETCH_RING_RADIUS}
                      fill="none"
                      strokeWidth={PREFETCH_RING_STROKE}
                      strokeLinecap="round"
                      strokeDasharray={PREFETCH_RING_CIRCUMFERENCE}
                      strokeDashoffset={
                        PREFETCH_RING_CIRCUMFERENCE *
                        (1 -
                          Math.min(
                            1,
                            prefetchProgress.completed / prefetchProgress.total,
                          ))
                      }
                      transform={`rotate(-90 ${PREFETCH_RING_SIZE / 2} ${PREFETCH_RING_SIZE / 2})`}
                    />
                  </svg>
                  <IonIcon
                    icon={downloadOutline}
                    className="practice-mode__prefetch-sync-icon"
                  />
                </span>
                <span
                  id="practice-prefetch-tip"
                  className="practice-mode__prefetch-sync-tooltip"
                  role="tooltip"
                  aria-hidden={!prefetchTipOpen}
                >
                  <span className="practice-mode__prefetch-sync-tooltip-title">
                    Preparing setlist audio
                  </span>
                  <span className="practice-mode__prefetch-sync-tooltip-detail">
                    <span className="practice-mode__prefetch-sync-tooltip-line">
                      {prefetchProgress.completed} of {prefetchProgress.total}{" "}
                      songs cached
                    </span>
                    <span className="practice-mode__prefetch-sync-tooltip-line">
                      for smooth playback
                    </span>
                  </span>
                  {prefetchProgress.activeVideoId ? (
                    <span className="practice-mode__prefetch-sync-tooltip-hint">
                      Downloading the next track now…
                    </span>
                  ) : null}
                </span>
              </IonButton>
            )}
          <IonButton
            fill="clear"
            size="small"
            shape="round"
            onClick={() => setShowSetlist(!showSetlist)}
            aria-label={showSetlist ? "Close setlist" : "Open setlist"}
          >
            <IonIcon
              slot="icon-only"
              icon={showSetlist ? closeOutline : listOutline}
            />
          </IonButton>
        </div>
      </div>

      {showSetlist && (
        <LiveSetlistDrawer
          items={sortedItems}
          currentIndex={currentIndex}
          onNavigate={navigateTo}
          onClose={() => setShowSetlist(false)}
        />
      )}

      <div className="practice-mode__main">
        <aside
          className="practice-mode__audio-rail"
          aria-label="Current song and reference audio"
        >
          <div className="live-service__song-header practice-mode__song-header">
            <div className="live-service__song-info">
              <h2>{song?.title}</h2>
              {(song?.artist || song?.youtubeLink) && (
                <div className="practice-mode__song-subrow">
                  {song?.artist && (
                    <p className="live-service__song-artist">{song.artist}</p>
                  )}
                  {song?.youtubeLink && (
                    <a
                      href={song.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="practice-mode__yt-link"
                    >
                      <IonIcon icon={logoYoutube} aria-hidden />
                      YouTube
                    </a>
                  )}
                </div>
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
            <div className="live-service__item-notes practice-mode__item-notes">
              <p>{currentItem.notes}</p>
            </div>
          )}

          {videoId ? (
            isLocalhost ? (
              <PracticeAudioPlayer
                key={`${currentIndex}-${videoId}`}
                practiceServiceId={id}
                youtubeVideoId={videoId}
                pitchSemitones={totalPitchSemitones}
                songTitle={song?.title}
              />
            ) : (
              <YouTubeEmbedPlayer
                key={`${currentIndex}-${videoId}`}
                youtubeVideoId={videoId}
                pitchSemitones={totalPitchSemitones}
                songTitle={song?.title}
              />
            )
          ) : (
            <div className="practice-mode__no-audio">
              <IonText color="medium">
                <p>
                  No YouTube link for this song. Edit the song in the library to
                  add one.
                </p>
              </IonText>
            </div>
          )}
        </aside>

        <div className="live-service__content practice-mode__chart-col">
          {chordPro ? (
            <ChordSheet
              chordPro={chordPro}
              originalKey={effectiveOriginalKey}
              fontSize={17}
              onTransposeChange={onTransposeChange}
            />
          ) : song?.lyrics ? (
            <pre className="live-service__lyrics">{song.lyrics}</pre>
          ) : (
            <div className="live-service__no-chart">
              <p>No chord chart available for this song.</p>
            </div>
          )}
        </div>
      </div>

      <div className="live-service__scroll-fab-wrap">
        {showSpeedControl && (
          <div className="live-service__speed-popover">
            <button
              type="button"
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
              type="button"
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
            type="button"
            className="live-service__speed-badge"
            onClick={() => setShowSpeedControl((v) => !v)}
            aria-label="Adjust speed"
          >
            {scrollSpeed}
            <span>x</span>
          </button>
        )}
        <button
          type="button"
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
