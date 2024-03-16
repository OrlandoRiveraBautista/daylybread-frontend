import { BbBible, BbBook, BbVerse, Verse } from "../__generated__/graphql";

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
  console.log(chosenBook);
  // put all the chosen data together in a string
  const text = `${
    chosenBook.name
  } ${chosenChapterNumber}:${clusterVersesVerb} ${chosenBible.abbr?.replace(
    /\s/g,
    ""
  )}`;

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

export {
  zeroPad,
  clusterNumbers,
  getCitationVerbage,
  getSelectedText,
  getVerseVerbageByVerses,
};
