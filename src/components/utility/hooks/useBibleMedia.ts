/* Context */
import { useEffect } from "react";
import { useAppContext } from "../../../context/context";

/* GQL/API */
import {
  useLazyGetAudioMedia,
  useLazyGetMediaTimestamps,
} from "../../../hooks/BibleBrainHooks";

/* Utils */
import { getHighestBitrateAudio } from "../../../utils/support";

const useBibleMedia = () => {
  const {
    chosenChapterNumber,
    chosenBook,
    chosenBible,
    setChapterMedia,
    setCurrentMediaTimestamp,
  } = useAppContext();

  const { getAudioMedia, data: audioMediaData } = useLazyGetAudioMedia();
  const { getMediaTimestamps, data: mediaTimestamps } =
    useLazyGetMediaTimestamps();

  useEffect(() => {
    // get the testament
    const testament = chosenBook?.testament;

    // Get the file set
    const audioFileSet = getHighestBitrateAudio(
      chosenBible?.filesets["dbp-prod"].filter(
        (fileset: any) => fileset.size === "C" || fileset.size === testament
      )
    );

    // check if any audio media filesets are not found
    if (!audioFileSet) {
      // reset the media and timestamp context
      setCurrentMediaTimestamp(0);
      setChapterMedia([]);
      return;
    }

    const mediaOptions = {
      filesetId: audioFileSet.id,
      bookId: chosenBook?.bookId!,
      chapterNumber: chosenChapterNumber!,
    };

    // Getting new media
    getAudioMedia({
      variables: {
        options: mediaOptions,
      },
    });

    // Getting new media timestamps
    getMediaTimestamps({
      variables: {
        options: mediaOptions,
      },
    });
  }, [chosenChapterNumber, chosenBook, chosenBible]); // eslint-disable-line react-hooks/exhaustive-deps

  // Watches for the audio media data and sets it
  useEffect(() => {
    if (!audioMediaData) return;
    setChapterMedia(audioMediaData.getAudioMedia.data);
  }, [audioMediaData]); // eslint-disable-line react-hooks/exhaustive-deps

  return { audioMediaData, mediaTimestamps };
};

export default useBibleMedia;
