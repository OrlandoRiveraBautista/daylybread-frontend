import { useCallback, useEffect, useRef, useState } from "react";

type SpeechRecognitionResultLike = {
  isFinal: boolean;
  0: { transcript: string };
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike> & {
    length: number;
  };
};

type SpeechRecognitionErrorEventLike = {
  error: string;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export type SpeechDictationError =
  | "unsupported"
  | "not-allowed"
  | "no-speech"
  | "network"
  | "aborted"
  | "unknown";

interface UseSpeechDictationOptions {
  /** Called with the full composed transcript (base + speech) as recognition updates */
  onTranscript: (text: string) => void;
  /** Snapshot of the textarea when listening starts / after each final chunk */
  getBaseText: () => string;
  onError?: (error: SpeechDictationError, message: string) => void;
  lang?: string;
}

const ERROR_MESSAGES: Record<SpeechDictationError, string> = {
  unsupported: "Dictation isn’t supported in this browser.",
  "not-allowed": "Microphone access was denied. Enable it in your browser settings.",
  "no-speech": "No speech detected. Tap the mic and try again.",
  network: "Dictation needs a network connection. Check yours and try again.",
  aborted: "",
  unknown: "Something went wrong with dictation. Try again.",
};

const getSpeechRecognitionConstructor = (): SpeechRecognitionConstructor | null => {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
};

const mapError = (error: string): SpeechDictationError => {
  switch (error) {
    case "not-allowed":
    case "service-not-allowed":
      return "not-allowed";
    case "no-speech":
      return "no-speech";
    case "network":
      return "network";
    case "aborted":
      return "aborted";
    default:
      return "unknown";
  }
};

const joinTranscript = (base: string, spoken: string) => {
  const trimmedBase = base.trimEnd();
  const trimmedSpoken = spoken.trim();
  if (!trimmedSpoken) return trimmedBase;
  if (!trimmedBase) return trimmedSpoken;
  const needsSpace = !/\s$/.test(base);
  return `${trimmedBase}${needsSpace ? " " : ""}${trimmedSpoken}`;
};

/**
 * Web Speech API dictation for text inputs (Chrome, Safari, Chromium WebViews).
 */
export const useSpeechDictation = ({
  onTranscript,
  getBaseText,
  onError,
  lang = "en-US",
}: UseSpeechDictationOptions) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const baseTextRef = useRef("");
  const shouldRestartRef = useRef(false);
  const onTranscriptRef = useRef(onTranscript);
  const getBaseTextRef = useRef(getBaseText);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onTranscriptRef.current = onTranscript;
    getBaseTextRef.current = getBaseText;
    onErrorRef.current = onError;
  }, [onTranscript, getBaseText, onError]);

  useEffect(() => {
    setIsSupported(!!getSpeechRecognitionConstructor());
  }, []);

  const reportError = useCallback((code: SpeechDictationError) => {
    const message = ERROR_MESSAGES[code];
    if (!message) return;
    onErrorRef.current?.(code, message);
  }, []);

  const stop = useCallback(() => {
    shouldRestartRef.current = false;
    const recognition = recognitionRef.current;
    if (!recognition) {
      setIsListening(false);
      return;
    }
    try {
      recognition.stop();
    } catch {
      // already stopped
    }
    setIsListening(false);
  }, []);

  const start = useCallback(() => {
    const SpeechRecognitionCtor = getSpeechRecognitionConstructor();
    if (!SpeechRecognitionCtor) {
      reportError("unsupported");
      return;
    }

    // Stop any prior session before starting a new one
    if (recognitionRef.current) {
      shouldRestartRef.current = false;
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;

    baseTextRef.current = getBaseTextRef.current() || "";
    shouldRestartRef.current = true;

    recognition.onresult = (event: SpeechRecognitionEventLike) => {
      let interim = "";
      let finalChunk = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const piece = result[0]?.transcript || "";
        if (result.isFinal) {
          finalChunk += piece;
        } else {
          interim += piece;
        }
      }

      if (finalChunk) {
        baseTextRef.current = joinTranscript(baseTextRef.current, finalChunk);
        onTranscriptRef.current(baseTextRef.current);
      } else if (interim) {
        onTranscriptRef.current(joinTranscript(baseTextRef.current, interim));
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEventLike) => {
      const code = mapError(event.error);
      if (code === "aborted") return;
      // no-speech often fires when continuous mode pauses — keep session if user still listening
      if (code === "no-speech" && shouldRestartRef.current) return;
      shouldRestartRef.current = false;
      setIsListening(false);
      reportError(code);
    };

    recognition.onend = () => {
      if (shouldRestartRef.current) {
        try {
          recognition.start();
          return;
        } catch {
          shouldRestartRef.current = false;
        }
      }
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
      setIsListening(true);
    } catch {
      shouldRestartRef.current = false;
      setIsListening(false);
      reportError("unknown");
    }
  }, [lang, reportError]);

  const toggle = useCallback(() => {
    if (isListening) {
      stop();
    } else {
      start();
    }
  }, [isListening, start, stop]);

  useEffect(() => {
    return () => {
      shouldRestartRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
        recognitionRef.current = null;
      }
    };
  }, []);

  return {
    isSupported,
    isListening,
    start,
    stop,
    toggle,
  };
};
