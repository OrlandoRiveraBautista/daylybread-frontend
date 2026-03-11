/**
 * Service date is stored in UTC (ISO string or ms).
 * Parse once then use toLocale* so display is always in the user's local timezone.
 * Handles: ISO string, numeric string (ms), number, null/undefined.
 */
export function parseServiceDate(value: string | number | null | undefined): Date {
  if (value == null || value === "") {
    return new Date();
  }
  if (typeof value === "number") {
    return Number.isNaN(value) ? new Date() : new Date(value);
  }
  const trimmed = String(value).trim();
  if (!trimmed) return new Date();
  // Numeric string (ms) — new Date("1731196800000") is Invalid Date, so parse as number
  if (/^-?\d+$/.test(trimmed)) {
    const d = new Date(Number(trimmed));
    return Number.isNaN(d.getTime()) ? new Date() : d;
  }
  const d = new Date(trimmed);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

/** Format for datetime-local input: YYYY-MM-DDTHH:mm (local time) */
export function toDateTimeLocalInput(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${d}T${h}:${min}`;
}

/** Default time for new services (9:00 AM local). */
export function defaultServiceDateTime(): Date {
  const d = new Date();
  d.setHours(9, 0, 0, 0);
  return d;
}
