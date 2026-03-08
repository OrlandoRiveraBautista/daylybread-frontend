/**
 * Chord utilities for parsing, transposing, and converting chord charts.
 *
 * Supports ChordPro format: [Am]Lyrics go [G]here
 * and plain text format (chords on lines above lyrics) for import.
 */

// Chromatic scale using sharps and flats
const SHARP_NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const FLAT_NOTES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

// Map any note name to its semitone index (0-11)
const NOTE_TO_INDEX: Record<string, number> = {
  C: 0, "C#": 1, Db: 1,
  D: 2, "D#": 3, Eb: 3,
  E: 4, Fb: 4, "E#": 5,
  F: 5, "F#": 6, Gb: 6,
  G: 7, "G#": 8, Ab: 8,
  A: 9, "A#": 10, Bb: 10,
  B: 11, Cb: 11, "B#": 0,
};

// Keys that conventionally use flats
const FLAT_KEYS = new Set(["F", "Bb", "Eb", "Ab", "Db", "Gb", "Dm", "Gm", "Cm", "Fm", "Bbm", "Ebm"]);

// Regex to match a chord: root note + optional quality (m, maj7, sus4, dim, aug, 7, etc.) + optional bass note
const CHORD_REGEX = /^([A-G][#b]?)(m(?:aj|in)?|dim|aug|sus[24]?|add)?(\d+)?([#b]\d+)?(\/[A-G][#b]?)?$/;

// Regex to find chords within ChordPro brackets
const CHORDPRO_CHORD_REGEX = /\[([^\]]+)\]/g;

/**
 * Check if a string is a valid chord name
 */
export function isChord(token: string): boolean {
  return CHORD_REGEX.test(token.trim());
}

/**
 * Transpose a single chord by a number of semitones
 */
export function transposeChord(chord: string, semitones: number, useFlats = false): string {
  if (semitones === 0) return chord;

  return chord.replace(/([A-G][#b]?)/g, (match) => {
    const index = NOTE_TO_INDEX[match];
    if (index === undefined) return match;
    const newIndex = ((index + semitones) % 12 + 12) % 12;
    const scale = useFlats ? FLAT_NOTES : SHARP_NOTES;
    return scale[newIndex];
  });
}

/**
 * Determine if a key conventionally uses flats
 */
export function shouldUseFlats(key: string): boolean {
  return FLAT_KEYS.has(key);
}

/**
 * Transpose all chords in a ChordPro string by N semitones
 */
export function transposeChordPro(chordPro: string, semitones: number, useFlats = false): string {
  if (semitones === 0) return chordPro;

  return chordPro.replace(CHORDPRO_CHORD_REGEX, (_match, chord) => {
    // Don't transpose section headers like [Verse], [Chorus]
    if (isSectionHeader(chord)) return `[${chord}]`;
    return `[${transposeChord(chord, semitones, useFlats)}]`;
  });
}

/**
 * Check if a bracket content is a section header (not a chord)
 */
export function isSectionHeader(text: string): boolean {
  const sectionNames = [
    "intro", "verse", "verso", "chorus", "coro", "bridge", "puente",
    "pre-chorus", "pre-coro", "outro", "final", "tag", "interlude",
    "interludio", "instrumental", "solo", "ending", "vamp",
  ];
  const lower = text.toLowerCase().replace(/[\s\d:]/g, "");
  return sectionNames.some((s) => lower.startsWith(s));
}

// --- ChordPro Parsing ---

export interface ChordLyricPair {
  chord: string | null;
  lyric: string;
}

export interface ParsedLine {
  type: "section" | "chordlyric" | "empty";
  section?: string;
  pairs?: ChordLyricPair[];
}

/**
 * Parse a single line of ChordPro format into chord/lyric pairs
 */
function parseChordProLine(line: string): ParsedLine {
  const trimmed = line.trim();

  if (!trimmed) return { type: "empty" };

  // Check for section header: {section: Verse} or [Verse]
  const curlyMatch = trimmed.match(/^\{(?:section|comment|c):\s*(.+)\}$/i);
  if (curlyMatch) return { type: "section", section: curlyMatch[1].trim() };

  // Check if entire line is a section header in brackets like [Intro]
  const bracketOnlyMatch = trimmed.match(/^\[([^\]]+)\]$/);
  if (bracketOnlyMatch && isSectionHeader(bracketOnlyMatch[1])) {
    return { type: "section", section: bracketOnlyMatch[1].trim() };
  }

  // Parse chord/lyric pairs
  const pairs: ChordLyricPair[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const regex = /\[([^\]]+)\]/g;

  while ((match = regex.exec(trimmed)) !== null) {
    // Text before this chord
    if (match.index > lastIndex) {
      if (pairs.length === 0) {
        pairs.push({ chord: null, lyric: trimmed.substring(lastIndex, match.index) });
      } else {
        pairs[pairs.length - 1].lyric = trimmed.substring(lastIndex, match.index);
      }
    }

    const chordText = match[1];
    if (isSectionHeader(chordText)) {
      // Treat as section header within the line
      if (pairs.length === 0 && match.index === 0) {
        return { type: "section", section: chordText };
      }
    }

    pairs.push({ chord: chordText, lyric: "" });
    lastIndex = regex.lastIndex;
  }

  // Remaining text after last chord
  if (lastIndex < trimmed.length) {
    if (pairs.length > 0) {
      pairs[pairs.length - 1].lyric = trimmed.substring(lastIndex);
    } else {
      pairs.push({ chord: null, lyric: trimmed.substring(lastIndex) });
    }
  }

  if (pairs.length === 0 && trimmed) {
    pairs.push({ chord: null, lyric: trimmed });
  }

  return { type: "chordlyric", pairs };
}

/**
 * Parse a full ChordPro string into structured lines
 */
export function parseChordPro(chordPro: string): ParsedLine[] {
  return chordPro.split("\n").map(parseChordProLine);
}

// --- Plain Text → ChordPro Conversion ---

/**
 * Detect if a line is likely a chord line (most tokens are chords)
 */
export function isChordLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;

  // Split by whitespace
  const tokens = trimmed.split(/\s+/);
  if (tokens.length === 0) return false;

  const chordCount = tokens.filter((t) => isChord(t)).length;
  // A line is a chord line if most tokens (>= 60%) are valid chords
  // and there's at least one chord
  return chordCount > 0 && chordCount / tokens.length >= 0.6;
}

