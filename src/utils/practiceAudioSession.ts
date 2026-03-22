/**
 * In-memory reference audio for Worship Practice only.
 * Cleared when the user leaves practice (service) so blobs are not kept forever.
 */

import { getYoutubeAudioProxyUrl } from "./apiBaseUrl";

let activeServiceId: string | null = null;
const blobByVideoId = new Map<string, Blob>();
const inflightByVideoId = new Map<string, Promise<Blob>>();

let prefetchAbort: AbortController | null = null;

export type PracticePrefetchProgress = {
  total: number;
  completed: number;
  activeVideoId: string | null;
};

/**
 * Start (or keep) a practice session for this worship service.
 * Switching service id clears any previous session’s cached audio.
 */
export function attachPracticeAudioSession(serviceId: string): void {
  const id = serviceId.trim();
  if (!id) return;
  if (activeServiceId === id) return;
  disposePracticeAudioSession();
  activeServiceId = id;
}

/**
 * Drop all cached reference audio and cancel any in-flight prefetch.
 * Call when leaving practice mode.
 */
export function disposePracticeAudioSession(): void {
  prefetchAbort?.abort();
  prefetchAbort = null;
  inflightByVideoId.clear();
  blobByVideoId.clear();
  activeServiceId = null;
}

export function isPracticeAudioSessionActive(): boolean {
  return activeServiceId !== null;
}

export function getCachedPracticeAudioBlob(videoId: string): Blob | undefined {
  if (!activeServiceId) return undefined;
  return blobByVideoId.get(videoId.trim());
}

function rememberBlob(videoId: string, blob: Blob): void {
  if (!activeServiceId) return;
  blobByVideoId.set(videoId.trim(), blob);
}

/**
 * Returns a cached blob, or a shared in-flight download, or starts fetch.
 * Must be called only while a practice session is attached.
 */
export async function getOrFetchPracticeAudioBlob(
  videoId: string,
  options?: { signal?: AbortSignal; practiceServiceId?: string },
): Promise<Blob> {
  const id = videoId.trim();
  if (!id) {
    throw new Error("Missing video id");
  }
  const sid = options?.practiceServiceId?.trim();
  if (sid) {
    attachPracticeAudioSession(sid);
  }
  if (!activeServiceId) {
    throw new Error("Practice audio session not started");
  }

  const cached = blobByVideoId.get(id);
  if (cached) return cached;

  const inflight = inflightByVideoId.get(id);
  if (inflight) {
    return inflight;
  }

  const promise = (async () => {
    const url = getYoutubeAudioProxyUrl(id);
    const res = await fetch(url, {
      mode: "cors",
      credentials: "omit",
      signal: options?.signal,
    });
    if (!res.ok) {
      let detail = `HTTP ${res.status}`;
      try {
        const j = (await res.json()) as {
          message?: string;
          error?: string;
          hint?: string;
        };
        detail =
          [j.message, j.hint, j.error].filter(Boolean).join(" ") || detail;
      } catch {
        try {
          const t = await res.text();
          if (t) detail = t.slice(0, 400);
        } catch {
          /* */
        }
      }
      throw new Error(detail);
    }
    const blob = await res.blob();
    rememberBlob(id, blob);
    return blob;
  })();

  inflightByVideoId.set(id, promise);
  try {
    return await promise;
  } finally {
    inflightByVideoId.delete(id);
  }
}

/**
 * Prefetch ordered video ids one at a time. Skips ids already cached.
 * Returns a cancel function (abort only; does not dispose the session).
 */
export function runPracticeAudioPrefetch(
  serviceId: string,
  orderedVideoIds: string[],
  onProgress?: (p: PracticePrefetchProgress) => void,
): () => void {
  attachPracticeAudioSession(serviceId);
  prefetchAbort?.abort();
  prefetchAbort = new AbortController();
  const signal = prefetchAbort.signal;

  const unique = Array.from(
    new Set(orderedVideoIds.map((v) => v.trim()).filter(Boolean)),
  );
  const total = unique.length;

  const report = (completed: number, activeVideoId: string | null) => {
    onProgress?.({ total, completed, activeVideoId });
  };

  void (async () => {
    let completed = 0;
    for (const vid of unique) {
      if (signal.aborted) return;
      if (blobByVideoId.has(vid)) {
        completed += 1;
        report(completed, null);
        continue;
      }
      report(completed, vid);
      try {
        await getOrFetchPracticeAudioBlob(vid, { signal });
      } catch {
        /* per-song failure — player may retry */
      }
      if (signal.aborted) return;
      completed += 1;
      report(completed, null);
    }
  })();

  return () => {
    prefetchAbort?.abort();
    prefetchAbort = null;
  };
}
