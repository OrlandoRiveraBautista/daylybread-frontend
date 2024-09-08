import { useEffect } from "react";

/* Context */
import { useAppContext } from "../../../context/context";

/* API Hooks */
import { useLazyGetListOfVersesFromBookChapter } from "../../../hooks/BibleBrainHooks";
import { useLazySetUserHistory } from "../../../hooks/BibleHooks";

const useBible = () => {
  // context
  const { chosenBible, chosenBibleBooks, chosenBook, chosenChapterNumber } =
    useAppContext();

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
