import {
  BbBible,
  BbBook,
  BbVerse,
  GetMediaTimestampsQuery,
  Verse,
} from "../__generated__/graphql";

const zeroPad = (value: any, padding: number) => {
  var zeroes = new Array(padding + 1).join("0");
  return (zeroes + value).slice(-padding);
};

/**
 * Function to cluster numbers  in an array that are close together
 * This will be used to tell openai which verses are selected
 */
const clusterNumbers = (numbers: number[]): number[][] => {
  //init local values
  const clusters: number[][] = [];
  let currentCluster: number[] = [];

  // loop through the arg numbers
  for (let i = 0; i < numbers.length; i++) {
    const currentNumber = numbers[i];
    const previousNumber = numbers[i - 1];

    if (i === 0 || currentNumber === previousNumber + 1) {
      // Numbers are adjacent or it's the first number
      currentCluster.push(currentNumber);
    } else {
      // Numbers are not adjacent, start a new cluster
      clusters.push(currentCluster);
      currentCluster = [currentNumber];
    }
  }

  clusters.push(currentCluster); // Add the last cluster

  return clusters;
};

/**
 * Returns a string citation verbage
 * @param verseList BbVerse[]
 * @param chosenBible BbBible
 * @param chosenBook BbBook
 * @param chosenChapterNumber number
 */
const getCitationVerbage = (
  verseList: BbVerse[],
  chosenBible: BbBible,
  chosenBook: BbBook,
  chosenChapterNumber: number
) => {
  const selectedText = verseList.map((obj) => obj.verseStart!);
  // sort the verse numbers in the array in ascenting order
  const sortedNumbersAsc = selectedText.slice().sort((a, b) => a - b);
  // cluster the verses that are close together to diminish token usage on openai
  const clusterVerses = clusterNumbers(sortedNumbersAsc);
  // temp variable for verbage of clustered verses
  let clusterVersesVerb = "";
  // loop through each cluster
  clusterVerses.forEach((verseList, index) => {
    // add proper verbage
    clusterVersesVerb += `${
      index !== 0 //check for the first value
        ? index >= 1 && index < clusterVerses.length - 1 //check if the index is not the last
          ? "," // use comma on the not last clusters
          : " and " //use and for the last cluster
        : "" //if first value, requires no prefix
    }${verseList[0]} ${
      verseList[0] !== verseList[verseList.length - 1]
        ? "- " + verseList[verseList.length - 1]
        : ""
    }`;
  });

  // put all the chosen data together in a string
  const text = `${
    chosenBook.name
  } ${chosenChapterNumber}:${clusterVersesVerb} ${displayBibleAbbr(
    chosenBible.abbr!
  )?.replace(/\s/g, "")}`;

  return text;
};

/**
 * Returns a copy ready text for sharing or copying
 * @param selectedVerseList BbVerse[]
 * @param chosenBible BbBible
 * @param chosenBook BbBook
 * @param chosenChapterNumber number
 * @returns string | undefined
 */
const getSelectedText = (
  selectedVerseList: BbVerse[],
  chosenBible: BbBible,
  chosenBook: BbBook,
  chosenChapterNumber: number
) => {
  // check if the verse is selected
  if (!selectedVerseList || !chosenBook || !chosenChapterNumber) return;
  const chosenTextVerbage = getCitationVerbage(
    selectedVerseList,
    chosenBible,
    chosenBook,
    chosenChapterNumber
  );

  const copyText = selectedVerseList
    .sort((a, b) => Number(a.verseStart) - Number(b.verseStart)) //sort the selected verses
    .map((verseObj) => verseObj.verseText); //only return the text
  copyText.push(chosenTextVerbage!); //push the chose text verbage at the end of the list
  return copyText.join(" ");
};

const getVerseVerbageByVerses = (verses: Verse[]) => {
  // sort the verse numbers in the array in ascenting order
  const sortedNumbersAsc = verses
    .map((v) => v.verse)
    .map(Number)
    .slice()
    .sort((a, b) => a - b);
  // cluster the verses that are close together to diminish token usage on openai
  const clusterVerses = clusterNumbers(sortedNumbersAsc);
  // temp variable for verbage of clustered verses
  let clusterVersesVerb = "";
  // loop through each cluster
  clusterVerses.forEach((verseList, index) => {
    // add proper verbage
    clusterVersesVerb += `${
      index !== 0 //check for the first value
        ? index >= 1 && index < clusterVerses.length - 1 //check if the index is not the last
          ? "," // use comma on the not last clusters
          : " and " //use and for the last cluster
        : "" //if first value, requires no prefix
    }${verseList[0]} ${
      verseList[0] !== verseList[verseList.length - 1]
        ? "- " + verseList[verseList.length - 1]
        : ""
    }`;
  });
  // const citation = `${verses}`;
  // put all the chosen data together in a string
  const text = `${verses[0].bookName} ${
    verses[0].chapterNumber
  }:${clusterVersesVerb} ${verses[0].translation.abbreviation.replace(
    /\s/g,
    ""
  )}`;

  return text;
};

