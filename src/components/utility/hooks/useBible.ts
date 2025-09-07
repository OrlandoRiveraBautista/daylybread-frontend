import { useEffect } from "react";

/* Context */
import { useAppContext } from "../../../context/context";

/* API Hooks */
import { useLazyGetListOfVersesFromBookChapter } from "../../../hooks/BibleBrainHooks";
import { useLazySetUserHistory } from "../../../hooks/BibleHooks";

/* Types */
import { IChosenChapterVerses } from "../../../interfaces/BibleInterfaces";

const useBible = () => {
  // context
  const {
    chosenBible,
    chosenBibleBooks,
    chosenBook,
    chosenChapterNumber,
    setChapterVerses,
    setLocalChapters,
    handleResetChapterData,
  } = useAppContext();

  /* State */

  /* API/GraphQL */
  // to get chapter verses
  // Instance to get the current chapter
  const {
    getListOfVersesFromBookChapter,
    data: currentVersesData,
    loading: currentVersesLoading,
  } = useLazyGetListOfVersesFromBookChapter();
  // Instance to get the previous chapter
  const {
    getListOfVersesFromBookChapter: getPreviousChapter,
    data: previousVersesData,
    loading: previousVersesLoading,
  } = useLazyGetListOfVersesFromBookChapter();
  // Instance to get the next chapter
  const {
    getListOfVersesFromBookChapter: getNextChapter,
    data: nextVersesData,
    loading: nextVersesLoading,
  } = useLazyGetListOfVersesFromBookChapter();

  const { setUserHistory } = useLazySetUserHistory();

  // useEffect to reset all chapter-related data when Bible changes
  useEffect(() => {
    // Reset all chapter-related data when Bible changes to ensure clean slate
    setLocalChapters([]);
    handleResetChapterData();
  }, [chosenBible]); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect to get verses when book or chapther changes
  useEffect(() => {
    // get the testament
    const testament = chosenBook?.testament;
    // get the filesets
    const filesets = chosenBible?.filesets["dbp-prod"];
    if (!filesets) return;

    // get the bible id for the text
    const textBibleId = filesets.find((fileset: any) => {
      return (
        fileset.size === "C" ||
        (fileset.type === "text_plain" && fileset.size === testament)
      );
    }).id;

    // get index of current book in the bible
    const indexOfBookInBible = chosenBibleBooks?.indexOf(chosenBook!);

    /**
     * Getting the chapter verse
     * ?Note that graphql caches responses so if we call the same verse it will never touch the api,
     * ?it will return the cached response.
     */
    getListOfVersesFromBookChapter({
      variables: {
        options: {
          bibleId: textBibleId,
          bookId: chosenBook?.bookId!,
          chapterNumber: chosenChapterNumber!,
        },
      },
    });

    // check if the book is at the end
    if (chosenChapterNumber === chosenBook?.chapters?.length) {
      // check if the book is not the final book of the bible
      if (indexOfBookInBible !== chosenBibleBooks?.length) {
        // get the next chapter's data
        getNextChapter({
          variables: {
            options: {
              bibleId: textBibleId,
              bookId: chosenBibleBooks![indexOfBookInBible! + 1]?.bookId!,
              chapterNumber: 1,
            },
          },
        });
      }
    } else {
      // get the next chapter's data
      getNextChapter({
        variables: {
          options: {
            bibleId: textBibleId,
            bookId: chosenBook?.bookId!,
            chapterNumber: chosenChapterNumber! + 1,
          },
        },
      });
    }

    // check if the book is at the beginng
    if (chosenChapterNumber === 1) {
      // check if the book is the first book (it cannot go back)
      if (indexOfBookInBible !== 0) {
        // get the previous chapter's data
        getPreviousChapter({
          variables: {
            options: {
              bibleId: textBibleId,
              bookId: chosenBibleBooks![indexOfBookInBible! - 1]?.bookId!,
              chapterNumber:
                chosenBibleBooks![indexOfBookInBible! - 1].chapters?.length!,
            },
          },
        });
      }
    } else {
      // get the previous chapter's data
      getPreviousChapter({
        variables: {
          options: {
            bibleId: textBibleId,
            bookId: chosenBook?.bookId!,
            chapterNumber: chosenChapterNumber! - 1,
          },
        },
      });
    }

    // set the user history
    setUserHistory({
      variables: {
        options: {
          bibleAbbr: chosenBible.abbr!,
          bookId: chosenBook?.bookId!,
          chapterNumber: chosenChapterNumber!,
          language: chosenBible.languageId!,
        },
      },
    });
  }, [chosenChapterNumber, chosenBook]); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect to set verses when verses are present
  useEffect(() => {
    // function should fail early if any of the data is loading or if the current verse data is empty
    if (
      currentVersesLoading ||
      !currentVersesData ||
      previousVersesLoading ||
      nextVersesLoading
    )
      return;

    // create obj for the state
    const dto: IChosenChapterVerses = {
      previous: previousVersesData?.getListOfVerseFromBookChapter.data,
      current: currentVersesData.getListOfVerseFromBookChapter.data,
      next: nextVersesData?.getListOfVerseFromBookChapter.data,
    };

    // set data to state
    setChapterVerses(dto);

    // set the rendered chapter
    setLocalChapters((prevVal) => {
      if (!prevVal) return Object.values(dto);

      // Add previous to the beginning if it doesn't exist
      if (
        dto.previous &&
        !prevVal.some((chapter) => chapter === dto.previous)
      ) {
        prevVal = [dto.previous, ...prevVal];
      }

      // Add current chapter if it doesn't exist (normally should already exist as middle, so this is more of a safeguard)
      if (dto.current && !prevVal.some((chapter) => chapter === dto.current)) {
        prevVal = [...prevVal, dto.current];
      }

      // Add next to the end if it doesn't exist
      if (dto.next && !prevVal.some((chapter) => chapter === dto.next)) {
        prevVal = [...prevVal, dto.next];
      }

      return prevVal;
    });
  }, [currentVersesData, previousVersesData, nextVersesData]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    currentVersesData,
    currentVersesLoading,
    previousVersesData,
    previousVersesLoading,
    nextVersesData,
    nextVersesLoading,
  };
};

export default useBible;
