import { useState } from "react";
import { useCreateSong } from "./SongHooks";

/**
 * Shared hook for saving a song from a setlist or shared library into the
 * current user's personal song library.
 */
export function useSaveToLibrary(
  onSuccess?: (title: string) => void,
  onError?: () => void,
) {
  const [savingToLibraryId, setSavingToLibraryId] = useState<string | null>(null);
  const [createSong] = useCreateSong();

  const saveToLibrary = async (song: any) => {
    try {
      setSavingToLibraryId(song._id);
      await createSong({
        variables: {
          options: {
            title: song.title,
            artist: song.artist || undefined,
            defaultKey: song.defaultKey || undefined,
            bpm: song.bpm || undefined,
            lyrics: song.lyrics || undefined,
            chordChart: song.chordChart || undefined,
            youtubeLink: song.youtubeLink || undefined,
            notes: song.notes || undefined,
          },
        },
      });
      onSuccess?.(song.title);
    } catch {
      onError?.();
    } finally {
      setSavingToLibraryId(null);
    }
  };

  return { savingToLibraryId, saveToLibrary };
}
