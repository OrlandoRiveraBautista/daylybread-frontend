import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  IonBadge,
  IonButton,
  IonContent,
  IonIcon,
  IonPopover,
  IonRange,
  IonSpinner,
  IonText,
} from "@ionic/react";
import {
  playOutline,
  pauseOutline,
  volumeHighOutline,
  volumeMuteOutline,
  informationCircleOutline,
} from "ionicons/icons";
import * as Tone from "tone";
import {
  getApiOrigin,
  getYoutubeAudioProbeUrl,
  getYoutubeAudioProxyUrl,
} from "../../../../utils/apiBaseUrl";
import {
  getCachedPracticeAudioBlob,
  getOrFetchPracticeAudioBlob,
} from "../../../../utils/practiceAudioSession";
import "./PracticeAudioPlayer.scss";

interface PracticeAudioPlayerProps {
  /** Worship service id — ties cache + prefetch to this practice session */
  practiceServiceId: string;
  youtubeVideoId: string;
  /** Pitch shift in semitones (matches chord key) */
  pitchSemitones: number;
  songTitle?: string;
}

const SKIP_SEC = 10;

/** Single-knob IonRange value (defensive for dual-knob detail shapes). */
function rangeDetailValue(detail: { value: unknown }): number {
  const raw = detail.value;
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (
    raw &&
    typeof raw === "object" &&
    "lower" in raw &&
    typeof (raw as { lower: unknown }).lower === "number"
  ) {
    return (raw as { lower: number }).lower;
  }
  return Number.NaN;
}

function mediaElementErrorMessage(audio: HTMLAudioElement): string {
  const me = audio.error;
  if (!me) return "Playback failed.";
  switch (me.code) {
    case MediaError.MEDIA_ERR_ABORTED:
      return "Playback was aborted.";
    case MediaError.MEDIA_ERR_NETWORK:
      return "Network error while loading audio.";
    case MediaError.MEDIA_ERR_DECODE:
      return "Audio decode failed (stream may be wrong format or incomplete).";
    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
      return "This audio could not be loaded (URL or format unsupported).";
    default:
      return "Playback failed.";
  }
}

function formatPitchLabel(semitones: number): string {
  if (semitones === 0) return "Original pitch";
  const n = Math.abs(semitones);
  const unit = n === 1 ? "semitone" : "semitones";
  if (semitones > 0) return `+${n} ${unit}`;
  return `−${n} ${unit}`;
}

function SkipTenGlyph({ direction }: { direction: "back" | "forward" }) {
  const flip =
    direction === "forward" ? "translate(512, 0) scale(-1, 1)" : undefined;
  return (
    <span className="practice-audio__skip-glyph">
      <svg
        className="practice-audio__skip-svg"
        viewBox="0 0 512 512"
        width="20"
        height="20"
        aria-hidden
      >
        <g transform={flip}>
          <path
            fill="currentColor"
            d="M30.71 229.47l188.87-113a30.54 30.54 0 0131.09-.39 33.74 33.74 0 0116.76 29.47v79.05l180.72-108.16a30.54 30.54 0 0131.09-.39A33.74 33.74 0 01496 145.52v221A33.73 33.73 0 01479.24 396a30.54 30.54 0 01-31.09-.39L267.43 287.4v79.08A33.73 33.73 0 01250.67 396a30.54 30.54 0 01-31.09-.39l-188.87-113a31.27 31.27 0 010-53z"
          />
        </g>
      </svg>
      <span className="practice-audio__skip-cap">10s</span>
    </span>
  );
}

