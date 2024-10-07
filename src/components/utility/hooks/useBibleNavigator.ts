/* Context */
import { useAppContext } from "../../../context/context";

const useBibleNavigator = () => {
  // context
  const {
    chosenChapterNumber,
    chosenBook,
    chosenBibleBooks,
    setBook,
    setChapterNumber,
    handleResetChapterData,
  } = useAppContext();

  /**
   * Function to handle navigating to the next chapter in the bible
   */
  const nextChapter = () => {
    if (!chosenChapterNumber) return;
    const bookChapters = chosenBook?.chapters!;

    // check if the book is at the end of the chapter
    if (bookChapters?.length <= chosenChapterNumber) {
      // get index of current book in the bible
      const indexOfBookInBible = chosenBibleBooks?.indexOf(chosenBook!);

      // set the next book
      setBook(chosenBibleBooks![indexOfBookInBible! + 1]);
      // and reset the chapter to 1
      setChapterNumber(1);
      handleResetChapterData();
      return; // exit function
    }

    setChapterNumber(chosenChapterNumber + 1);
    handleResetChapterData();
    return;
  };

  /**
   * Function to handle navigating to the previous chapter in the bible
   */
  const backChapter = () => {
    if (!chosenChapterNumber) return;

    // check if the book is at the beginng
    if (chosenChapterNumber === 1) {
      // get index of current book in the bible
      const indexOfBookInBible = chosenBibleBooks?.indexOf(chosenBook!);

      // check if the book is the first book (it cannot go back)
      if (indexOfBookInBible === 0) return;

      // set the next book
      setBook(chosenBibleBooks![indexOfBookInBible! - 1]);
      // and reset the chapter to 1
      setChapterNumber(
        chosenBibleBooks![indexOfBookInBible! - 1].chapters?.length!
      );
      handleResetChapterData();
      return; // exit function
    }

    setChapterNumber(chosenChapterNumber - 1);
    handleResetChapterData();
    return;
  };

  return { nextChapter, backChapter };
};

export default useBibleNavigator;
