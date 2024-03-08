import { Verse } from "../__generated__/graphql";
import {
  IBookInterface,
  IChapterInterface,
  IVerseInterface,
} from "../interfaces/BibleInterfaces";

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
 * @param verseList IVerseInterface[]
 * @param chosenBook IBookInterface
 * @param chosenChapter IChapterInterface
 */
const getCitationVerbage = (
  verseList: IVerseInterface[],
  chosenBook: IBookInterface,
  chosenChapter: IChapterInterface
) => {
  const selectedText = verseList.map((obj) => obj.verse);
  // sort the verse numbers in the array in ascenting order
  const sortedNumbersAsc = selectedText
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
  // put all the chosen data together in a string
  const text = `${chosenBook?.bookName} ${
    chosenChapter?.chapterNumber
  }:${clusterVersesVerb} ${chosenBook?.translation.abbreviation.replace(
    /\s/g,
    ""
  )}`;

  return text;
};

/**
 * Returns a copy ready text for sharing or copying
 * @param selectedVerseList IVerseInterface[]
 * @param chosenBook IBookInterface
 * @param chosenChapter IChapterInterface
 * @returns string | undefined
 */
const getSelectedText = (
  selectedVerseList: IVerseInterface[],
  chosenBook: IBookInterface,
  chosenChapter: IChapterInterface
) => {
  // check if the verse is selected
  if (!selectedVerseList || !chosenBook || !chosenChapter) return;
  const chosenTextVerbage = getCitationVerbage(
    selectedVerseList,
    chosenBook,
    chosenChapter
  );

  const copyText = selectedVerseList
    .sort((a, b) => Number(a.verse) - Number(b.verse)) //sort the selected verses
    .map((verseObj) => verseObj.text); //only return the text
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

/**
 * Function to turn a timestamp like minutes:seconds into seconds
 */
const timestampToSeconds = (timestamp: string) => {
  // Split the timestamp into minutes and seconds
  const [minutesStr, secondsStr] = timestamp.split(":");
  const minutes = parseInt(minutesStr, 10); // Convert minutes string to integer
  const seconds = parseInt(secondsStr, 10); // Convert seconds string to integer

  // Convert minutes to seconds and add seconds
  const totalTimeInSeconds = minutes * 60 + seconds;

  return totalTimeInSeconds;
};

export {
  zeroPad,
  clusterNumbers,
  getCitationVerbage,
  getSelectedText,
  getVerseVerbageByVerses,
  timestampToSeconds,
};
