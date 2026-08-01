/**
 * API host for REST endpoints (GraphQL URL is REACT_APP_API_URL, usually .../graphql).
 */
export function getApiOrigin(): string {
  const url = process.env.REACT_APP_API_URL || "http://localhost:5001/graphql";
  try {
    const u = new URL(url);
    return `${u.protocol}//${u.host}`;
  } catch {
    return "http://localhost:5001";
  }
}

/** Proxied YouTube audio stream (requires yt-dlp on backend). */
export function getYoutubeAudioProxyUrl(
  videoId: string,
  startSeconds?: number,
): string {
  const id = encodeURIComponent(videoId.trim());
  const base = `${getApiOrigin()}/api/youtube-audio/${id}`;
  if (
    startSeconds !== undefined &&
    startSeconds > 0 &&
    Number.isFinite(startSeconds)
  ) {
    const startInt = Math.max(0, Math.floor(startSeconds));
    return `${base}?start=${encodeURIComponent(String(startInt))}`;
  }
  return base;
}

/** Lightweight yt-dlp check (JSON) — same host as proxy. */
export function getYoutubeAudioProbeUrl(videoId: string): string {
  const id = encodeURIComponent(videoId.trim());
  return `${getApiOrigin()}/api/youtube-audio-probe/${id}`;
}
