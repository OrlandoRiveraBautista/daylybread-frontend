import React, { useEffect, useCallback } from "react";
import {
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/react";

/* Components */
import Skeleton from "../Loading/Skeleton";

/* Context */
import { useAppContext } from "../../context/context";

/* Types */
import { BbBook } from "../../__generated__/graphql";

/**
 * Custom hook to scroll an element into view on mount and provide a manual scroll function
 * @param selectedId - The ID of the currently selected element (scrolls to this on mount)
 * @param prefix - The prefix for the element ID (e.g., 'book' or 'chapter')
 * @returns A function to scroll any element into view by its ID
 */
const useScrollIntoView = (
  selectedId: string | number | undefined,
  prefix: string
) => {
  const scrollToElement = useCallback(
    (id: string | number) => {
      const element = document.getElementById(`${prefix}-${id}`);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    [prefix]
  );

  useEffect(() => {
    if (selectedId === undefined) return;
    // Use double requestAnimationFrame to ensure DOM is painted before scrolling
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToElement(selectedId);
      });
    });
    return () => cancelAnimationFrame(rafId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return scrollToElement;
};

export const BooksPicker: React.FC = () => {
  /* Context and state */
  const {
    setBook,
    chosenBook,
    setChapterNumber,
    chosenChapterNumber,
    chosenBibleBooks,
    setLocalChapters,
    setIsProgrammaticSlide,
  } = useAppContext();

  const scrollToBook = useScrollIntoView(
    chosenBook?.bookId ?? undefined,
    "book"
  );

  /**
   * Function to render loading skeleton animation
   * @augments -
   * @returns JSX.Element[]
   */
  const renderSkeleton = () => {
    const items = [];
    for (let i = 0; i < 12; i++) {
      items.push(
        <React.Fragment key={i}>
          <IonCol size="6" size-md="4" size-lg="4" key={i}>
            <Skeleton height="120px" width="100%" shape="square" />
          </IonCol>
        </React.Fragment>
      );
    }

    return items;
  };

  const handleSettingBook = (book: BbBook) => {
    // Check if the book to be set is not the same as the chosen book
    if (book.bookId !== chosenBook?.bookId) setBook(book);
    // Check if the chapter number hasn't been set to 1 already
    // And check if the book is being changed
    if (chosenChapterNumber !== 1 || book.bookId !== chosenBook?.bookId) {
      setLocalChapters([]);
      setChapterNumber(1); // set the chapter to 1
    }
    scrollToBook(book.bookId!);
    setIsProgrammaticSlide({ value: true }); // set the flag for programmically changing the slides
  };

  return (
    <div className="nav-selection">
      <IonRow>
        {!chosenBibleBooks ? (
          <>
            <Skeleton height="24px" width="100%" shape="square" />
            {renderSkeleton()}
          </>
        ) : (
          chosenBibleBooks.map((book, index) => (
            <React.Fragment key={index}>
              <IonCol size="6" size-md="4" size-lg="4" key={book.bookId}>
                <IonCard
                  id={`book-${book.bookId}`}
                  button
                  className={`outlined-card book-card ${
                    book.bookId === chosenBook?.bookId ? "selected" : ""
                  }`}
                  onClick={() => handleSettingBook(book)}
                >
                  <IonCardContent className="book-card-content">
                    <div className="book-number">{index + 1}</div>
                    <div className="book-info">
                      <IonCardTitle className="book-title">{book.name}</IonCardTitle>
                      <IonCardSubtitle className="book-group">{book.bookGroup}</IonCardSubtitle>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </React.Fragment>
          ))
        )}
      </IonRow>
    </div>
  );
};

export const ChapterPicker: React.FC = () => {
  const {
    chosenBook,
    setChapterNumber,
    chosenChapterNumber,
    setLocalChapters,
    setIsProgrammaticSlide,
  } = useAppContext();

  const scrollToChapter = useScrollIntoView(chosenChapterNumber, "chapter");

  /**
   * Function to render loading skeleton animation
   * @augments -
   * @returns JSX.Element[]
   */
  const renderSkeleton = () => {
    const items = [];
    for (let i = 0; i < 16; i++) {
      items.push(
        <>
          <IonCol size="6" size-md="4" size-lg="4" key={i}>
            <Skeleton height="66px" width="100%" shape="square" />
          </IonCol>
        </>
      );
    }

    return items;
  };

  const handleSettingChapter = (chapter: number) => {
    // Check if the chapter number to be set does not equal to the chosen chapter
    if (chapter !== chosenChapterNumber) {
      setLocalChapters([]);
      setChapterNumber(chapter);
    }
    scrollToChapter(chapter);
    setIsProgrammaticSlide({ value: true }); // set the flag for programmically changing the slides
  };

  return (
    <div className="nav-selection chapter-grid">
      {!chosenBook
        ? renderSkeleton()
        : chosenBook.chapters?.map((chapter, index) => (
            <button
              key={index}
              id={`chapter-${chapter}`}
              className={`chapter-cell ${chosenChapterNumber === chapter ? "chapter-cell--selected" : ""}`}
              onClick={() => handleSettingChapter(chapter)}
            >
              {chapter}
            </button>
          ))}
    </div>
  );
};
