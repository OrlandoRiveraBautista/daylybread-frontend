/** Extract 11-character YouTube video id from raw id or URL. */
export function extractYoutubeVideoId(input: string | undefined | null): string | null {
  if (!input?.trim()) return null;
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const u = new URL(trimmed);
    if (u.hostname === "youtu.be" || u.hostname === "www.youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }
    if (
      u.hostname.includes("youtube.com") ||
      u.hostname.includes("youtube-nocookie.com")
    ) {
      const v = u.searchParams.get("v");
      if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
      const parts = u.pathname.split("/").filter(Boolean);
      const embedIdx = parts.indexOf("embed");
      if (embedIdx >= 0 && parts[embedIdx + 1]) {
        const id = parts[embedIdx + 1];
        if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
      }
    }
  } catch {
    /* invalid URL */
  }
  return null;
}