const getVerseVerbageByNewVerses = (verses: BbVerse[], bibleId: string) => {
  // sort the verse numbers in the array in ascenting order
  const sortedNumbersAsc = verses
    .map((v) => v.verseStart)
    .map(Number)
    .slice()
    .sort((a, b) => a - b);
  // cluster the verses that are close together to diminish token usage on openai
  const clusterVerses = clusterNumbers(sortedNumbersAsc);
  // temp variable for verbage of clustered verses
  let clusterVersesVerb = "";
  // loop through each cluster
  clusterVerses.forEach((verseList, index) => {
    // add proper verbage
    clusterVersesVerb += `${
      index !== 0 //check for the first value
        ? index >= 1 && index < clusterVerses.length - 1 //check if the index is not the last
          ? "," // use comma on the not last clusters
          : " and " //use and for the last cluster
        : "" //if first value, requires no prefix
    }${verseList[0]} ${
      verseList[0] !== verseList[verseList.length - 1]
        ? "- " + verseList[verseList.length - 1]
        : ""
    }`;
  });
  // const citation = `${verses}`;
  // put all the chosen data together in a string
  const text = `${verses[0].bookName} ${
    verses[0].chapter
  }:${clusterVersesVerb} ${bibleId.replace(/\s/g, "")}`;

  return text;
};

/**
 * Function to get the object with the highest bitrate.
 * Prioritizes 'audio_drama' type files first.
 * If no 'audio_drama' is available, falls back to 'audio' type files.
 */
const getHighestBitrateAudio = (filesets: Array<any>) => {
  // Filter filesets to get only 'audio_drama' type files.
  const audioDrama = filesets
    .filter((fileset) => fileset.type === "audio_drama")
    // Sort the filtered 'audio_drama' files in descending order based on the bitrate.
    .sort((a, b) => parseInt(b.bitrate) - parseInt(a.bitrate))[0]; // Get the first item which has the highest bitrate.

  // If there is an 'audio_drama' file available, return it.
  if (audioDrama) return audioDrama;

  // If no 'audio_drama' file is found, filter filesets to get only 'audio' type files.
  return (
    filesets
      .filter((fileset) => fileset.type === "audio")
      // Sort the filtered 'audio' files in descending order based on the bitrate.
      .sort((a, b) => parseInt(b.bitrate) - parseInt(a.bitrate))[0]
  ); // Get the first item which has the highest bitrate.
};

/**
 * Function will haddle turning the BibleBrain bible abbr to not include the language
 */
const displayBibleAbbr = (bibleBrainAbbr: string) => bibleBrainAbbr.slice(3);

/**
 * Determines the class name for a verse based on the current media timestamp.
 */
const getVerseClass = (
  verse: BbVerse,
  currentMediaTimeStamp: number,
  mediaTimestamps: GetMediaTimestampsQuery
) => {
  // Ensure the current media timestamp and media timestamps data are available
  if (
    verse &&
    currentMediaTimeStamp &&
    mediaTimestamps.getMediaTimestamps?.data.length
  ) {
    const timestamps = mediaTimestamps.getMediaTimestamps.data;
    const firstTimestamp = Number(timestamps[0].timestamp);
    const verseStart = verse.verseStart!;
    const lastIndex = timestamps.length - 1;

    const startTimestampIndex =
      firstTimestamp > 0 || verseStart === timestamps.length
        ? verseStart - 1
        : verseStart;
    const endTimestampIndex =
      firstTimestamp > 0
        ? verseStart
        : verseStart < lastIndex
        ? verseStart + 1
        : lastIndex;

    const startTimestamp = Number(timestamps[startTimestampIndex].timestamp);
    const endTimestamp =
      (firstTimestamp > 0 && verseStart <= lastIndex) ||
      (firstTimestamp === 0 && verseStart < lastIndex)
        ? Number(timestamps[endTimestampIndex].timestamp)
        : Infinity; // Use Infinity to handle the last verse properly

    const isCurrentlyPlayingVerse =
      currentMediaTimeStamp >= startTimestamp &&
      currentMediaTimeStamp < endTimestamp;

    const element = document.getElementsByClassName("currently-playing-verse");

    element[0]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    return isCurrentlyPlayingVerse ? "currently-playing-verse" : "";
  }
  return "";
};

/**
 * Function to get the bible url
 * @returns string
 */
const getBibleUrl = () => {
  const currentDomain = window.location.hostname.split(".").slice(-2).join(".");
  return `https://bible.${currentDomain}`;
};

/**
 * Generates a deep link URL to a specific Bible passage
 * @param languageId - The numeric language ID (e.g., 17045)
 * @param bibleId - The Bible translation ID (e.g., "ENGKJV")
 * @param bookId - The book ID (e.g., "DEU" for Deuteronomy)
 * @param chapter - The chapter number
 * @returns A full URL to the specific passage
 */
const generateVerseDeepLink = (
  languageId?: number,
  bibleId?: string,
  bookId?: string,
  chapter?: number
): string => {
  const baseUrl = getBibleUrl();

  if (!languageId || !bibleId || !bookId || !chapter) {
    return baseUrl;
  }

  return `${baseUrl}/read/${languageId}/${bibleId}/${bookId}/${chapter}`;
};

/**
 * Generates share text with a deep link for Bible verses
 * @param verseText - The verse text content
 * @param reference - The citation (e.g., "John 3:16 NIV")
 * @param deepLink - The deep link URL to the passage
 * @returns Formatted share text with link
 */
const generateShareText = (
  verseText: string,
  reference: string,
  deepLink: string
): string => {
  return `"${verseText}"\n\n— ${reference}\n\nRead more at: ${deepLink}\n\n📖 Shared via Daylybread`;
};

export {
  zeroPad,
  clusterNumbers,
  getCitationVerbage,
  getSelectedText,
  getVerseVerbageByVerses,
  getVerseVerbageByNewVerses,
  getHighestBitrateAudio,
  displayBibleAbbr,
  getVerseClass,
  getBibleUrl,
  generateVerseDeepLink,
  generateShareText,
};