export const PracticeAudioPlayer: React.FC<PracticeAudioPlayerProps> = ({
  practiceServiceId,
  youtubeVideoId,
  pitchSemitones,
  songTitle,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pitchShiftRef = useRef<Tone.PitchShift | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const isScrubbingRef = useRef(false);
  const fullDurationRef = useRef(0);
  const currentTimeAbsRef = useRef(0);
  /** Bumps <audio> key only when createMediaElementSource fails (e.g. React Strict Mode). */
  const [audioGraphKey, setAudioGraphKey] = useState(0);

  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackDuration, setTrackDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [bufferedEndAbs, setBufferedEndAbs] = useState(0);
  const [volume, setVolume] = useState(1);
  const [seekVisual, setSeekVisual] = useState(0);
  const [practiceInfoOpen, setPracticeInfoOpen] = useState(false);
  const [practiceInfoEvent, setPracticeInfoEvent] = useState<Event | undefined>(
    undefined,
  );

  const volumeRef = useRef(volume);
  volumeRef.current = volume;
  const pitchSemitonesRef = useRef(pitchSemitones);
  pitchSemitonesRef.current = pitchSemitones;

  const id = youtubeVideoId.trim();
  const streamUrl = useMemo(
    () => (id ? getYoutubeAudioProxyUrl(id) : ""),
    [id],
  );

  useEffect(() => {
    setTrackDuration(0);
    fullDurationRef.current = 0;
    setAudioGraphKey(0);
  }, [id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !streamUrl) return;

    let cancelled = false;
    const ac = new AbortController();
    let objectUrl: string | null = null;

    setError(null);
    setReady(false);
    setLoading(true);
    setPlaying(false);
    setBuffering(false);
    setBufferedEndAbs(0);
    setCurrentTime(0);
    setSeekVisual(0);

    pitchShiftRef.current?.dispose();
    pitchShiftRef.current = null;
    try {
      sourceRef.current?.disconnect();
    } catch {
      /* */
    }
    sourceRef.current = null;

    const loadAndConnect = async () => {
      try {
        await Tone.start();
        if (cancelled || audio !== audioRef.current) return;

        let blob: Blob;
        const cached = getCachedPracticeAudioBlob(id);
        if (cached) {
          blob = cached;
        } else {
          try {
            blob = await getOrFetchPracticeAudioBlob(id, {
              signal: ac.signal,
              practiceServiceId,
            });
          } catch (e) {
            if (cancelled) return;
            if (e instanceof DOMException && e.name === "AbortError") return;
            const msg =
              e instanceof Error ? e.message : "Could not load reference audio";
            setLoading(false);
            setError(msg);
            return;
          }
          if (cancelled) return;
        }

        if (cancelled || audio !== audioRef.current) return;

        objectUrl = URL.createObjectURL(blob);

        audio.removeAttribute("crossorigin");
        audio.volume = volumeRef.current;
        audio.src = objectUrl;
        audio.load();

        const pitchShift = new Tone.PitchShift(pitchSemitonesRef.current);
        pitchShift.windowSize = 0.06;
        pitchShift.toDestination();

        let source: MediaElementAudioSourceNode;
        try {
          source = Tone.getContext().createMediaElementSource(audio);
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          if (
            /already connected|HTMLMediaElement already connected/i.test(msg) &&
            !cancelled
          ) {
            pitchShift.dispose();
            URL.revokeObjectURL(objectUrl);
            objectUrl = null;
            setAudioGraphKey((k) => k + 1);
            return;
          }
          throw e;
        }

        Tone.connect(source, pitchShift);
        pitchShiftRef.current = pitchShift;
        sourceRef.current = source;

        if (!cancelled) {
          setLoading(false);
          setReady(true);
        }
      } catch (e) {
        if (cancelled) return;
        if (e instanceof DOMException && e.name === "AbortError") return;
        setLoading(false);
        setError(
          e instanceof Error ? e.message : "Could not load reference audio",
        );
      }
    };

    void loadAndConnect();

    const readSegmentDuration = () => {
      const d = audio.duration;
      return Number.isFinite(d) && d > 0 ? d : 0;
    };

    const syncBuffered = () => {
      try {
        if (audio.buffered.length > 0) {
          const endInSegment = audio.buffered.end(audio.buffered.length - 1);
          const fd = fullDurationRef.current;
          if (fd > 0 && !cancelled) {
            setBufferedEndAbs(Math.min(endInSegment, fd));
          }
        }
      } catch {
        /* */
      }
    };

    const onLoadedMeta = () => {
      if (cancelled) return;
      const segmentDur = readSegmentDuration();
      if (segmentDur > 0) {
        fullDurationRef.current = segmentDur;
        setTrackDuration(segmentDur);
      }
      const fd = fullDurationRef.current;
      if (fd > 0) {
        const t = audio.currentTime;
        currentTimeAbsRef.current = t;
        setCurrentTime(t);
        setSeekVisual((t / fd) * 1000);
      }
      syncBuffered();
    };

    const onDurationChange = () => {
      if (cancelled) return;
      const seg = readSegmentDuration();
      if (seg > 0) {
        fullDurationRef.current = seg;
        setTrackDuration(seg);
      }
    };

    const onTimeUpdate = () => {
      if (cancelled) return;
      const t = audio.currentTime;
      currentTimeAbsRef.current = t;
      setCurrentTime(t);
      const fd = fullDurationRef.current;
      if (fd > 0 && !isScrubbingRef.current) {
        setSeekVisual((t / fd) * 1000);
      }
    };

    const onPlay = () => {
      if (!cancelled) setPlaying(true);
    };
    const onPause = () => {
      if (!cancelled) {
        setPlaying(false);
        setBuffering(false);
      }
    };
    const onEnded = () => {
      if (!cancelled) setPlaying(false);
    };
    const onWaiting = () => {
      if (!cancelled) setBuffering(true);
    };
    const onPlaying = () => {
      if (!cancelled) setBuffering(false);
    };
    const onCanPlay = () => {
      if (!cancelled) setBuffering(false);
    };
    const onProgress = () => {
      if (!cancelled) syncBuffered();
    };

    const onError = () => {
      if (cancelled) return;
      const baseMsg = mediaElementErrorMessage(audio);
      setLoading(false);
      setBuffering(false);
      void (async () => {
        try {
          const probeUrl = getYoutubeAudioProbeUrl(youtubeVideoId);
          const r = await fetch(probeUrl);
          let body: { ok?: boolean; message?: string; hint?: string } = {};
          try {
            body = (await r.json()) as typeof body;
          } catch {
            /* */
          }
          if (cancelled) return;
          if (body.ok) {
            setError(
              `${baseMsg} The server can read this video with yt-dlp; the problem may be decode or the browser. Try another browser or reload.`,
            );
            return;
          }
          const detail = [body.message, body.hint].filter(Boolean).join(" ");
          setError(
            detail
              ? `${baseMsg} ${detail}`
              : `${baseMsg} Check that yt-dlp is installed on the API server.`,
          );
        } catch {
          if (!cancelled) {
            setError(
              `${baseMsg} Could not reach ${getApiOrigin()}/api/youtube-audio-probe (offline or wrong API URL?).`,
            );
          }
        }
      })();
    };

    audio.addEventListener("loadedmetadata", onLoadedMeta);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("progress", onProgress);
    audio.addEventListener("error", onError);

    return () => {
      cancelled = true;
      ac.abort();
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        objectUrl = null;
      }
      audio.removeEventListener("loadedmetadata", onLoadedMeta);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("progress", onProgress);
      audio.removeEventListener("error", onError);
      pitchShiftRef.current?.dispose();
      pitchShiftRef.current = null;
      try {
        sourceRef.current?.disconnect();
      } catch {
        /* */
      }
      sourceRef.current = null;
    };
  }, [streamUrl, youtubeVideoId, id, audioGraphKey, practiceServiceId]);

  useEffect(() => {
    const ps = pitchShiftRef.current;
    if (ps) ps.pitch = pitchSemitones;
  }, [pitchSemitones]);

  useEffect(() => {
    const el = audioRef.current;
    if (el) el.volume = volume;
  }, [volume]);

  const commitSeekAbsolute = useCallback((absSec: number) => {
    const audio = audioRef.current;
    const fd = fullDurationRef.current;
    if (!audio || !Number.isFinite(fd) || fd <= 0) return;

    const applied = Math.max(0, Math.min(fd - 0.05, absSec));
    try {
      audio.currentTime = applied;
    } catch {
      /* */
    }
    currentTimeAbsRef.current = applied;
    setCurrentTime(applied);
    setSeekVisual((applied / fd) * 1000);
  }, []);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !ready) return;
    try {
      await Tone.start();
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Play failed");
    }
  }, [ready]);

  const skip = useCallback(
    (deltaSec: number) => {
      if (!ready) return;
      const audio = audioRef.current;
      const fd = fullDurationRef.current;
      if (!audio || !Number.isFinite(fd) || fd <= 0) return;
      commitSeekAbsolute(currentTimeAbsRef.current + deltaSec);
    },
    [ready, commitSeekAbsolute],
  );

  const onSeekKnobStart = useCallback(() => {
    isScrubbingRef.current = true;
  }, []);

  const fmt = (t: number) => {
    if (!Number.isFinite(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const remaining =
    trackDuration > 0 && Number.isFinite(trackDuration)
      ? Math.max(0, trackDuration - currentTime)
      : 0;
  const bufferPercent =
    trackDuration > 0 && Number.isFinite(trackDuration)
      ? Math.min(100, (bufferedEndAbs / trackDuration) * 100)
      : 0;

  return (
    <div
      className={`practice-audio${loading ? " practice-audio--loading" : ""}${buffering && playing ? " practice-audio--buffering" : ""}`}
      tabIndex={0}
      role="region"
      aria-label={
        songTitle ? `Reference audio: ${songTitle}` : "Reference audio player"
      }
      onKeyDown={(e) => {
        if (e.code !== "Space" || error || !ready) return;
        if (
          (e.target as HTMLElement)?.closest?.(
            "button,a,input,textarea,[role='slider']",
          )
        ) {
          return;
        }
        e.preventDefault();
        void togglePlay();
      }}
    >
      <audio key={`${id}-${audioGraphKey}`} ref={audioRef} preload="auto" />

      <div className="practice-audio__header">
        <div className="practice-audio__title-row">
          <span className="practice-audio__eyebrow">Reference audio</span>
          <IonButton
            fill="clear"
            color="tertiary"
            size="small"
            shape="round"
            className="practice-audio__info-btn"
            aria-label="About practice playback"
            aria-expanded={practiceInfoOpen}
            aria-haspopup="dialog"
            onClick={(e) => {
              setPracticeInfoEvent(e.nativeEvent);
              setPracticeInfoOpen(true);
            }}
          >
            <IonIcon slot="icon-only" icon={informationCircleOutline} />
          </IonButton>
        </div>
        <IonBadge
          color={pitchSemitones === 0 ? "medium" : "tertiary"}
          className="practice-audio__pitch-badge"
        >
          {formatPitchLabel(pitchSemitones)}
        </IonBadge>
      </div>

      <IonPopover
        isOpen={practiceInfoOpen}
        event={practiceInfoEvent}
        reference="event"
        onDidDismiss={() => setPracticeInfoOpen(false)}
        className="practice-audio__info-popover"
        side="bottom"
        alignment="start"
        backdropDismiss
      >
        <IonContent className="ion-padding practice-audio__info-popover-body">
          <p className="practice-audio__info-popover-title">Practice playback</p>
          <p className="practice-audio__info-popover-text">
            Audio is transposed to match the chord sheet; tempo is unchanged.
            Add a YouTube link on each song in the library for reference
            playback here.
          </p>
          <p className="practice-audio__info-popover-note">
            Reference playback is experimental — buffering, pitch, and
            availability may vary. Setlist audio is pre-downloaded in the
            background and removed from device memory when you exit practice.
          </p>
        </IonContent>
      </IonPopover>

      {error && (
        <IonText color="danger" className="practice-audio__err">
          <p>{error}</p>
        </IonText>
      )}

      {!error && (
        <>
          <div className="practice-audio__transport">
            <IonButton
              fill="clear"
              color="tertiary"
              disabled={!ready || loading}
              onClick={() => skip(-SKIP_SEC)}
              aria-label={`Rewind ${SKIP_SEC} seconds`}
              className="practice-audio__skip"
            >
              <SkipTenGlyph direction="back" />
            </IonButton>

            <IonButton
              className="practice-audio__play"
              shape="round"
              color="tertiary"
              disabled={!ready && !loading}
              onClick={() => void togglePlay()}
              aria-label={playing ? "Pause" : "Play"}
            >
              {loading ? (
                <IonSpinner
                  name="crescent"
                  className="practice-audio__play-spin"
                />
              ) : (
                <IonIcon
                  icon={playing ? pauseOutline : playOutline}
                  className={
                    playing
                      ? "practice-audio__play-ico"
                      : "practice-audio__play-ico practice-audio__play-ico--play"
                  }
                />
              )}
            </IonButton>

            <IonButton
              fill="clear"
              color="tertiary"
              disabled={!ready || loading}
              onClick={() => skip(SKIP_SEC)}
              aria-label={`Forward ${SKIP_SEC} seconds`}
              className="practice-audio__skip"
            >
              <SkipTenGlyph direction="forward" />
            </IonButton>
          </div>

          <div className="practice-audio__times">
            <span className="practice-audio__time-current">
              {fmt(currentTime)}
            </span>
            <span className="practice-audio__time-sep" aria-hidden>
              /
            </span>
            <span className="practice-audio__time-duration">
              {fmt(trackDuration)}
            </span>
            {trackDuration > 0 && Number.isFinite(trackDuration) && (
              <span
                className="practice-audio__time-remain"
                title="Time remaining"
              >
                −{fmt(remaining)}
              </span>
            )}
          </div>
          {loading && (
            <p className="practice-audio__buffer-hint">
              <IonSpinner name="dots" className="practice-audio__buffer-spin" />
              Downloading full track for practice…
            </p>
          )}
          {buffering && playing && !loading && (
            <p className="practice-audio__buffer-hint">
              <IonSpinner name="dots" className="practice-audio__buffer-spin" />
              Buffering…
            </p>
          )}

          {ready && trackDuration > 0 && Number.isFinite(trackDuration) && (
            <div className="practice-audio__timeline">
              <div className="practice-audio__seek-stack">
                <div className="practice-audio__seek-track" aria-hidden>
                  <div className="practice-audio__seek-track-base" />
                  <div
                    className="practice-audio__seek-track-buffer"
                    style={{ width: `${bufferPercent}%` }}
                  />
                </div>
                <IonRange
                  min={0}
                  max={1000}
                  value={seekVisual}
                  pin={true}
                  pinFormatter={(v) => fmt((v / 1000) * trackDuration)}
                  onIonKnobMoveStart={onSeekKnobStart}
                  onIonKnobMoveEnd={(e) => {
                    isScrubbingRef.current = false;
                    const v = rangeDetailValue(e.detail);
                    const fd = fullDurationRef.current;
                    if (fd <= 0 || !Number.isFinite(v)) return;
                    commitSeekAbsolute((v / 1000) * fd);
                  }}
                  onIonInput={(e) => setSeekVisual(rangeDetailValue(e.detail))}
                  className="practice-audio__seek practice-audio__seek--youtube"
                  aria-label="Seek position"
                />
              </div>
            </div>
          )}

          {ready && trackDuration <= 0 && !loading && (
            <p className="practice-audio__live-hint">
              Live stream — seek may be limited
            </p>
          )}

          <div className="practice-audio__volume">
            <IonIcon
              icon={volume < 0.05 ? volumeMuteOutline : volumeHighOutline}
              className="practice-audio__vol-ico"
              aria-hidden
            />
            <IonRange
              min={0}
              max={100}
              value={volume * 100}
              onIonInput={(e) => setVolume(Number(e.detail.value) / 100)}
              className="practice-audio__vol-range"
              aria-label="Volume"
            />
          </div>
        </>
      )}
    </div>
  );
};
