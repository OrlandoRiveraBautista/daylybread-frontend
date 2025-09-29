import { useEffect, useRef } from "react";
import { useUserBibleHistory } from "./UserHooks";
import {
  useLazyGetListOfBibles,
  useLazyGetListOfBooksFromBible,
} from "./BibleBrainHooks";
import { useAppContext } from "../context/context";

/**
 * Hook to load bible history data on app startup without redirecting the user
 * This sets the bible data in context so it's ready when the user navigates to the read tab
 */
const useBibleHistoryLoader = () => {
  const { data: userBibleHistoryData } = useUserBibleHistory();
  const { getListOfBibles, data: biblesData } = useLazyGetListOfBibles();
  const { getListOfBooksFromBible, data: booksData } =
    useLazyGetListOfBooksFromBible();

  const {
    setBibleLanguage,
    setBible,
    setBibleBooks,
    setBook,
    setChapterNumber,
    chosenLanguage,
    chosenBible,
    chosenBibleBooks,
    chosenBook,
    chosenChapterNumber,
  } = useAppContext();

  // Use refs to track if we've already loaded the data
  const hasLoadedLanguage = useRef(false);
  const hasLoadedBible = useRef(false);
  const hasLoadedBooks = useRef(false);

  useEffect(() => {
    // Only load if we haven't already loaded and don't have bible data set
    if (hasLoadedLanguage.current) return;
    if (
      chosenLanguage &&
      chosenBible &&
      chosenBibleBooks &&
      chosenBook &&
      chosenChapterNumber
    ) {
      return;
    }

    // Check for needed values
    if (!userBibleHistoryData) return;

    // Get the current user bible history
    const currentUserBibleHistory =
      userBibleHistoryData.me?.user?.bibleHistory?.find(
        (history) => history.current
      );

    // Check that there is a bible history
    if (!currentUserBibleHistory) return;

    // Get its latest history
    const latestHistory = currentUserBibleHistory.history[0];

    // Ensure we have all required history data
    if (
      !latestHistory?.language ||
      !latestHistory?.bibleAbbr ||
      !latestHistory?.bookId ||
      !latestHistory?.chapterNumber
    ) {
      console.warn("Incomplete Bible history data:", latestHistory);
      return;
    }

    // Mark as loaded to prevent re-runs
    hasLoadedLanguage.current = true;

    // Set the language first
    setBibleLanguage({ id: latestHistory.language } as any);

    // Load bibles for the language
    getListOfBibles({
      variables: {
        options: {
          languageCode: latestHistory.language.toString(),
        },
      },
    });
  }, [userBibleHistoryData]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load the full bible object when bibles data is available
  useEffect(() => {
    if (!biblesData || !userBibleHistoryData) return;
    if (hasLoadedBible.current) return;

    // Don't load if we already have a bible set
    if (chosenBible) return;

    const currentUserBibleHistory =
      userBibleHistoryData.me?.user?.bibleHistory?.find(
        (history) => history.current
      );

    if (!currentUserBibleHistory) return;

    const latestHistory = currentUserBibleHistory.history[0];
    if (!latestHistory?.bibleAbbr) return;

    // Find the full bible object
    const fullBible = biblesData.getListOFBibles.data.find(
      (bible) => bible.abbr === latestHistory.bibleAbbr
    );

    if (!fullBible) {
      console.warn("Bible not found:", latestHistory.bibleAbbr);
      return;
    }

    // Mark as loaded to prevent re-runs
    hasLoadedBible.current = true;

    // Set the full bible object
    setBible(fullBible);

    // Load books for this bible
    getListOfBooksFromBible({
      variables: {
        options: {
          bibleId: fullBible.abbr!,
        },
      },
    });
  }, [biblesData, userBibleHistoryData]); // eslint-disable-line react-hooks/exhaustive-deps

  // Set the book and chapter when books data is available
  useEffect(() => {
    if (!booksData || !userBibleHistoryData) return;
    if (hasLoadedBooks.current) return;

    // Don't load if we already have books and book set
    if (chosenBibleBooks && chosenBook && chosenChapterNumber) return;

    const currentUserBibleHistory =
      userBibleHistoryData.me?.user?.bibleHistory?.find(
        (history) => history.current
      );

    if (!currentUserBibleHistory) return;

    const latestHistory = currentUserBibleHistory.history[0];
    if (!latestHistory?.bookId || !latestHistory?.chapterNumber) return;

    // Find the book
    const book = booksData.getListOfBooksForBible.data.find(
      (book) => book.bookId === latestHistory.bookId
    );

    if (!book) {
      console.warn("Book not found:", latestHistory.bookId);
      return;
    }

    // Mark as loaded to prevent re-runs
    hasLoadedBooks.current = true;

    // Set the books and the specific book and chapter
    setBibleBooks(booksData.getListOfBooksForBible.data);
    setBook(book);
    setChapterNumber(latestHistory.chapterNumber);

    console.log("Bible history loaded successfully:", {
      bible: latestHistory.bibleAbbr,
      book: book.name,
      chapter: latestHistory.chapterNumber,
    });
  }, [booksData, userBibleHistoryData]); // eslint-disable-line react-hooks/exhaustive-deps

  return { userBibleHistoryData };
};

export default useBibleHistoryLoader;