/**
 * Convert a plain text chord chart (chords above lyrics) to ChordPro format.
 *
 * Input format (from most chord sites):
 *   Am           G
 *   Lyrics go here today
 *   C        F      G
 *   More lyrics follow
 *
 * Output (ChordPro):
 *   [Am]Lyrics go h[G]ere today
 *   [C]More lyr[F]ics fol[G]low
 */
export function plainTextToChordPro(text: string): string {
  const lines = text.split("\n");
  const result: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const currentLine = lines[i];
    const trimmed = currentLine.trim();

    // Empty line
    if (!trimmed) {
      result.push("");
      i++;
      continue;
    }

    // Check if this looks like a section header (e.g., "Intro:", "Verse 1:", "[Chorus]", etc.)
    const sectionMatch = trimmed.match(/^\[?(\w[\w\s]*\d*)\]?[:-]?\s*$/);
    if (sectionMatch && isSectionHeader(sectionMatch[1])) {
      result.push(`[${sectionMatch[1].trim()}]`);
      i++;
      continue;
    }

    // Check if current line is a chord line
    if (isChordLine(currentLine)) {
      const nextLine = i + 1 < lines.length ? lines[i + 1] : "";
      const nextTrimmed = nextLine.trim();

      // If next line is also a chord line, empty, or doesn't exist → chord-only line
      if (!nextTrimmed || isChordLine(nextLine)) {
        // Chord-only line (like an intro)
        const chords = trimmed.split(/\s+/).filter((t) => isChord(t));
        result.push(chords.map((c) => `[${c}]`).join(" "));
        i++;
        continue;
      }

      // Merge chord line with the lyric line below it
      result.push(mergeChordAndLyricLines(currentLine, nextLine));
      i += 2;
      continue;
    }

    // Regular lyric line (no chords above it)
    result.push(trimmed);
    i++;
  }

  return result.join("\n");
}

/**
 * Merge a chord line and a lyric line into a single ChordPro line.
 * Uses character positions to place chords at the right spot in lyrics.
 */
function mergeChordAndLyricLines(chordLine: string, lyricLine: string): string {
  // Find each chord and its column position
  const chords: { chord: string; col: number }[] = [];
  const regex = /([A-G][#b]?(?:m(?:aj|in)?|dim|aug|sus[24]?|add)?(?:\d+)?(?:[#b]\d+)?(?:\/[A-G][#b]?)?)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(chordLine)) !== null) {
    chords.push({ chord: match[1], col: match.index });
  }

  if (chords.length === 0) return lyricLine;

  // Build ChordPro line by inserting chords at their column positions
  let result = "";
  let lyricIndex = 0;

  for (const { chord, col } of chords) {
    // Add lyrics up to the chord position
    const targetPos = Math.min(col, lyricLine.length);
    if (targetPos > lyricIndex) {
      result += lyricLine.substring(lyricIndex, targetPos);
      lyricIndex = targetPos;
    }
    result += `[${chord}]`;
  }

  // Add remaining lyrics
  if (lyricIndex < lyricLine.length) {
    result += lyricLine.substring(lyricIndex);
  }

  return result;
}

/**
 * Get the key name for a given semitone offset from the original key
 */
export function getTransposedKeyName(originalKey: string, semitones: number): string {
  if (!originalKey) return "";
  const rootMatch = originalKey.match(/^([A-G][#b]?)/);
  if (!rootMatch) return originalKey;

  const root = rootMatch[1];
  const useFlats = shouldUseFlats(originalKey);
  const transposedRoot = transposeChord(root, semitones, useFlats);
  const suffix = originalKey.substring(root.length);
  return transposedRoot + suffix;
}
